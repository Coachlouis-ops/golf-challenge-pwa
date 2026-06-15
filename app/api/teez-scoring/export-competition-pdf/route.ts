export const runtime = "nodejs";

import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

import {
  initializeApp,
  getApps,
  cert,
} from "firebase-admin/app";

import {
  getFirestore,
} from "firebase-admin/firestore";

type LeaderboardRow = {
  position?: number;
  displayName?: string;
  division?: string;
  total?: number;
  teeTime?: string;
  startingHole?: string;
  countOutPosition?: string;
};

type TeeSheetRow = {
  displayName?: string;
  division?: string;
  teeTime?: string;
  startingHole?: string;
  score?: string;
};

function getAdminDb() {

  const projectId =
    process.env.FIREBASE_ADMIN_PROJECT_ID;

  const clientEmail =
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

  const privateKey =
    process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (
    !projectId ||
    !clientEmail ||
    !privateKey
  ) {
    throw new Error(
      "Missing Firebase Admin environment variables"
    );
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey:
          privateKey.replace(
            /\\n/g,
            "\n"
          ),
      }),
    });
  }

  return getFirestore();
}

async function streamToBuffer(
  doc: PDFKit.PDFDocument
): Promise<Buffer> {

  return new Promise((resolve, reject) => {

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) =>
      chunks.push(chunk)
    );

    doc.on("end", () =>
      resolve(Buffer.concat(chunks))
    );

    doc.on("error", reject);

  });
}

function drawFooter(
  doc: PDFKit.PDFDocument
) {

  const bottom =
    doc.page.height - 45;

  doc
    .fontSize(8)
    .fillColor("#777777")
    .text(
      "Scoring systems by Teez Golf Challenges - Driven by Honey Badger Technologies PTY. LTD",
      50,
      bottom,
      {
        align: "center",
        width: doc.page.width - 100,
      }
    );
}

function checkPageSpace(
  doc: PDFKit.PDFDocument,
  requiredHeight = 60
) {

  if (
    doc.y + requiredHeight >
    doc.page.height - 70
  ) {
    drawFooter(doc);
    doc.addPage();
  }
}

function addSectionTitle(
  doc: PDFKit.PDFDocument,
  title: string
) {

  checkPageSpace(doc, 70);

  doc
    .moveDown(1)
    .fontSize(18)
    .fillColor("#111111")
    .text(title);

  doc
    .moveDown(0.4)
    .strokeColor("#22c55e")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();

  doc.moveDown(1);
}

function drawLeaderboardTable(
  doc: PDFKit.PDFDocument,
  title: string,
  rows: LeaderboardRow[]
) {

  addSectionTitle(doc, title);

  if (!rows.length) {
    doc
      .fontSize(10)
      .fillColor("#555555")
      .text("No leaderboard data available.");

    return;
  }

  const startX = 50;

  function drawHeader() {

    checkPageSpace(doc, 40);

    const y =
      doc.y;

    doc
      .rect(startX, y, 512, 24)
      .fill("#111111");

    doc
      .fillColor("#ffffff")
      .fontSize(8)
      .text("POS", startX + 8, y + 8, {
        width: 35,
      })
      .text("PLAYER / TEAM", startX + 50, y + 8, {
        width: 220,
      })
      .text("DIV", startX + 285, y + 8, {
        width: 65,
      })
      .text("SCORE", startX + 355, y + 8, {
        width: 50,
      })
      .text("CO", startX + 415, y + 8, {
        width: 40,
      })
      .text("TEE", startX + 465, y + 8, {
        width: 40,
      })
      .text("TIME", startX + 510, y + 8, {
        width: 50,
      });

    doc.y =
      y + 32;
  }

  drawHeader();

  rows.forEach((row, index) => {

    checkPageSpace(doc, 32);

    const y =
      doc.y;

    if (index % 2 === 0) {
      doc
        .rect(startX, y - 4, 512, 24)
        .fill("#f5f5f5");
    }

    doc
      .fillColor("#111111")
      .fontSize(8)
      .text(String(row.position || ""), startX + 8, y, {
        width: 35,
      })
      .text(row.displayName || "", startX + 50, y, {
        width: 220,
        ellipsis: true,
      })
      .text(row.division || "", startX + 285, y, {
        width: 65,
      })
      .text(String(row.total ?? ""), startX + 355, y, {
        width: 50,
      })
      .text(row.countOutPosition || "", startX + 415, y, {
        width: 40,
      })
      .text(row.startingHole || "", startX + 465, y, {
        width: 40,
      })
      .text(row.teeTime || "", startX + 510, y, {
        width: 50,
      });

    doc.y =
      y + 24;
  });
}

function drawTeeSheetTable(
  doc: PDFKit.PDFDocument,
  rows: TeeSheetRow[]
) {

  addSectionTitle(doc, "Tee Sheet");

  if (!rows.length) {
    doc
      .fontSize(10)
      .fillColor("#555555")
      .text("No tee sheet data available.");

    return;
  }

  const grouped =
    rows.reduce<Record<string, TeeSheetRow[]>>(
      (acc, row) => {

        const key =
          `Tee ${row.startingHole || ""} - ${row.teeTime || ""}`;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(row);

        return acc;
      },
      {}
    );

  Object.entries(grouped).forEach(
    ([groupName, groupRows]) => {

      checkPageSpace(doc, 100);

      doc
        .fontSize(11)
        .fillColor("#22c55e")
        .text(groupName);

      doc.moveDown(0.4);

      groupRows.forEach((row) => {

        checkPageSpace(doc, 24);

        doc
          .fontSize(9)
          .fillColor("#111111")
          .text(
            `${row.displayName || "-"}     ${row.division || ""}     Score: ${row.score || ""}`,
            {
              width: 500,
            }
          );

      });

      doc.moveDown(0.8);

    }
  );
}

export async function GET(req: Request) {

  try {

    const adminDb =
      getAdminDb();

    const url =
      new URL(req.url);

    const competitionId =
      url.searchParams.get("competitionId");

    if (!competitionId) {
      return NextResponse.json(
        {
          error:
            "Missing competitionId",
        },
        {
          status: 400,
        }
      );
    }

    const competitionSnap =
      await adminDb
        .collection("competitions")
        .doc(competitionId)
        .get();

    if (!competitionSnap.exists) {
      return NextResponse.json(
        {
          error:
            "Competition not found",
        },
        {
          status: 404,
        }
      );
    }

    const competition =
      competitionSnap.data() as any;

    const clubId =
      competition.clubId;

    let club: any = {};

    if (clubId) {

      const clubSnap =
        await adminDb
          .collection("scoringClubs")
          .doc(clubId)
          .get();

      if (clubSnap.exists) {
        club =
          clubSnap.data();
      }
    }

    const pdf =
  new PDFDocument({
    size: "A4",
    margin: 50,
    font:
      "Helvetica",
    info: {
      Title:
        `${competition.competitionName || "Competition"} Results`,
      Author:
        "Teez Golf Challenges",
      Subject:
        "Competition Results",
    },
  });

pdf.font("Helvetica");

    const pdfPromise =
      streamToBuffer(pdf);

    pdf
      .rect(0, 0, pdf.page.width, 120)
      .fill("#050505");

    pdf
      .fillColor("#22c55e")
      .fontSize(10)
      .text(
        "TEEZSCORE OFFICIAL RESULTS",
        50,
        30,
        {
          characterSpacing: 1.5,
        }
      );

    pdf
      .fillColor("#ffffff")
      .fontSize(24)
      .text(
        club.clubName || "Club Competition",
        50,
        48,
        {
          width: 360,
        }
      );

    pdf
      .fillColor("#d4d4d4")
      .fontSize(10)
      .text(
        competition.competitionName || "",
        50,
        84
      );

    if (club.logoUrl) {

      try {

        const logoResponse =
          await fetch(club.logoUrl);

        if (logoResponse.ok) {

          const logoBuffer =
            Buffer.from(
              await logoResponse.arrayBuffer()
            );

          pdf.image(
            logoBuffer,
            pdf.page.width - 135,
            25,
            {
              fit: [80, 80],
            }
          );
        }

      } catch {
        // Continue without logo.
      }
    }

    pdf.y = 145;

    pdf
      .fillColor("#111111")
      .fontSize(16)
      .text("Competition Details");

    pdf.moveDown(0.8);

    const detailRows = [
      ["Competition", competition.competitionName || ""],
      ["Date", competition.competitionDate || ""],
      ["Format", competition.format || ""],
      ["Scoring Type", competition.scoringType || ""],
      ["Player Configuration", competition.playerConfiguration || ""],
      ["Division Structure", competition.divisionStructure || ""],
      ["Status", competition.status || ""],
    ];

    detailRows.forEach(([label, value]) => {

      pdf
        .fontSize(9)
        .fillColor("#666666")
        .text(`${label}: `, {
          continued: true,
        })
        .fillColor("#111111")
        .text(value);

    });

    drawLeaderboardTable(
      pdf,
      "Overall Leaderboard",
      Array.isArray(competition.leaderboard)
        ? competition.leaderboard
        : []
    );

    const divisionLeaderboards =
      competition.divisionLeaderboards || {};

    Object.entries(divisionLeaderboards).forEach(
      ([division, rows]) => {

        drawLeaderboardTable(
          pdf,
          `${division} Division Leaderboard`,
          Array.isArray(rows)
            ? rows as LeaderboardRow[]
            : []
        );

      }
    );

    drawTeeSheetTable(
      pdf,
      Array.isArray(competition.rows)
        ? competition.rows
        : []
    );

    drawFooter(pdf);

    pdf.end();

    const pdfBuffer =
      await pdfPromise;

    const fileName =
      `${competition.competitionName || "competition"}-results`
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase();

    return new NextResponse(
      new Uint8Array(pdfBuffer),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/pdf",
          "Content-Disposition":
            `attachment; filename="${fileName}.pdf"`,
        },
      }
    );

  } catch (e: any) {

    console.error(e);

    return NextResponse.json(
      {
        error:
          e.message ||
          "Failed to generate PDF",
      },
      {
        status: 500,
      }
    );
  }
}
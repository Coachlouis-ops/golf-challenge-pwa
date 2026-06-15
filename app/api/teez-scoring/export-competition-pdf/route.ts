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

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:
        process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail:
        process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey:
        process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
    }),
  });
}

const adminDb =
  getFirestore();

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

function addPageTitle(
  doc: PDFKit.PDFDocument,
  title: string
) {

  doc
    .moveDown(1)
    .fontSize(18)
    .fillColor("#111111")
    .text(title, {
      underline: false,
    });

  doc
    .moveDown(0.4)
    .strokeColor("#22c55e")
    .lineWidth(1)
    .moveTo(50, doc.y)
    .lineTo(doc.page.width - 50, doc.y)
    .stroke();

  doc.moveDown(1);
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

function drawLeaderboardTable(
  doc: PDFKit.PDFDocument,
  title: string,
  rows: LeaderboardRow[]
) {

  addPageTitle(doc, title);

  if (!rows.length) {
    doc
      .fontSize(10)
      .fillColor("#555555")
      .text("No leaderboard data available.");

    return;
  }

  const startX = 50;

  const widths = {
    pos: 45,
    name: 230,
    div: 80,
    score: 65,
    co: 55,
    tee: 45,
    time: 65,
  };

  function header() {
    checkPageSpace(doc, 40);

    doc
      .rect(startX, doc.y, 512, 24)
      .fill("#111111");

    doc
      .fillColor("#ffffff")
      .fontSize(8)
      .text("POS", startX + 8, doc.y - 18, {
        width: widths.pos,
      })
      .text("PLAYER / TEAM", startX + 50, doc.y - 18, {
        width: widths.name,
      })
      .text("DIV", startX + 285, doc.y - 18, {
        width: widths.div,
      })
      .text("SCORE", startX + 365, doc.y - 18, {
        width: widths.score,
      })
      .text("CO", startX + 430, doc.y - 18, {
        width: widths.co,
      })
      .text("TEE", startX + 475, doc.y - 18, {
        width: widths.tee,
      })
      .text("TIME", startX + 515, doc.y - 18, {
        width: widths.time,
      });

    doc.y += 10;
  }

  header();

  rows.forEach((row, index) => {

    checkPageSpace(doc, 30);

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
        width: widths.pos,
      })
      .text(row.displayName || "", startX + 50, y, {
        width: widths.name,
        ellipsis: true,
      })
      .text(row.division || "", startX + 285, y, {
        width: widths.div,
      })
      .text(String(row.total ?? ""), startX + 365, y, {
        width: widths.score,
      })
      .text(row.countOutPosition || "", startX + 430, y, {
        width: widths.co,
      })
      .text(row.startingHole || "", startX + 475, y, {
        width: widths.tee,
      })
      .text(row.teeTime || "", startX + 515, y, {
        width: widths.time,
      });

    doc.y =
      y + 24;
  });
}

function drawTeeSheetTable(
  doc: PDFKit.PDFDocument,
  rows: TeeSheetRow[]
) {

  addPageTitle(doc, "Tee Sheet");

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

      checkPageSpace(doc, 90);

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

    const doc =
      new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title:
            `${competition.competitionName || "Competition"} Results`,
          Author:
            "Teez Golf Challenges",
          Subject:
            "Competition Results",
        },
      });

    const pdfPromise =
      streamToBuffer(doc);

    doc
      .rect(0, 0, doc.page.width, 115)
      .fill("#050505");

    doc
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

    doc
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

    doc
      .fillColor("#d4d4d4")
      .fontSize(10)
      .text(
        competition.competitionName || "",
        50,
        82
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

          doc.image(
            logoBuffer,
            doc.page.width - 135,
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

    doc.y = 145;

    doc
      .fillColor("#111111")
      .fontSize(16)
      .text("Competition Details");

    doc.moveDown(0.8);

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

      doc
        .fontSize(9)
        .fillColor("#666666")
        .text(label, {
          continued: true,
        })
        .fillColor("#111111")
        .text(`   ${value}`);

    });

    drawLeaderboardTable(
      doc,
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
          doc,
          `${division} Division Leaderboard`,
          Array.isArray(rows)
            ? rows as LeaderboardRow[]
            : []
        );

      }
    );

    drawTeeSheetTable(
      doc,
      Array.isArray(competition.rows)
        ? competition.rows
        : []
    );

    drawFooter(doc);

    doc.end();

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
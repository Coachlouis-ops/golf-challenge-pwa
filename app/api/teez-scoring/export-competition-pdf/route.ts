export const runtime = "nodejs";

import { NextResponse } from "next/server";

import {
  initializeApp,
  getApps,
  cert,
} from "firebase-admin/app";

import {
  getFirestore,
} from "firebase-admin/firestore";

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

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

function safeText(value: any) {
  return String(value ?? "");
}

function sanitizeFileName(value: string) {
  return value
    .replace(/[^a-z0-9]/gi, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
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

    let club: any = {};

    if (competition.clubId) {

      const clubSnap =
        await adminDb
          .collection("scoringClubs")
          .doc(competition.clubId)
          .get();

      if (clubSnap.exists) {
        club =
          clubSnap.data();
      }
    }

    const pdfDoc =
      await PDFDocument.create();

    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    const boldFont =
      await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

    const pageWidth = 595.28;
    const pageHeight = 841.89;

    let page =
      pdfDoc.addPage([
        pageWidth,
        pageHeight,
      ]);

    let y = pageHeight - 50;

    function newPage() {
      page =
        pdfDoc.addPage([
          pageWidth,
          pageHeight,
        ]);

      y =
        pageHeight - 50;

      drawFooter();
    }

    function checkSpace(height: number) {
      if (y - height < 70) {
        newPage();
      }
    }

    function drawText(
      text: string,
      x: number,
      yPos: number,
      size = 10,
      isBold = false,
      color = rgb(0.08, 0.08, 0.08)
    ) {

      page.drawText(
        safeText(text).slice(0, 120),
        {
          x,
          y: yPos,
          size,
          font:
            isBold
              ? boldFont
              : font,
          color,
        }
      );
    }

    function drawFooter() {

      page.drawText(
        "Scoring systems by Teez Golf Challenges - Driven by Honey Badger Technologies PTY. LTD",
        {
          x: 70,
          y: 28,
          size: 8,
          font,
          color:
            rgb(0.45, 0.45, 0.45),
        }
      );
    }

    function sectionTitle(title: string) {

      checkSpace(45);

      y -= 24;

      drawText(
        title,
        50,
        y,
        16,
        true,
        rgb(0.05, 0.05, 0.05)
      );

      y -= 10;

      page.drawLine({
        start: {
          x: 50,
          y,
        },
        end: {
          x: pageWidth - 50,
          y,
        },
        thickness: 1,
        color:
          rgb(0.13, 0.77, 0.37),
      });

      y -= 24;
    }

    function drawHeader() {

      page.drawRectangle({
        x: 0,
        y: pageHeight - 120,
        width: pageWidth,
        height: 120,
        color:
          rgb(0.02, 0.02, 0.02),
      });

      drawText(
        "TEEZSCORE OFFICIAL RESULTS",
        50,
        pageHeight - 42,
        9,
        true,
        rgb(0.13, 0.77, 0.37)
      );

      drawText(
        club.clubName ||
          "Club Competition",
        50,
        pageHeight - 70,
        22,
        true,
        rgb(1, 1, 1)
      );

      drawText(
        competition.competitionName ||
          "",
        50,
        pageHeight - 93,
        10,
        false,
        rgb(0.82, 0.82, 0.82)
      );
    }

    async function drawLogo() {

      if (!club.logoUrl) return;

      try {

        const response =
          await fetch(club.logoUrl);

        if (!response.ok) return;

        const bytes =
          new Uint8Array(
            await response.arrayBuffer()
          );

        let image;

        if (
          club.logoUrl
            .toLowerCase()
            .includes(".png")
        ) {
          image =
            await pdfDoc.embedPng(bytes);
        } else {
          image =
            await pdfDoc.embedJpg(bytes);
        }

        page.drawImage(image, {
          x: pageWidth - 130,
          y: pageHeight - 105,
          width: 75,
          height: 75,
        });

      } catch {
        // Continue without logo.
      }
    }

    function drawCompetitionDetails() {

      sectionTitle(
        "Competition Details"
      );

      const details = [
        [
          "Competition",
          competition.competitionName,
        ],
        [
          "Date",
          competition.competitionDate,
        ],
        [
          "Format",
          competition.format,
        ],
        [
          "Scoring Type",
          competition.scoringType,
        ],
        [
          "Player Configuration",
          competition.playerConfiguration,
        ],
        [
          "Division Structure",
          competition.divisionStructure,
        ],
        [
          "Status",
          competition.status,
        ],
      ];

      details.forEach(
        ([label, value]) => {

          checkSpace(20);

          drawText(
            `${label}:`,
            50,
            y,
            9,
            true,
            rgb(0.35, 0.35, 0.35)
          );

          drawText(
            safeText(value),
            180,
            y,
            9,
            false,
            rgb(0.08, 0.08, 0.08)
          );

          y -= 18;

        }
      );
    }

    function drawLeaderboard(
      title: string,
      rows: LeaderboardRow[]
    ) {

      sectionTitle(title);

      if (!rows.length) {

        drawText(
          "No leaderboard data available.",
          50,
          y,
          10,
          false,
          rgb(0.35, 0.35, 0.35)
        );

        y -= 20;

        return;
      }

      checkSpace(35);

      page.drawRectangle({
        x: 50,
        y: y - 6,
        width: 495,
        height: 22,
        color:
          rgb(0.05, 0.05, 0.05),
      });

      drawText("POS", 58, y, 8, true, rgb(1, 1, 1));
      drawText("PLAYER / TEAM", 100, y, 8, true, rgb(1, 1, 1));
      drawText("DIV", 315, y, 8, true, rgb(1, 1, 1));
      drawText("SCORE", 370, y, 8, true, rgb(1, 1, 1));
      drawText("CO", 425, y, 8, true, rgb(1, 1, 1));
      drawText("TEE", 465, y, 8, true, rgb(1, 1, 1));
      drawText("TIME", 505, y, 8, true, rgb(1, 1, 1));

      y -= 24;

      rows.forEach((row, index) => {

        checkSpace(28);

        if (index % 2 === 0) {
          page.drawRectangle({
            x: 50,
            y: y - 6,
            width: 495,
            height: 20,
            color:
              rgb(0.96, 0.96, 0.96),
          });
        }

        drawText(
          safeText(row.position),
          58,
          y,
          8
        );

        drawText(
          safeText(row.displayName).slice(0, 38),
          100,
          y,
          8
        );

        drawText(
          safeText(row.division).slice(0, 10),
          315,
          y,
          8
        );

        drawText(
          safeText(row.total),
          370,
          y,
          8,
          true
        );

        drawText(
          safeText(row.countOutPosition),
          425,
          y,
          8
        );

        drawText(
          safeText(row.startingHole),
          465,
          y,
          8
        );

        drawText(
          safeText(row.teeTime),
          505,
          y,
          8
        );

        y -= 20;

      });
    }

    function drawTeeSheet(
      rows: TeeSheetRow[]
    ) {

      sectionTitle("Tee Sheet");

      if (!rows.length) {

        drawText(
          "No tee sheet data available.",
          50,
          y,
          10,
          false,
          rgb(0.35, 0.35, 0.35)
        );

        y -= 20;

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

          checkSpace(90);

          drawText(
            groupName,
            50,
            y,
            11,
            true,
            rgb(0.13, 0.77, 0.37)
          );

          y -= 18;

          groupRows.forEach((row) => {

            checkSpace(20);

            drawText(
              `${row.displayName || "-"}   ${row.division || ""}   Score: ${row.score || ""}`,
              70,
              y,
              8
            );

            y -= 15;

          });

          y -= 10;

        }
      );
    }

    drawHeader();
    await drawLogo();

    y =
      pageHeight - 155;

    drawCompetitionDetails();

    drawLeaderboard(
      "Overall Leaderboard",
      Array.isArray(competition.leaderboard)
        ? competition.leaderboard
        : []
    );

    const divisionLeaderboards =
      competition.divisionLeaderboards || {};

    Object.entries(
      divisionLeaderboards
    ).forEach(([division, rows]) => {

      drawLeaderboard(
        `${division} Division Leaderboard`,
        Array.isArray(rows)
          ? rows as LeaderboardRow[]
          : []
      );

    });

    drawTeeSheet(
      Array.isArray(competition.rows)
        ? competition.rows
        : []
    );

    drawFooter();

    const pdfBytes =
      await pdfDoc.save();

    const fileName =
      sanitizeFileName(
        `${competition.competitionName || "competition"}-results`
      );

    return new NextResponse(
      pdfBytes,
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
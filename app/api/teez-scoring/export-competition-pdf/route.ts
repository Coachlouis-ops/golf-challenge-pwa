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

import {
  readFile,
} from "node:fs/promises";

import {
  join,
} from "node:path";

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

function formatCompetitionDate(
  value: any
) {

  const raw =
    safeText(value).trim();

  if (!raw) {
    return "";
  }

  const match =
    raw.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

  if (!match) {
    return raw.toUpperCase();
  }

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const year =
    match[1];

  const monthIndex =
    Number(match[2]) - 1;

  const day =
    Number(match[3]);

  if (
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    return raw.toUpperCase();
  }

  return `${day} ${months[monthIndex]} ${year}`;
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

    const serifFont =
      await pdfDoc.embedFont(
        StandardFonts.TimesRoman
      );

    const serifBoldFont =
      await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold
      );

    const pageWidth = 595.28;
    const pageHeight = 841.89;

    const cream =
      rgb(
        0.965,
        0.95,
        0.90
      );

    const deepGreen =
      rgb(
        0.02,
        0.31,
        0.22
      );

    const mediumGreen =
      rgb(
        0.07,
        0.39,
        0.28
      );

    const paleGreen =
      rgb(
        0.91,
        0.92,
        0.86
      );

    const gold =
      rgb(
        0.70,
        0.57,
        0.28
      );

    const mutedText =
      rgb(
        0.30,
        0.34,
        0.29
      );

    let page =
      pdfDoc.addPage([
        pageWidth,
        pageHeight,
      ]);

    let y = pageHeight - 50;

    function paintPageBackground() {

      page.drawRectangle({
        x: 0,
        y: 0,
        width:
          pageWidth,
        height:
          pageHeight,
        color:
          cream,
      });

      page.drawRectangle({
        x: 0,
        y:
          pageHeight - 18,
        width:
          pageWidth,
        height:
          18,
        color:
          deepGreen,
      });

      page.drawRectangle({
        x: 38,
        y:
          pageHeight - 19.5,
        width:
          pageWidth - 76,
        height:
          2,
        color:
          gold,
      });
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

    function drawSerifText(
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
              ? serifBoldFont
              : serifFont,
          color,
        }
      );
    }

    function drawFooter() {

      page.drawRectangle({
        x: 0,
        y: 0,
        width:
          pageWidth,
        height:
          43,
        color:
          deepGreen,
      });

      page.drawText(
        "TEEZ SCORING SYSTEMS",
        {
          x: 38,
          y: 22,
          size: 8,
          font:
            boldFont,
          color:
            rgb(1, 1, 1),
        }
      );

      page.drawText(
        "Driven by Honey Badger Technologies PTY. LTD",
        {
          x: 38,
          y: 11,
          size: 5.8,
          font,
          color:
            rgb(
              0.83,
              0.86,
              0.80
            ),
        }
      );

      const footerDate =
        formatCompetitionDate(
          competition.competitionDate
        );

      const pageNumber =
        pdfDoc.getPageCount();

      const rightText =
        `${footerDate}  |  ${pageNumber}`;

      const rightWidth =
        font.widthOfTextAtSize(
          rightText,
          7
        );

      page.drawText(
        rightText,
        {
          x:
            pageWidth -
            38 -
            rightWidth,
          y: 18,
          size: 7,
          font,
          color:
            rgb(
              0.92,
              0.92,
              0.86
            ),
        }
      );
    }

    function drawContinuationHeader() {

      drawSerifText(
        safeText(
          club.clubName ||
            "Club Competition"
        ).toUpperCase(),
        38,
        pageHeight - 65,
        18,
        false,
        deepGreen
      );

      drawText(
        "OFFICIAL COMPETITION RESULTS",
        38,
        pageHeight - 88,
        8.5,
        true,
        gold
      );

      page.drawLine({
        start: {
          x: 38,
          y:
            pageHeight - 103,
        },
        end: {
          x:
            pageWidth - 38,
          y:
            pageHeight - 103,
        },
        thickness: 0.8,
        color:
          rgb(
            0.76,
            0.78,
            0.70
          ),
      });

      y =
        pageHeight - 135;
    }

    function newPage() {
      drawFooter();

      page =
        pdfDoc.addPage([
          pageWidth,
          pageHeight,
        ]);

      paintPageBackground();

      drawContinuationHeader();
    }

    function checkSpace(height: number) {
      if (y - height < 70) {
        newPage();
      }
    }

    function sectionTitle(title: string) {

      checkSpace(45);

      y -= 10;

      drawSerifText(
        title,
        38,
        y,
        15,
        false,
        deepGreen
      );

      y -= 12;

      page.drawLine({
        start: {
          x: 38,
          y,
        },
        end: {
          x:
            pageWidth - 38,
          y,
        },
        thickness: 1,
        color:
          gold,
      });

      y -= 20;
    }

    function drawHeader() {

      drawSerifText(
        safeText(
          club.clubName ||
            "Club Competition"
        ).toUpperCase(),
        38,
        pageHeight - 173,
        21,
        false,
        deepGreen
      );

      drawText(
        "OFFICIAL COMPETITION RESULTS",
        38,
        pageHeight - 198,
        8.5,
        true,
        gold
      );

      page.drawLine({
        start: {
          x: 38,
          y:
            pageHeight - 213,
        },
        end: {
          x:
            pageWidth - 38,
          y:
            pageHeight - 213,
        },
        thickness: 0.8,
        color:
          rgb(
            0.76,
            0.78,
            0.70
          ),
      });
    }

    async function drawLogo() {

      try {

        const logoPath =
          join(
            process.cwd(),
            "public",
            "lakes full logo 2images.png"
          );

        const fileBytes =
          await readFile(
            logoPath
          );

        const image =
          await pdfDoc.embedPng(
            fileBytes
          );

        const dimensions =
          image.scale(1);

        const maxWidth =
          105;

        const maxHeight =
          105;

        const scale =
          Math.min(
            maxWidth /
              dimensions.width,
            maxHeight /
              dimensions.height
          );

        const width =
          dimensions.width *
          scale;

        const height =
          dimensions.height *
          scale;

        page.drawImage(
          image,
          {
            x:
              (
                pageWidth -
                width
              ) / 2,
            y:
              pageHeight -
              42 -
              height,
            width,
            height,
          }
        );

      } catch (
        error
      ) {
        console.error(
          "PDF LOGO LOAD ERROR:",
          error
        );

        if (
          !club.logoUrl
        ) {
          return;
        }

        try {

          const response =
            await fetch(
              club.logoUrl
            );

          if (
            !response.ok
          ) {
            return;
          }

          const bytes =
            new Uint8Array(
              await response
                .arrayBuffer()
            );

          let image;

          if (
            club.logoUrl
              .toLowerCase()
              .includes(".png")
          ) {
            image =
              await pdfDoc
                .embedPng(
                  bytes
                );
          } else {
            image =
              await pdfDoc
                .embedJpg(
                  bytes
                );
          }

          const dimensions =
            image.scale(1);

          const maxWidth =
            105;

          const maxHeight =
            105;

          const scale =
            Math.min(
              maxWidth /
                dimensions.width,
              maxHeight /
                dimensions.height
            );

          const width =
            dimensions.width *
            scale;

          const height =
            dimensions.height *
            scale;

          page.drawImage(
            image,
            {
              x:
                (
                  pageWidth -
                  width
                ) / 2,
              y:
                pageHeight -
                42 -
                height,
              width,
              height,
            }
          );

        } catch {
          // Continue without logo.
        }
      }
    }

    function drawCompetitionDetails() {

      y =
        pageHeight - 245;

      const competitionName =
        safeText(
          competition.competitionName
        ).toUpperCase();

      const titleWords =
        competitionName
          .split(/\s+/)
          .filter(Boolean);

      if (
        titleWords.length > 1
      ) {

        const firstLine =
          titleWords[0];

        const secondLine =
          titleWords
            .slice(1)
            .join(" ");

        drawSerifText(
          firstLine,
          38,
          y,
          22,
          false,
          deepGreen
        );

        y -= 27;

        drawSerifText(
          secondLine,
          38,
          y,
          22,
          false,
          deepGreen
        );

      } else {

        drawSerifText(
          competitionName ||
            "COMPETITION",
          38,
          y,
          22,
          false,
          deepGreen
        );
      }

      y -= 18;

      page.drawRectangle({
        x: 38,
        y,
        width: 44,
        height: 3,
        color:
          gold,
      });

      y -= 25;

      const boxY =
        y - 42;

      page.drawRectangle({
        x: 38,
        y:
          boxY,
        width:
          pageWidth - 76,
        height:
          48,
        color:
          paleGreen,
        opacity:
          0.55,
      });

      const detailColumns = [
        {
          label:
            "DATE",
          value:
            formatCompetitionDate(
              competition.competitionDate
            ),
          x: 50,
        },
        {
          label:
            "FORMAT",
          value:
            safeText(
              competition.format
            ).toUpperCase(),
          x: 185,
        },
        {
          label:
            "CONFIGURATION",
          value:
            safeText(
              competition.playerConfiguration
            ).toUpperCase(),
          x: 330,
        },
        {
          label:
            "DIVISION",
          value:
            safeText(
              competition.divisionStructure ||
                "OPEN"
            )
              .replace(
                /no divisions/gi,
                "OPEN"
              )
              .toUpperCase(),
          x: 470,
        },
      ];

      detailColumns.forEach(
        (
          item
        ) => {

          drawText(
            item.label,
            item.x,
            boxY + 31,
            6.5,
            true,
            mutedText
          );

          drawText(
            item.value,
            item.x,
            boxY + 15,
            8.4,
            true,
            deepGreen
          );
        }
      );

      y =
        boxY - 25;
    }

    function drawLeaderboard(
      title: string,
      rows: LeaderboardRow[]
    ) {

      checkSpace(45);

      drawText(
        title.toUpperCase(),
        38,
        y,
        13,
        true,
        deepGreen
      );

      const statusLabel =
        `${safeText(
          competition.status ||
            "finalized"
        ).toUpperCase()}  •  ${safeText(
          competition.scoringType ||
            "points"
        ).toUpperCase()}`;

      const statusWidth =
        boldFont
          .widthOfTextAtSize(
            statusLabel,
            7
          );

      drawText(
        statusLabel,
        pageWidth -
          38 -
          statusWidth,
        y,
        7,
        true,
        mutedText
      );

      y -= 22;

      if (!rows.length) {

        drawText(
          "No leaderboard data available.",
          38,
          y,
          10,
          false,
          mutedText
        );

        y -= 20;

        return;
      }

      const drawTableHeader =
        () => {

          page.drawRectangle({
            x: 38,
            y: y - 7,
            width:
              pageWidth - 76,
            height: 25,
            color:
              deepGreen,
          });

          drawText(
            "POS",
            50,
            y,
            7.5,
            true,
            rgb(1, 1, 1)
          );

          drawText(
            "PLAYER / TEAM",
            92,
            y,
            7.5,
            true,
            rgb(1, 1, 1)
          );

          drawText(
            "PTS",
            458,
            y,
            7.5,
            true,
            rgb(1, 1, 1)
          );

          drawText(
            "TEE",
            500,
            y,
            7.5,
            true,
            rgb(1, 1, 1)
          );

          drawText(
            "TIME",
            539,
            y,
            7.5,
            true,
            rgb(1, 1, 1)
          );

          y -= 24;
        };

      drawTableHeader();

      rows.forEach(
        (
          row,
          index
        ) => {

          if (
            y - 22 <
            62
          ) {

            newPage();

            drawText(
              "OVERALL LEADERBOARD",
              38,
              y,
              13,
              true,
              deepGreen
            );

            y -= 15;

            drawText(
              `${safeText(
                competition.competitionName
              ).toUpperCase()} / CONTINUED`,
              38,
              y,
              7.5,
              true,
              mutedText
            );

            y -= 25;

            drawTableHeader();
          }

          if (
            index % 2 === 0
          ) {
            page.drawRectangle({
              x: 38,
              y: y - 6,
              width:
                pageWidth - 76,
              height: 19,
              color:
                paleGreen,
              opacity:
                0.42,
            });
          }

          const position =
            safeText(
              row.position
            );

          const displayName =
            safeText(
              row.displayName
            ).slice(
              0,
              52
            );

          const total =
            safeText(
              row.total
            );

          const tee =
            safeText(
              row.startingHole
            );

          const teeTime =
            safeText(
              row.teeTime
            );

          drawText(
            position,
            50,
            y,
            7.6,
            true,
            deepGreen
          );

          drawText(
            displayName,
            92,
            y,
            7.4,
            false,
            deepGreen
          );

          drawText(
            total,
            460,
            y,
            7.8,
            true,
            deepGreen
          );

          drawText(
            tee,
            503,
            y,
            7.2,
            false,
            mutedText
          );

          drawText(
            teeTime,
            538,
            y,
            7.2,
            false,
            mutedText
          );

          y -= 19;
        }
      );
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

    paintPageBackground();

    await drawLogo();

    drawHeader();

    drawCompetitionDetails();

    const finalLeaderboard =
      Array.isArray(
        competition.leaderboard
      )
        ? (competition.leaderboard as LeaderboardRow[]).filter(
            (
              row
            ) => {

              const position =
                Number(
                  row.position
                );

              return (
                Number.isFinite(
                  position
                ) &&
                position >= 1 &&
                position <= 28
              );
            }
          )
        : [];

    drawLeaderboard(
      "Overall Leaderboard",
      finalLeaderboard
    );

    drawFooter();

    const pdfBytes =
      await pdfDoc.save();

    const fileName =
      sanitizeFileName(
        `${competition.competitionName || "competition"}-results`
      );

    return new NextResponse(
      Buffer.from(pdfBytes),
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

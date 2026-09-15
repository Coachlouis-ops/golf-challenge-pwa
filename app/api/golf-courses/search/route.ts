import { NextRequest, NextResponse } from "next/server";


const TEEZ_CUSTOM_COURSES = [
  {
    placeId: "teez-sishen-golf-club",
    name: "Sishen Golf Club",
    description: "Sishen Golf Club, Northern Cape, South Africa",
    secondaryText: "Northern Cape, South Africa",
    stateProvince: "Northern Cape",
    country: "South Africa",
  },
];


export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const input =
      String(
        searchParams.get("q") || ""
      ).trim();

    if (input.length < 2) {
      return NextResponse.json({
        results: [],
      });
    }

   const apiKey =
  process.env
    .GOOGLE_PLACES_SERVER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Google Maps API key is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const googleResponse =
      await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "X-Goog-Api-Key":
              apiKey,

            "X-Goog-FieldMask":
              [
                "suggestions.placePrediction.placeId",
                "suggestions.placePrediction.text",
                "suggestions.placePrediction.structuredFormat",
              ].join(","),
          },

          body: JSON.stringify({
            input,

            includedPrimaryTypes: [
              "golf_course",
            ],

            includeQueryPredictions:
              false,
          }),

          cache: "no-store",
        }
      );

    const googleData =
      await googleResponse.json();

    if (
      !googleResponse.ok
    ) {
      console.error(
        "Google Places error:",
        googleData
      );

      return NextResponse.json(
        {
          error:
            "Google Places search failed.",

          details:
            googleData,
        },
        {
          status:
            googleResponse.status,
        }
      );
    }

   const googleResults =
  (
    googleData.suggestions ||
    []
  )
    .map(
      (suggestion: any) => {
        const prediction =
          suggestion?.placePrediction;

        if (!prediction) {
          return null;
        }

        return {
          placeId:
            prediction.placeId || "",

          name:
            prediction
              .structuredFormat
              ?.mainText
              ?.text ||
            prediction.text?.text ||
            "",

          description:
            prediction.text?.text ||
            "",

          secondaryText:
            prediction
              .structuredFormat
              ?.secondaryText
              ?.text ||
            "",
        };
      }
    )
    .filter(Boolean);

const normalizedInput =
  input.toLowerCase();

const customResults =
  TEEZ_CUSTOM_COURSES.filter(
    (course) =>
      course.name
        .toLowerCase()
        .includes(normalizedInput) ||
      course.description
        .toLowerCase()
        .includes(normalizedInput)
  );

const results = [
  ...customResults,
  ...googleResults,
];

return NextResponse.json({
  results,
});



  } catch (error) {
    console.error(
      "Golf course search error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Golf course search failed.",
      },
      {
        status: 500,
      }
    );
  }
}
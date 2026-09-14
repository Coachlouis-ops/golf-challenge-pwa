import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function GET(
  request: NextRequest
) {
  try {
    const placeId =
      String(
        request.nextUrl.searchParams.get(
          "placeId"
        ) || ""
      ).trim();

    if (!placeId) {
      return NextResponse.json(
        {
          error:
            "Place ID is required.",
        },
        {
          status: 400,
        }
      );
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

    const response =
      await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(
          placeId
        )}`,
        {
          method: "GET",

          headers: {
            "X-Goog-Api-Key":
              apiKey,

            "X-Goog-FieldMask":
              [
                "id",
                "displayName",
                "addressComponents",
              ].join(","),
          },

          cache: "no-store",
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "Google Place Details error:",
        data
      );

      return NextResponse.json(
        {
          error:
            "Google Place Details failed.",
          details: data,
        },
        {
          status:
            response.status,
        }
      );
    }

    let stateProvince = "";
    let country = "";

    const components =
      Array.isArray(
        data.addressComponents
      )
        ? data.addressComponents
        : [];

    for (
      const component of components
    ) {
      const types =
        Array.isArray(
          component.types
        )
          ? component.types
          : [];

      if (
        types.includes(
          "administrative_area_level_1"
        )
      ) {
        stateProvince =
          component.longText || "";
      }

      if (
        types.includes(
          "country"
        )
      ) {
        country =
          component.longText || "";
      }
    }

    return NextResponse.json({
      placeId:
        data.id || placeId,

      name:
        data.displayName?.text ||
        "",

      stateProvince,
      country,
    });
  } catch (error) {
    console.error(
      "Golf course details error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Golf course details failed.",
      },
      {
        status: 500,
      }
    );
  }
}
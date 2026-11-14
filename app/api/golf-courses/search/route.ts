import { NextRequest, NextResponse } from "next/server";
import {
  mergeGolfCourseResults,
  type GolfCourseCandidate,
} from "@/src/lib/golfCourseSearch";

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

const SOUTH_AFRICA_BIAS = {
  rectangle: {
    low: { latitude: -34.85, longitude: 16.45 },
    high: { latitude: -22.05, longitude: 32.95 },
  },
};

type GoogleLookup = {
  ok: boolean;
  results: GolfCourseCandidate[];
};

function textOf(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const text = (value as { text?: unknown }).text;
  return typeof text === "string" ? text : "";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function autocompleteResults(payload: unknown): GolfCourseCandidate[] {
  const suggestions = asRecord(payload)?.suggestions;
  if (!Array.isArray(suggestions)) return [];

  return suggestions.flatMap((suggestion) => {
    const prediction = asRecord(asRecord(suggestion)?.placePrediction);
    if (!prediction) return [];

    const structured = asRecord(prediction.structuredFormat);
    const name = textOf(structured?.mainText) || textOf(prediction.text);
    const types = Array.isArray(prediction.types)
      ? prediction.types.filter((type): type is string => typeof type === "string")
      : [];

    return [
      {
        placeId: typeof prediction.placeId === "string" ? prediction.placeId : "",
        name,
        description: textOf(prediction.text),
        secondaryText: textOf(structured?.secondaryText),
        types,
      },
    ];
  });
}

function textSearchResults(payload: unknown): GolfCourseCandidate[] {
  const places = asRecord(payload)?.places;
  if (!Array.isArray(places)) return [];

  return places.flatMap((place) => {
    const record = asRecord(place);
    if (!record) return [];
    const types = Array.isArray(record.types)
      ? record.types.filter((type): type is string => typeof type === "string")
      : [];
    const name = textOf(record.displayName);
    const address = typeof record.formattedAddress === "string" ? record.formattedAddress : "";

    return [
      {
        placeId: typeof record.id === "string" ? record.id : "",
        name,
        description: address || name,
        secondaryText: address,
        types,
      },
    ];
  });
}

async function lookupGoogle(
  url: string,
  apiKey: string,
  fieldMask: string,
  body: object,
  read: (payload: unknown) => GolfCourseCandidate[]
): Promise<GoogleLookup> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload: unknown = await response.json();

    if (!response.ok) {
      console.error("Google Places search failed", response.status);
      return { ok: false, results: [] };
    }

    return { ok: true, results: read(payload) };
  } catch (error) {
    console.error("Google Places search failed", error);
    return { ok: false, results: [] };
  }
}

export async function GET(request: NextRequest) {
  try {
    const input = String(request.nextUrl.searchParams.get("q") || "").trim();

    if (input.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const apiKey = process.env.GOOGLE_PLACES_SERVER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key is missing." },
        { status: 500 }
      );
    }

    const [autocomplete, textSearch] = await Promise.all([
      lookupGoogle(
        "https://places.googleapis.com/v1/places:autocomplete",
        apiKey,
        [
          "suggestions.placePrediction.placeId",
          "suggestions.placePrediction.text",
          "suggestions.placePrediction.structuredFormat",
          "suggestions.placePrediction.types",
        ].join(","),
        {
          input,
          includedPrimaryTypes: ["golf_course", "country_club"],
          includeQueryPredictions: false,
          regionCode: "za",
          locationBias: SOUTH_AFRICA_BIAS,
        },
        autocompleteResults
      ),
      lookupGoogle(
        "https://places.googleapis.com/v1/places:searchText",
        apiKey,
        "places.id,places.displayName,places.formattedAddress,places.types,places.addressComponents",
        {
          textQuery: `${input} golf`,
          includedType: "golf_course",
          strictTypeFiltering: false,
          regionCode: "za",
          pageSize: 20,
        },
        textSearchResults
      ),
    ]);

    if (!autocomplete.ok && !textSearch.ok) {
      return NextResponse.json(
        { error: "Google Places search failed." },
        { status: 502 }
      );
    }

    const normalizedInput = input.toLowerCase();
    const customResults = TEEZ_CUSTOM_COURSES.filter(
      (course) =>
        course.name.toLowerCase().includes(normalizedInput) ||
        course.description.toLowerCase().includes(normalizedInput)
    );

    return NextResponse.json({
      results: mergeGolfCourseResults(customResults, [
        ...autocomplete.results,
        ...textSearch.results,
      ]),
    });
  } catch (error) {
    console.error("Golf course search error:", error);

    return NextResponse.json(
      { error: "Golf course search failed." },
      { status: 500 }
    );
  }
}

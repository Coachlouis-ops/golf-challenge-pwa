import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  GOLF_COURSE_RESULT_CAP,
  isGolfRelatedCourse,
  mergeGolfCourseResults,
} from "./golfCourseSearch.ts";

describe("golf course search merge", () => {
  it("keeps a custom course ahead of Google and drops a duplicate place", () => {
    const merged = mergeGolfCourseResults(
      [
        {
          placeId: "teez-sishen-golf-club",
          name: "Sishen Golf Club",
          description: "Sishen Golf Club, Northern Cape, South Africa",
          secondaryText: "Northern Cape, South Africa",
        },
      ],
      [
        {
          placeId: "places/ChIJ-royal",
          name: "Royal Johannesburg",
          description: "Royal Johannesburg",
          secondaryText: "Johannesburg",
          types: ["country_club"],
        },
        {
          placeId: "ChIJ-royal",
          name: "Royal Johannesburg & Kensington",
          description: "Duplicate",
          secondaryText: "Johannesburg",
          types: ["golf_course"],
        },
        {
          placeId: "ChIJ-sports",
          name: "Community Sports Hall",
          description: "Not a golf club",
          secondaryText: "Durban",
          types: ["sports_club"],
        },
      ]
    );

    assert.deepEqual(
      merged.map((course) => course.placeId),
      ["teez-sishen-golf-club", "ChIJ-royal"]
    );
  });

  it("keeps a golf estate by name and stops at the result cap", () => {
    assert.equal(
      isGolfRelatedCourse({ name: "Pearl Valley Golf Estate", types: ["lodging"] }),
      true
    );

    const google = Array.from({ length: 20 }, (_, index) => ({
      placeId: `course-${index}`,
      name: `Club ${index} Golf`,
      description: `Club ${index}`,
      secondaryText: "South Africa",
      types: ["golf_course"],
    }));

    assert.equal(mergeGolfCourseResults([], google).length, GOLF_COURSE_RESULT_CAP);
  });
});

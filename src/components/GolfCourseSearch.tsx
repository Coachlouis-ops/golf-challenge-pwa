"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export type GolfCourseSearchResult = {
  placeId: string;
  name: string;
  description: string;
  secondaryText: string;
  stateProvince: string;
  country: string;
};

type Props = {
  value: string;

  onSelect: (
    course: GolfCourseSearchResult
  ) => void;

  placeholder?: string;

  className?: string;
};

export default function GolfCourseSearch({
  value,
  onSelect,
  placeholder = "Search golf course...",
  className = "",
}: Props) {
  const [searchValue, setSearchValue] =
    useState(value);

  const [results, setResults] =
    useState<
      GolfCourseSearchResult[]
    >([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const requestIdRef =
    useRef(0);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    const query =
      searchValue.trim();

    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const requestId =
      ++requestIdRef.current;

    const controller =
      new AbortController();

    const timer =
      window.setTimeout(
        async () => {
          try {
            setLoading(true);

            const response =
              await fetch(
                `/api/golf-courses/search?q=${encodeURIComponent(
                  query
                )}`,
                {
                  signal:
                    controller.signal,
                }
              );

            const data =
              await response.json();

            if (
              requestId !==
              requestIdRef.current
            ) {
              return;
            }

            if (!response.ok) {
              console.error(
                "Golf course search failed:",
                data
              );

              setResults([]);
              setOpen(false);
              return;
            }

            const nextResults =
              Array.isArray(
                data.results
              )
                ? data.results.map(
                    (
                      result: any
                    ) => ({
                      placeId:
                        result.placeId ||
                        "",

                      name:
                        result.name ||
                        "",

                      description:
                        result.description ||
                        "",

                      secondaryText:
                        result.secondaryText ||
                        "",

                      stateProvince:
                        "",

                      country:
                        "",
                    })
                  )
                : [];

            setResults(
              nextResults
            );

            setOpen(
              nextResults.length > 0
            );
          } catch (error: any) {
            if (
              error?.name !==
              "AbortError"
            ) {
              console.error(
                "Golf course search error:",
                error
              );
            }
          } finally {
            if (
              requestId ===
              requestIdRef.current
            ) {
              setLoading(false);
            }
          }
        },
        300
      );

    return () => {
      window.clearTimeout(
        timer
      );

      controller.abort();
    };
  }, [searchValue]);

  const selectCourse =
    async (
      course: GolfCourseSearchResult
    ) => {

      if (
        course.placeId.startsWith("teez-")
      ) {
        setSearchValue(course.name);
        setResults([]);
        setOpen(false);

        onSelect(course);
        return;
      }

      try {
        setSearchValue(
          course.name
        );

        setResults([]);
        setOpen(false);
        setLoading(true);

        const response =
          await fetch(
            `/api/golf-courses/details?placeId=${encodeURIComponent(
              course.placeId
            )}`
          );

        const data =
          await response.json();

        if (!response.ok) {
          console.error(
            "Golf course details failed:",
            data
          );

          onSelect(
            course
          );

          return;
        }

        const selectedCourse: GolfCourseSearchResult =
          {
            ...course,

            name:
              data.name ||
              course.name,

            stateProvince:
              data.stateProvince ||
              "",

            country:
              data.country ||
              "",
          };

        setSearchValue(
          selectedCourse.name
        );

        onSelect(
          selectedCourse
        );
      } catch (error) {
        console.error(
          "Golf course selection error:",
          error
        );

        onSelect(
          course
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchValue}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => {
          setSearchValue(
            event.target.value
          );

          setOpen(true);
        }}
        onFocus={() => {
          if (
            results.length > 0
          ) {
            setOpen(true);
          }
        }}
        className={className}
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          Searching...
        </div>
      )}

      {open &&
        results.length > 0 && (
          <div className="absolute z-[100] mt-1 w-full overflow-hidden rounded-xl border border-gray-700 bg-neutral-950 shadow-2xl">
            {results.map(
              (course) => (
                <button
                  key={
                    course.placeId
                  }
                  type="button"
                  onMouseDown={(
                    event
                  ) => {
                    event.preventDefault();

                    void selectCourse(
                      course
                    );
                  }}
                  className="block w-full border-b border-gray-800 px-4 py-3 text-left last:border-b-0 hover:bg-neutral-800"
                >
                  <div className="font-bold text-white">
                    {course.name}
                  </div>

                  {course.secondaryText && (
                    <div className="mt-1 text-xs text-gray-400">
                      {
                        course.secondaryText
                      }
                    </div>
                  )}
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
}
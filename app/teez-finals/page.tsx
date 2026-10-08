
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";

type TeezEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  location: string;
  description: string;
  imageUrl?: string;
  status:
    | "draft"
    | "provisional"
    | "confirmed"
    | "completed"
    | "cancelled";
  published: boolean;
  featured?: boolean;
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function escapeCalendarText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function downloadFile(content: string, name: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function TeezFinalsPage() {
  const [month, setMonth] = useState(new Date(2027, 8, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [events, setEvents] = useState<TeezEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState(false);

  useEffect(() => {
    const eventsQuery = query(
      collection(db, "teezEvents"),
      where("published", "==", true)
    );

    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const rows: TeezEvent[] = snapshot.docs.map((eventDoc) => ({
          id: eventDoc.id,
          ...(eventDoc.data() as Omit<TeezEvent, "id">),
        }));

        rows.sort((a, b) => a.date.localeCompare(b.date));

        setEvents(rows);
        setLoadingEvents(false);
        setEventsError(false);
      },
      (error) => {
        console.error("LOAD PUBLIC TEEZ EVENTS ERROR:", error);
        setEventsError(true);
        setLoadingEvents(false);
      }
    );

    return () => unsubscribe();
  }, []);

   const confirmedEvents = useMemo(
    () => events.filter((event) => event.status === "confirmed"),
    [events]
  );

  const days = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const offset = (firstDay.getDay() + 6) % 7;
    const count = new Date(year, monthIndex + 1, 0).getDate();

    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: count }, (_, i) => i + 1),
    ];
  }, [month]);

  function dateKey(day: number) {
    return `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function downloadCalendar() {
    const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TEEZ Golf Challenges//Events//EN",
      "CALSCALE:GREGORIAN",
    ];

    for (const event of confirmedEvents) {
      const start = event.date.replace(/-/g, "");
      const endDate = new Date(`${event.date}T12:00:00Z`);
      endDate.setUTCDate(endDate.getUTCDate() + 1);
      const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");

      lines.push(
        "BEGIN:VEVENT",
        `UID:${event.id}@teezgolfchallenges.com`,
        `DTSTAMP:${now}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${escapeCalendarText(event.title)}`,
        `LOCATION:${escapeCalendarText(`${event.venue}, ${event.location}`)}`,
        `DESCRIPTION:${escapeCalendarText(event.description)}`,
        "END:VEVENT"
      );
    }

    lines.push("END:VCALENDAR");

    downloadFile(
      lines.join("\r\n"),
      "teez-events-calendar.ics",
      "text/calendar;charset=utf-8"
    );
  }

    const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070d19] text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <header className="mb-6 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
            TEEZ GOLF CHALLENGES
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
            EVENTS SCHEDULE
          </h1>
       <p className="mt-2 text-sm text-slate-300">
  YOUR ROAD TO THE FINAL
</p>
</header>

{/* SELBORNE BANNER */}
<div className="mb-6 w-full overflow-hidden rounded-2xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,170,255,0.2)]">
  <img
    src="/selborne_1.png"
    alt="Selborne Golf Estate - TEEZ Finals"
    className="block h-auto w-full object-cover"
  />
</div>

        <section className="mb-5 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#173658] via-[#101d34] to-[#080e1c] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
            Featured Championship
          </p>
          <h2 className="mt-3 text-2xl font-black sm:text-4xl">
            TEEZ GRAND FINAL
          </h2>
          <p className="mt-2 text-lg font-semibold text-cyan-300">
            SEPTEMBER 2027
          </p>
          <p className="mt-2 text-sm text-slate-300">
            The ultimate destination in the Race to the Final.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Official date and venue to be announced.
          </p>

{/* SEPTEMBER GRAND FINAL IMAGE */}
<div className="mt-5 w-full overflow-hidden rounded-xl border border-cyan-500/30">
  <img
    src="/sept_final_1.png"
    alt="TEEZ Grand Final - September 2027"
    className="block h-auto w-full object-cover"
  />
</div>



        </section>

               {/* Logo displayed on printed/PDF Events Schedule only */}
        <div className="hidden print:flex print:flex-col print:items-center print:mb-6">
          <img
            src="/transparent.png"
            alt="TEEZ Golf Challenges Logo"
            className="h-24 w-auto max-w-full object-contain"
          />
          <h1 className="mt-3 text-center text-xl font-bold">
            OFFICIAL EVENTS SCHEDULE
          </h1>
          <p className="mt-1 text-center text-sm">
            www.teezgolfchallenges.com
          </p>
        </div>

        <section className="mb-5 rounded-2xl border border-white/10 bg-[#101a2b] p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Event Diary</h2>
            <p className="mt-1 text-xs text-slate-400">
              Upcoming tournaments, venues and championship dates.
            </p>
          </div>

         
          {loadingEvents && (
            <p className="mb-3 text-sm text-slate-400">
              Loading events...
            </p>
          )}

          {eventsError && (
            <p className="mb-3 text-sm text-red-400">
              Unable to load events. Please try again later.
            </p>
          )}

          {!loadingEvents && !eventsError && events.length === 0 && (
            <p className="mb-3 text-sm text-slate-400">
              No published events available yet.
            </p>
          )}

          <div className="space-y-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="min-w-0 rounded-xl border border-white/10 bg-[#17243a] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-300">
                    {formatDate(event.date)}
                  </span>
                  <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase text-slate-300">
                    {event.status}
                  </span>
                </div>

                <h3 className="mt-2 break-words text-lg font-bold">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-slate-300">
                  {event.venue}
                </p>

                <p className="text-xs text-slate-400">
                  {event.location}
                </p>

                <p className="mt-3 whitespace-pre-wrap break-words text-sm text-slate-300">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#101a2b] p-4">
          <h2 className="text-xl font-bold">
            TEEZ Events Calendar
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            View events or add confirmed dates to your personal calendar.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setShowCalendar((value) => !value)}
              className="min-h-11 rounded-xl bg-cyan-500 px-2 py-3 text-sm font-bold text-[#06101c]"
            >
              {showCalendar ? "Hide Calendar" : "View Calendar"}
            </button>

            <button
              type="button"
              onClick={downloadCalendar}
              disabled={confirmedEvents.length === 0}
              className="min-h-11 rounded-xl border border-cyan-400 px-2 py-3 text-sm font-bold text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Calendar
            </button>
          </div>

          {confirmedEvents.length === 0 && (
            <p className="mt-3 text-xs text-slate-400">
              Calendar download will become available when event dates are confirmed.
            </p>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="mt-3 min-h-11 w-full rounded-xl border border-white/20 px-3 py-3 text-sm font-semibold"
          >
            Print / Save as PDF
          </button>

          {showCalendar && (
            <div className="mt-5 min-w-0 rounded-xl bg-[#17243a] p-3">
              <div className="mb-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() =>
                    setMonth(
                      new Date(
                        month.getFullYear(),
                        month.getMonth() - 1,
                        1
                      )
                    )
                  }
                  className="rounded-lg border border-white/20 px-3 py-2"
                >
                  ‹
                </button>

                <h3 className="text-center text-sm font-bold">
                  {month.toLocaleDateString("en-ZA", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>

                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() =>
                    setMonth(
                      new Date(
                        month.getFullYear(),
                        month.getMonth() + 1,
                        1
                      )
                    )
                  }
                  className="rounded-lg border border-white/20 px-3 py-2"
                >
                  ›
                </button>
              </div>


              <div className="grid grid-cols-7 gap-1 text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div key={index} className="py-2 text-xs text-slate-400">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const key = day === null ? "" : dateKey(day);
                                    const hasEvent = events.some((event) => event.date === key);

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={day === null}
                      onClick={() => setSelectedDate(key)}
                      className={`aspect-square min-w-0 rounded-md text-xs ${
                        selectedDate === key
                          ? "bg-cyan-400 font-bold text-[#06101c]"
                          : hasEvent
                            ? "border border-cyan-400 bg-cyan-400/20 text-cyan-200"
                            : "bg-[#101a2b] text-slate-300"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="mt-4 rounded-lg border border-white/10 p-3">
                  <p className="text-xs font-bold text-cyan-300">
                    {formatDate(selectedDate)}
                  </p>
                  {selectedEvents.length ? (
                    selectedEvents.map((event) => (
                      <div key={event.id} className="mt-2">
                        <p className="text-sm font-bold">{event.title}</p>
                        <p className="text-xs text-slate-400">
                          {event.status === "provisional"
                            ? "Provisional date — not yet confirmed"
                            : event.venue}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="mt-2 text-xs text-slate-400">
                      No events scheduled for this date.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

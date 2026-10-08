
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";

type EventStatus =
  | "draft"
  | "provisional"
  | "confirmed"
  | "completed"
  | "cancelled";

type TeezEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  imageUrl: string;
  status: EventStatus;
  published: boolean;
};

type EventForm = Omit<TeezEvent, "id">;

const emptyForm: EventForm = {
  title: "",
  date: "",
  time: "",
  venue: "",
  location: "",
  description: "",
  imageUrl: "",
  status: "draft",
  published: false,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-cyan-400/30 bg-zinc-950 px-3 py-3 text-base text-white outline-none focus:border-cyan-400";

export default function AdminEventsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { teezAlert, teezConfirm } = useTeezNotification();

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [events, setEvents] = useState<TeezEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>({ ...emptyForm });

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "teezEvents"));
      const rows = snapshot.docs.map((item) => ({
        ...emptyForm,
        ...item.data(),
        id: item.id,
      })) as TeezEvent[];

      rows.sort((a, b) => a.date.localeCompare(b.date));
      setEvents(rows);
    } catch (error) {
      console.error("LOAD EVENTS ERROR:", error);
      await teezAlert({
        message: "Unable to load events. Check Firestore permissions.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [teezAlert]);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      setChecking(true);
      setAuthorized(false);

      if (!user?.uid) {
        if (!cancelled) setChecking(false);
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const isAdmin = snapshot.exists() &&
          snapshot.data().role === "admin";

        if (!cancelled) {
          setAuthorized(isAdmin);
          setChecking(false);
        }
      } catch (error) {
        console.error("ADMIN CHECK ERROR:", error);
        if (!cancelled) setChecking(false);
      }
    }

    void checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  useEffect(() => {
    if (authorized) void loadEvents();
  }, [authorized, loadEvents]);

  function setField<K extends keyof EventForm>(
    field: K,
    value: EventForm[K]
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  function editEvent(event: TeezEvent) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      location: event.location,
      description: event.description,
      imageUrl: event.imageUrl,
      status: event.status,
      published: event.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!authorized || saving) return;

    if (!form.title.trim() || !form.date) {
      await teezAlert({
        message: "Event title and date are required.",
        type: "warning",
      });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        date: form.date,
        time: form.time,
        venue: form.venue.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
        status: form.status,
        published: form.published,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid,
      };

      if (editingId) {
        await updateDoc(doc(db, "teezEvents", editingId), payload);
      } else {
        await addDoc(collection(db, "teezEvents"), {
          ...payload,
          createdAt: serverTimestamp(),
          createdBy: user?.uid,
        });
      }

      await teezAlert({
        message: editingId
          ? "Event updated successfully."
          : "Event created successfully.",
        type: "success",
      });

      resetForm();
      await loadEvents();
    } catch (error) {
      console.error("SAVE EVENT ERROR:", error);
      await teezAlert({
        message: "Could not save the event.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(event: TeezEvent) {
    if (!authorized) return;

    try {
      await updateDoc(doc(db, "teezEvents", event.id), {
        published: !event.published,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid,
      });

      await loadEvents();
    } catch (error) {
      console.error("PUBLISH EVENT ERROR:", error);
      await teezAlert({
        message: "Could not update publication status.",
        type: "error",
      });
    }
  }

  async function removeEvent(event: TeezEvent) {
    if (!authorized) return;

    const confirmed = await teezConfirm({
      message: `Permanently delete "${event.title}"?`,
      type: "warning",
      confirmText: "DELETE",
      cancelText: "CANCEL",
    });

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "teezEvents", event.id));

      if (editingId === event.id) resetForm();

      await loadEvents();
      await teezAlert({
        message: "Event deleted.",
        type: "success",
      });
    } catch (error) {
      console.error("DELETE EVENT ERROR:", error);
      await teezAlert({
        message: "Could not delete the event.",
        type: "error",
      });
    }
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        Checking administrator access...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <h1 className="text-xl font-bold text-red-400">
          Administrator access required
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="mt-6 rounded-lg bg-cyan-400 px-5 py-3 font-bold text-black"
        >
          BACK
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950 px-3 py-6 text-white sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <button
          onClick={() => router.push("/admin")}
          className="mb-6 rounded-lg border border-cyan-400/50 px-4 py-2 text-sm font-bold text-cyan-300"
        >
          ← ADMIN DASHBOARD
        </button>

        <header className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-wide text-cyan-400 sm:text-4xl">
            TEEZ EVENTS MANAGEMENT
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage the Events Diary, tournaments and finals.
          </p>
        </header>

        <form
          onSubmit={saveEvent}
          className="mb-10 space-y-5 rounded-2xl border border-cyan-400/40 bg-zinc-900/90 p-4 sm:p-6"
        >
          <h2 className="text-xl font-bold text-cyan-300">
            {editingId ? "EDIT EVENT" : "CREATE NEW EVENT"}
          </h2>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Name *
            </label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. TEEZ Grand Final"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Event Date *
              </label>
              <input
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Start Time
              </label>
              <input
                type="time"
                className={inputClass}
                value={form.time}
                onChange={(e) => setField("time", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Venue
              </label>
              <input
                className={inputClass}
                value={form.venue}
                onChange={(e) => setField("venue", e.target.value)}
                placeholder="Golf club or venue"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Location
              </label>
              <input
                className={inputClass}
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="City, province, country"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Description
            </label>
            <textarea
              className={`${inputClass} min-h-28`}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Event details..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Event Image URL
            </label>
            <input
              type="url"
              className={inputClass}
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-gray-400">
              Enter an existing image URL. Image uploads can be added separately.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Event Status
              </label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setField("status", e.target.value as EventStatus)
                }
              >
                <option value="draft">Draft</option>
                <option value="provisional">Provisional</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 p-4">
              <input
                id="eventPublished"
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setField("published", e.target.checked)
                }
                className="h-5 w-5 accent-cyan-400"
              />
              <label htmlFor="eventPublished" className="text-sm font-bold">
                Publish to Public Diary
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="min-w-0 flex-1 rounded-xl bg-cyan-400 px-5 py-4 font-black text-black disabled:opacity-50"
            >
              {saving
                ? "SAVING..."
                : editingId
                  ? "SAVE EVENT CHANGES"
                  : "CREATE EVENT"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/30 px-5 py-4 font-bold"
              >
                CANCEL EDIT
              </button>
            )}
          </div>
        </form>

        <section>
          <h2 className="mb-5 text-xl font-black text-white">
            EVENTS DIARY ({events.length})
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="rounded-xl border border-white/20 p-5 text-gray-400">
              No events created yet.
            </p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="min-w-0 rounded-2xl border border-white/15 bg-zinc-900 p-4 sm:p-5"
                >
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-black text-cyan-300">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300">
                        {event.date}
                        {event.time ? ` • ${event.time}` : ""}
                      </p>
                      <p className="mt-1 break-words text-sm text-gray-400">
                        {[event.venue, event.location]
                          .filter(Boolean)
                          .join(" — ")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-start gap-2">
                      <span className="rounded-lg border border-white/20 px-3 py-1 text-xs font-bold uppercase">
                        {event.status}
                      </span>
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-bold ${
                          event.published
                            ? "bg-green-500/20 text-green-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {event.published ? "PUBLISHED" : "HIDDEN"}
                      </span>
                    </div>
                  </div>

                  {event.description && (
                    <p className="mt-3 whitespace-pre-wrap break-words text-sm text-gray-300">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <button
                      onClick={() => editEvent(event)}
                      className="rounded-lg bg-blue-500 px-4 py-3 font-bold text-white"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => void togglePublished(event)}
                      className="rounded-lg bg-amber-400 px-4 py-3 font-bold text-black"
                    >
                      {event.published ? "UNPUBLISH" : "PUBLISH"}
                    </button>
                    <button
                      onClick={() => void removeEvent(event)}
                      className="rounded-lg bg-red-600 px-4 py-3 font-bold text-white"
                    >
                      DELETE
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

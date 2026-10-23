"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { stages, type Lead, type Stage } from "@/lib/crm/types";

const inputClass = "w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400";
const buttonClass = "rounded-lg bg-amber-300 px-4 py-3 font-semibold text-black disabled:cursor-wait disabled:opacity-50";
const stageLabels: Record<Stage, string> = { new: "New", contacted: "Contacted", quoted: "Quoted", booked: "Booked", completed: "Completed", lost: "Lost", cancelled: "Cancelled" };
const transitions: Record<Stage, Stage[]> = { new: ["new", "contacted", "lost", "cancelled"], contacted: ["contacted", "quoted", "lost", "cancelled"], quoted: ["quoted", "contacted", "booked", "lost", "cancelled"], booked: ["booked", "completed", "cancelled"], completed: ["completed"], lost: ["lost", "contacted"], cancelled: ["cancelled", "contacted"] };
const dateLabel = (value: string) => new Date(value).toLocaleString();
function localDateInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0,16);
}

export default function StaffDashboard({ initiallySignedIn }: { initiallySignedIn: boolean }) {
  const [signedIn, setSignedIn] = useState(initiallySignedIn);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("new");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const generation = useRef(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const authGeneration = useRef(0);
  const authPending = useRef(false);
  const [dirty, setDirty] = useState(false);
  const canDiscard = () => !dirty || window.confirm("Discard your unsaved changes?");
  const locked = useCallback(() => { generation.current++; authGeneration.current++; authPending.current = false; setSignedIn(false); setLeads([]); setSelected(null); setHasMore(false); setExpiresAt(null); setPaused(false); setDirty(false); }, []);
  const load = useCallback(async () => {
    const requestNumber = ++generation.current; setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/leads?filter=${encodeURIComponent(filter)}&offset=${offset}`, { cache: "no-store" });
      const data = await response.json();
      if (requestNumber !== generation.current) return;
      if (response.status === 401) { locked(); setError("Your session ended. Please sign in again."); return; }
      if (!response.ok) throw new Error(data.error || "Could not load inquiries.");
      if (!Number.isFinite(Date.parse(data.expiresAt))) throw new Error("Session could not be verified.");
      setExpiresAt(Date.parse(data.expiresAt));
      setLeads(data.leads); setHasMore(data.hasMore); if (data.leads.length === 0) setDirty(false);
      setSelected(current => data.leads.some((lead: Lead) => lead.id === current) ? current : data.leads[0]?.id ?? null);
    } catch (failure) {
      if (requestNumber === generation.current) { setLeads([]); setSelected(null); setError(failure instanceof Error ? failure.message : "Could not load inquiries."); }
    } finally { if (requestNumber === generation.current) { setLoading(false); setPaused(document.hidden || authPending.current); } }
  }, [filter, offset, locked]);
  useEffect(() => { if (signedIn) void load(); return () => { generation.current++; }; }, [signedIn, load]);
  useEffect(() => {
    const restored = (event: PageTransitionEvent) => { if (event.persisted) window.location.reload(); };
    window.addEventListener("pageshow", restored); return () => window.removeEventListener("pageshow", restored);
  }, []);
  useEffect(() => {
    if (!signedIn || expiresAt === null) return;
    const timer = setTimeout(locked, Math.max(0, expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [signedIn, expiresAt, locked]);
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const current = new BroadcastChannel("as-staff-session"); channel.current = current;
    current.onmessage = event => { if (event.data === "signed-out") locked(); };
    return () => { current.close(); channel.current = null; };
  }, [locked]);
  useEffect(() => {
    if (!signedIn) return;
    const recheck = () => {
      setPaused(true);
      if (document.hidden) return;
      const current = ++authGeneration.current; authPending.current = true;
      void (async () => {
        try {
          const response = await fetch("/api/admin/session", { cache: "no-store" });
          const data = await response.json();
          if (current !== authGeneration.current) return;
          if (response.status === 401) { locked(); setError("Your session ended. Please sign in again."); return; }
          if (!response.ok || data.signedIn !== true || !Number.isFinite(Date.parse(data.expiresAt))) throw new Error("Staff access could not be verified. Refresh to retry.");
          setExpiresAt(Date.parse(data.expiresAt)); setPaused(document.hidden);
        } catch (failure) {
          if (current === authGeneration.current) setError(failure instanceof Error ? failure.message : "Staff access could not be verified.");
        } finally { if (current === authGeneration.current) authPending.current = false; }
      })();
    };
    const poll = setInterval(() => { if (!document.hidden) recheck(); }, 60_000);
    document.addEventListener("visibilitychange", recheck); window.addEventListener("focus", recheck);
    return () => { clearInterval(poll); authGeneration.current++; authPending.current = false; document.removeEventListener("visibilitychange", recheck); window.removeEventListener("focus", recheck); };
  }, [signedIn, locked]);
  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return; setBusy(true); setError("");
    const form = event.currentTarget; const values = new FormData(form);
    try {
      const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.get("email"), password: values.get("password") }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");
      form.reset(); setSignedIn(true);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Sign-in failed."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    if (busy || !canDiscard()) return; setBusy(true);
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Sign-out could not be confirmed. Retry to revoke your session.");
      channel.current?.postMessage("signed-out"); locked(); setError("");
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Sign-out failed."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-32 text-white sm:px-6">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm uppercase tracking-widest text-amber-300">A&S Detailing · Staff</p><h1 className="mt-3 text-3xl font-semibold">Customer inquiries</h1></div>
      {signedIn && <button type="button" onClick={signOut} disabled={busy} className="rounded-lg border border-zinc-500 px-4 py-3">Sign out</button>}</div>
    <p className="my-6 rounded-xl border border-amber-900 bg-amber-950/30 p-4 text-sm text-amber-100">Email delivery is not connected. Pending alerts are queued, not delivered. Calendar is not connected; preferred dates are requests. A booked stage records a separately confirmed arrangement.</p>
    {error && <p role="alert" className="my-4 rounded-lg border border-red-400 p-4 text-red-200">{error}</p>}
    {!signedIn ? <form onSubmit={signIn} className="max-w-sm space-y-5 rounded-xl border border-zinc-700 p-6">
      <h2 className="text-xl font-semibold">Staff sign-in</h2>
      <label className="block">Email<input className={`${inputClass} mt-2`} name="email" type="email" autoComplete="username" required maxLength={254} /></label>
      <label className="block">Password<input className={`${inputClass} mt-2`} name="password" type="password" autoComplete="current-password" required maxLength={128} /></label>
      <button className={buttonClass} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form> : <>
      {paused && <p role="status">Checking staff access…</p>}
      <div hidden={paused}>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label>Show <select className="ml-2 rounded-lg border border-zinc-600 bg-zinc-900 p-3" value={filter} onChange={e => { if (canDiscard()) { setFilter(e.target.value); setOffset(0); } }}>
          <option value="all">All inquiries</option><option value="due">Needs follow-up</option>{stages.map(stage => <option key={stage} value={stage}>{stageLabels[stage]}</option>)}
        </select></label><button className="rounded-lg border border-zinc-600 px-4 py-3" disabled={loading} onClick={() => { if (canDiscard()) void load(); }}>Refresh</button>
        <span role="status" className="text-sm text-zinc-400">{loading ? "Loading…" : `${leads.length} shown`}</span>
      </div>
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <section aria-label="Inquiry list" className="space-y-3">
          {!loading && leads.length === 0 && <p className="rounded-xl border border-zinc-700 p-6 text-zinc-300">No inquiries in this view.</p>}
          {leads.map(lead => <button key={lead.id} type="button" aria-pressed={selected === lead.id} onClick={() => { if (lead.id === selected || canDiscard()) setSelected(lead.id); }}
            className={`w-full rounded-xl border p-4 text-left ${selected === lead.id ? "border-amber-300 bg-zinc-800" : "border-zinc-700 bg-zinc-900"}`}>
            <span className="block text-lg font-semibold">{lead.fullName}</span><span className="mt-1 block text-sm text-zinc-300">{lead.vehicle} · {lead.service}</span>
            <span className="mt-3 block text-sm text-amber-200">{stageLabels[lead.stage]} · alert {lead.notification === "sent" ? "accepted by email provider" : lead.notification}</span>
            {lead.followUpDueAt && <span className={`mt-1 block text-sm ${Date.parse(lead.followUpDueAt) <= Date.now() ? "text-red-300" : "text-zinc-400"}`}>Follow up: {dateLabel(lead.followUpDueAt)}</span>}
          </button>)}
          <div className="flex justify-between gap-3"><button disabled={offset === 0 || loading} className="rounded-lg border border-zinc-600 px-4 py-3 disabled:opacity-40" onClick={() => { if (canDiscard()) setOffset(Math.max(0, offset-25)); }}>Previous</button>
          <button disabled={!hasMore || loading} className="rounded-lg border border-zinc-600 px-4 py-3 disabled:opacity-40" onClick={() => { if (canDiscard()) setOffset(offset+25); }}>Next</button></div>
        </section>
        {leads.find(lead => lead.id === selected) && <LeadDetail key={`${selected}:${leads.find(lead => lead.id === selected)!.version}`} lead={leads.find(lead => lead.id === selected)!} onSaved={load} onLocked={locked} onDirty={setDirty} />}
      </div>
      </div>
    </>}
  </main>;
}
function LeadDetail({ lead, onSaved, onLocked, onDirty }: { lead: Lead; onSaved: () => Promise<void>; onLocked: () => void; onDirty: (dirty: boolean) => void }) {
  const [stage, setStage] = useState<Stage>(lead.stage);
  const [due, setDue] = useState(localDateInput(lead.followUpDueAt));
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const changed = stage !== lead.stage || due !== localDateInput(lead.followUpDueAt) || note !== "";
    onDirty(changed);
    const preventLoss = (event: BeforeUnloadEvent) => { if (changed) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", preventLoss);
    return () => window.removeEventListener("beforeunload", preventLoss);
  }, [stage, due, note, lead.stage, lead.followUpDueAt, onDirty]);
  async function save(event: FormEvent) {
    event.preventDefault(); if (busy) return; setBusy(true); setError("");
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: lead.version, stage, note, followUpDueAt: due ? new Date(due).toISOString() : null, manualBookingConfirmed: confirmed }) });
      const result = await response.json();
      if (response.status === 401) { onLocked(); return; }
      if (!response.ok) throw new Error(result.error || "Update could not be confirmed. Your edits are still here.");
      await onSaved();
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Update failed. Your edits are still here."); }
    finally { setBusy(false); }
  }
  return <section aria-label="Inquiry details" className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 sm:p-7">
    <h2 className="text-2xl font-semibold">{lead.fullName}</h2><p className="mt-1 text-zinc-300">{lead.vehicle}</p>
    <div className="my-5 flex flex-wrap gap-3"><a className={buttonClass} href={`tel:${lead.phone}`}>Call {lead.phone}</a>{lead.email && <a className="rounded-lg border border-zinc-600 px-4 py-3" href={`mailto:${encodeURIComponent(lead.email)}`}>Email customer</a>}</div>
    <dl className="space-y-3 text-sm"><div><dt className="text-zinc-400">Service and condition</dt><dd>{lead.service} · {lead.condition}</dd></div>
      <div><dt className="text-zinc-400">Requested date</dt><dd>{lead.preferredDate} (not confirmed)</dd></div>
      <div><dt className="text-zinc-400">Service location</dt><dd className="whitespace-pre-wrap break-words">{lead.location}</dd></div>
      <div><dt className="text-zinc-400">Customer notes</dt><dd className="whitespace-pre-wrap break-words">{lead.notes || "None"}</dd></div>
      <div><dt className="text-zinc-400">Received</dt><dd>{dateLabel(lead.receivedAt)}</dd></div>
      <div><dt className="text-zinc-400">Customer / vehicle record</dt><dd className="break-all text-xs">{lead.customerId} / {lead.vehicleId}</dd></div></dl>
    <form onSubmit={save} className="mt-7 space-y-4 border-t border-zinc-700 pt-6">
      <label className="block">Stage<select className={`${inputClass} mt-2`} value={stage} onChange={e => { setStage(e.target.value as Stage); setConfirmed(false); }}>{transitions[lead.stage].map(value => <option key={value} value={value}>{stageLabels[value]}</option>)}</select></label>
      {stage === "booked" && lead.stage !== "booked" && <label className="flex gap-3 rounded-lg bg-amber-950/30 p-3 text-sm"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} required />The appointment was separately confirmed with the customer. This does not create a calendar event.</label>}
      <label className="block">Follow-up due (your device time zone; clear when no follow-up is needed)<input className={`${inputClass} mt-2`} type="datetime-local" value={due} onChange={e => setDue(e.target.value)} /></label>
      <label className="block">Add a staff note<textarea className={`${inputClass} mt-2`} rows={3} maxLength={2000} value={note} onChange={e => setNote(e.target.value)} /></label>
      {error && <p role="alert" className="text-red-300">{error}</p>}
      <button className={buttonClass} disabled={busy}>{busy ? "Saving…" : "Save update"}</button>
    </form>
    <h3 className="mt-7 text-lg font-semibold">Recent activity (up to 5 entries)</h3><ol className="mt-3 space-y-4">{lead.history.map((item, index) => <li key={index} className="border-l border-zinc-600 pl-3 text-sm"><p className="text-zinc-400">{dateLabel(item.at)} · {stageLabels[item.stage]}</p><p className="whitespace-pre-wrap break-words">{item.note || (item.kind === "received" ? "Inquiry received" : "Inquiry updated")}</p></li>)}</ol>
  </section>;
}

// Sample snapshot for this public preview. Every team, task, approval, and usage
// figure is invented. Narrative times are frozen to SAMPLE_AS_OF so a reload cannot
// look like newly collected activity. Routine countdowns use the viewer's clock
// only so the campus clocks still move; they are not a live calendar.
export const SAMPLE_REVISION = "sample-roster-1";
export const SAMPLE_AS_OF_MS = Date.parse("2026-11-09T12:00:00Z");
export const SAMPLE_UPDATED = "Sample snapshot · 9.11.2026, 12:00 UTC · not a live collection";

export const SAMPLE_PROVENANCE = {
  kind: "sample" as const,
  revision: SAMPLE_REVISION,
  asOf: "2026-11-09T12:00:00Z",
  note: "Invented example data. Usage figures are not actual usage. Refresh only reloads this snapshot. No bot, mailbox, calendar, or other system is contacted.",
};

const pad = (n: number) => String(n).padStart(2, "0");
function parts(ms: number) {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" } as any).formatToParts(new Date(ms));
  const g = (t: string) => Number(f.find((p) => p.type === t)?.value || 0);
  return { d: g("day"), m: g("month"), y: g("year"), hh: g("hour"), mm: g("minute") };
}
const H = 3600e3, MIN = 60e3, DAY = 24 * H;
const AS = SAMPLE_AS_OF_MS;
function ago(ms: number) { const p = parts(AS - ms); return `${p.d}.${p.m} ${pad(p.hh)}:${pad(p.mm)}`; }
function day(days: number) { const p = parts(AS - days * DAY); return `${p.d}.${p.m}`; }
function iso(now: number, ahead: number) {
  const t = now + ahead; const p = parts(t);
  const off = Math.round((Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mm) - Math.floor(t / MIN) * MIN) / MIN);
  const s = off >= 0 ? "+" : "-"; const a = Math.abs(off);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.hh)}:${pad(p.mm)}:00${s}${pad(Math.floor(a / 60))}:${pad(a % 60)}`;
}

const desk = (name: string, theme: string) => ({ name, role: `Sample desk · ${theme} · not a real bot` });

export function demoData(nowMs = Date.now()) {
  const now = Math.floor(nowMs / MIN) * MIN;

  const TEAMS = [
    {
      id: "chief", name: "Chief Of Staff", status: "active",
      lead: { name: "Chief Of Staff", role: "Sample room · coordination examples" },
      members: [desk("Brief", "weekly brief"), desk("Agenda", "sample agenda")],
      work: "Example theme: a coordination room. Sample goal is a one-page weekly brief. Nothing here is a real status.",
      next: "Example: look at the sample brief outline.",
      lines: ["Example brief", "Sample agenda", "Not live", "Demo only"],
      pending: [
        { id: "ex-chief-brief", what: "Example: review a fictional weekly brief outline. This is not a real approval.", since: ago(5 * H) },
      ],
      usage: "example 8%",
      goal: { label: "Example brief sections", current: 3, target: 5, due: day(-4) },
      activity: [
        { time: ago(40 * MIN), text: "Example: a sample outline for the weekly brief was added to the board." },
        { time: ago(3 * H), text: "Example: sample agenda items were grouped into three themes." },
        { time: ago(26 * H), text: "Example: this room was filled with invented coordination notes." },
      ],
      tasks: [
        { text: "Example: draft the sample brief outline", state: "doing", owner: "Brief" },
        { text: "Example: list three sample priorities", state: "todo", owner: "Agenda" },
        { text: "Example: mark the brief as a demo", state: "done", owner: "Chief Of Staff" },
      ],
      routines: [
        { id: "ex-chief-daily", owner: "Chief Of Staff", name: "Example morning brief", schedule: "Sample: weekdays at 09:00", state: "on", lastRun: ago(20 * H), lastResult: "ok", next: iso(now, 5 * H), perWeek: 5, note: "Example schedule. Not a real routine." },
      ],
      botUsage: [{ owner: "Chief Of Staff", pct: 4 }, { owner: "Brief", pct: 2 }, { owner: "Agenda", pct: 2 }],
    },
    {
      id: "tech", name: "Tech bot", status: "active",
      lead: { name: "Tech bot", role: "Sample room · tools and checks" },
      members: [desk("Patch", "sample checks"), desk("Probe", "sample notes")],
      work: "Example theme: a tools room. Sample work is a checklist for a fictional health check. No system is being monitored.",
      next: "Example: read the sample checklist.",
      lines: ["Example checks", "Sample notes", "No live hosts"],
      pending: [
        { id: "ex-tech-check", what: "Example: keep a fictional health-check note on the sample board. Not a real request.", since: ago(8 * H) },
      ],
      usage: "example 7%",
      goal: { label: "Example checklist items", current: 4, target: 6, due: day(-6) },
      activity: [
        { time: ago(70 * MIN), text: "Example: two sample checklist rows were marked done." },
        { time: ago(6 * H), text: "Example: a sample diagram of rooms was sketched." },
      ],
      tasks: [
        { text: "Example: write the sample health-check list", state: "doing", owner: "Probe" },
        { text: "Example: invent a sample status color key", state: "todo", owner: "Patch" },
        { text: "Example: label the room as demo data", state: "done", owner: "Tech bot" },
      ],
      routines: [
        { id: "ex-tech-nightly", owner: "Probe", name: "Example nightly note", schedule: "Sample: every night at 02:00", state: "on", lastRun: ago(14 * H), lastResult: "ok", next: iso(now, 10 * H), perWeek: 7, note: "Example only. Nothing runs." },
      ],
      botUsage: [{ owner: "Tech bot", pct: 3 }, { owner: "Probe", pct: 2 }, { owner: "Patch", pct: 2 }],
    },
    {
      id: "coach", name: "LLM Coach", status: "active",
      lead: { name: "LLM Coach", role: "Sample room · practice prompts" },
      members: [desk("Drill", "sample drills"), desk("Notes", "sample notes")],
      work: "Example theme: a coaching room. Sample drills are fictional prompt exercises. No model is being called.",
      next: "Example: open the sample drill card.",
      lines: ["Example drills", "Sample prompts", "No model calls"],
      pending: [
        { id: "ex-coach-drill", what: "Example: pick one of three fictional practice drills. Not a real assignment.", since: ago(12 * H) },
      ],
      usage: "example 6%",
      goal: { label: "Example drills sketched", current: 2, target: 4, due: day(-9) },
      activity: [
        { time: ago(2 * H), text: "Example: a sample prompt drill was written on the board." },
        { time: ago(9 * H), text: "Example: sample coaching notes were filed under 'demo'." },
      ],
      tasks: [
        { text: "Example: write a sample prompt drill", state: "doing", owner: "Drill" },
        { text: "Example: add a sample reflection line", state: "todo", owner: "Notes" },
        { text: "Example: title the room LLM Coach", state: "done", owner: "LLM Coach" },
      ],
      routines: [
        { id: "ex-coach-week", owner: "LLM Coach", name: "Example weekly drill", schedule: "Sample: Mondays at 10:00", state: "on", lastRun: ago(2 * DAY), lastResult: "ok", next: iso(now, 2 * DAY), perWeek: 1, note: "Example schedule. Not a real routine." },
      ],
      botUsage: [{ owner: "LLM Coach", pct: 3 }, { owner: "Drill", pct: 2 }, { owner: "Notes", pct: 1 }],
    },
    {
      id: "coder", name: "Coder Bot", status: "active",
      lead: { name: "Coder Bot", role: "Sample room · fictional code tasks" },
      members: [desk("Diff", "sample diff"), desk("Test", "sample tests")],
      work: "Example theme: a code room. Tasks describe a fictional readme tweak. No repository is connected.",
      next: "Example: read the sample diff note.",
      lines: ["Example diff", "Sample tests", "No repo link"],
      pending: [
        { id: "ex-coder-note", what: "Example: file a fictional note that a sample diff is ready to read. Not a real review.", since: ago(4 * H) },
      ],
      usage: "example 9%",
      goal: { label: "Example sample files", current: 1, target: 3, due: day(-3) },
      activity: [
        { time: ago(50 * MIN), text: "Example: a sample test name was added to the board." },
        { time: ago(7 * H), text: "Example: the room was marked 'no repository connected'." },
      ],
      tasks: [
        { text: "Example: sketch a sample diff summary", state: "doing", owner: "Diff" },
        { text: "Example: name two sample tests", state: "doing", owner: "Test" },
        { text: "Example: state that no repo is linked", state: "done", owner: "Coder Bot" },
      ],
      routines: [
        { id: "ex-coder-tests", owner: "Test", name: "Example test reminder", schedule: "Sample: weekdays at 16:00", state: "paused", perWeek: 5, note: "Example paused state. Nothing is scheduled for real." },
      ],
      botUsage: [{ owner: "Coder Bot", pct: 5 }, { owner: "Diff", pct: 2 }, { owner: "Test", pct: 2 }],
    },
    {
      id: "shopping", name: "Shopping Bot", status: "partial",
      lead: { name: "Shopping Bot", role: "Sample room · fictional errands" },
      members: [desk("List", "sample list"), desk("Compare", "sample compare")],
      work: "Example theme: an errand room. The list is three invented office supplies. No store or order is connected.",
      next: "Example: glance at the sample supply list.",
      lines: ["Example list", "No orders", "Demo prices"],
      pending: [
        { id: "ex-shop-list", what: "Example: a fictional supply list (notebook, pens, tape). Not an order and not a real approval.", since: ago(30 * H) },
      ],
      usage: "example 4%",
      goal: { label: "Example list rows", current: 3, target: 3, due: day(-2) },
      activity: [
        { time: ago(5 * H), text: "Example: three invented supply rows were written down." },
        { time: ago(28 * H), text: "Example: the room notes that prices are not real." },
      ],
      tasks: [
        { text: "Example: write a three-line sample list", state: "doing", owner: "List" },
        { text: "Example: add the words 'not an order'", state: "todo", owner: "Compare" },
        { text: "Example: label prices as fiction", state: "done", owner: "Shopping Bot" },
      ],
      routines: [
        { id: "ex-shop-week", owner: "Shopping Bot", name: "Example list reminder", schedule: "Sample: Fridays at 11:00", state: "on", next: iso(now, 3 * DAY), perWeek: 1, note: "Example schedule. No store is checked." },
      ],
      botUsage: [{ owner: "Shopping Bot", pct: 2 }, { owner: "List", pct: 1 }, { owner: "Compare", pct: 1 }],
    },
    {
      id: "calendar", name: "Calendar Bot", status: "active",
      lead: { name: "Calendar Bot", role: "Sample room · fictional dates" },
      members: [desk("Slot", "sample slots"), desk("Remind", "sample reminders")],
      work: "Example theme: a dates room. The entries are made-up placeholders. No calendar account is connected.",
      next: "Example: read the sample placeholder slots.",
      lines: ["Example slots", "No calendar", "Demo times"],
      pending: [
        { id: "ex-cal-slot", what: "Example: choose between two fictional placeholder slots. Not a real booking.", since: ago(6 * H) },
      ],
      usage: "example 5%",
      goal: { label: "Example placeholder slots", current: 2, target: 4, due: day(-7) },
      activity: [
        { time: ago(90 * MIN), text: "Example: two fictional time slots were written on the board." },
        { time: ago(20 * H), text: "Example: the room says no calendar is connected." },
      ],
      tasks: [
        { text: "Example: write two sample time slots", state: "doing", owner: "Slot" },
        { text: "Example: add a sample reminder line", state: "todo", owner: "Remind" },
        { text: "Example: mark times as fiction", state: "done", owner: "Calendar Bot" },
      ],
      routines: [
        { id: "ex-cal-daily", owner: "Remind", name: "Example day-ahead note", schedule: "Sample: every day at 18:00", state: "on", lastRun: ago(18 * H), lastResult: "fail", next: iso(now, 6 * H), perWeek: 7, note: "Example failure flag for the campus clocks. No reminder was sent." },
      ],
      botUsage: [{ owner: "Calendar Bot", pct: 3 }, { owner: "Slot", pct: 1 }, { owner: "Remind", pct: 1 }],
    },
    {
      id: "email", name: "Email Bot", status: "active",
      lead: { name: "Email Bot", role: "Sample room · fictional drafts" },
      members: [desk("Draft", "sample draft"), desk("Folder", "sample folders")],
      work: "Example theme: a drafts room. The text is a fake three-line note. No mailbox is connected and no message exists.",
      next: "Example: read the sample draft title.",
      lines: ["Example draft", "No mailbox", "Not a message"],
      pending: [
        { id: "ex-mail-draft", what: "Example: a fictional draft title, 'Sample note'. Not an email and not a real approval.", since: ago(9 * H) },
      ],
      usage: "example 5%",
      goal: { label: "Example draft lines", current: 3, target: 3, due: day(-1) },
      activity: [
        { time: ago(4 * H), text: "Example: a three-line fictional draft title was pinned." },
        { time: ago(22 * H), text: "Example: the room repeats that no mailbox is connected." },
      ],
      tasks: [
        { text: "Example: title a sample draft", state: "doing", owner: "Draft" },
        { text: "Example: file it under 'demo'", state: "todo", owner: "Folder" },
        { text: "Example: state that nothing was sent", state: "done", owner: "Email Bot" },
      ],
      routines: [
        { id: "ex-mail-hour", owner: "Email Bot", name: "Example folder glance", schedule: "Sample: hourly in the story only", state: "paused", perWeek: 0, note: "Paused example. The preview does not read or send mail." },
      ],
      botUsage: [{ owner: "Email Bot", pct: 3 }, { owner: "Draft", pct: 1 }, { owner: "Folder", pct: 1 }],
    },
    {
      id: "grok", name: "Grok Bot", status: "active",
      lead: { name: "Grok Bot", role: "Sample room · fictional usage story" },
      members: [desk("Prompt", "sample prompt"), desk("Check", "sample check")],
      work: "Example theme: a usage story room. The percentages on this campus are round example numbers, not actual usage.",
      next: "Example: read the sample usage caption.",
      lines: ["Example usage", "Not actual", "No model call"],
      pending: [
        { id: "ex-grok-caption", what: "Example: confirm the caption 'sample usage, not actual usage' stays visible. Not a real approval.", since: ago(2 * H) },
      ],
      usage: "example 11%",
      goal: { label: "Example captions placed", current: 1, target: 2, due: day(-5) },
      activity: [
        { time: ago(35 * MIN), text: "Example: the usage caption was set to 'not actual usage'." },
        { time: ago(11 * H), text: "Example: this room does not call a model when the page loads." },
      ],
      tasks: [
        { text: "Example: write the sample usage caption", state: "doing", owner: "Check" },
        { text: "Example: keep the page from calling out", state: "doing", owner: "Grok Bot" },
        { text: "Example: name the room Grok Bot", state: "done", owner: "Prompt" },
      ],
      routines: [
        { id: "ex-grok-week", owner: "Grok Bot", name: "Example weekly caption", schedule: "Sample: Sundays at 09:00", state: "unknown", perWeek: 1, note: "Unknown on purpose: this preview cannot see real routines." },
      ],
      botUsage: [{ owner: "Grok Bot", pct: 6 }, { owner: "Prompt", pct: 3 }, { owner: "Check", pct: 2 }],
    },
    {
      id: "realestate", name: "Real Estate Bot", status: "partial",
      lead: { name: "Real Estate Bot", role: "Sample room · fictional listings" },
      members: [desk("Listing", "sample card"), desk("Tour", "sample tour")],
      work: "Example theme: a listings room. Cards are invented and have no address. No property feed is connected.",
      next: "Example: read the sample listing card.",
      lines: ["Example card", "No address", "Not a listing"],
      pending: [
        { id: "ex-re-card", what: "Example: a fictional listing card with no address. Not a property and not a real approval.", since: ago(15 * H) },
      ],
      usage: "example 3%",
      goal: { label: "Example cards with no address", current: 1, target: 2, due: day(-8) },
      activity: [
        { time: ago(3 * H), text: "Example: one fictional listing card was added, with no address." },
        { time: ago(2 * DAY), text: "Example: the room states that no property feed is connected." },
      ],
      tasks: [
        { text: "Example: write a sample card with no address", state: "doing", owner: "Listing" },
        { text: "Example: add the words 'not a listing'", state: "todo", owner: "Tour" },
        { text: "Example: leave the address blank", state: "done", owner: "Real Estate Bot" },
      ],
      routines: [
        { id: "ex-re-week", owner: "Real Estate Bot", name: "Example card review", schedule: "Sample: Wednesdays at 15:00", state: "on", next: iso(now, 36 * H), perWeek: 1, note: "Example schedule. No listings are fetched." },
      ],
      botUsage: [{ owner: "Real Estate Bot", pct: 2 }, { owner: "Listing", pct: 1 }],
    },
  ];

  return {
    UPDATED: SAMPLE_UPDATED,
    provenance: SAMPLE_PROVENANCE,
    USAGE: {
      weeklyPct: 36,
      reset: "example reset, not a real billing reset",
      onDemandPct: 0,
      period: "example period, not actual usage",
      byTeam: [
        { label: "Example · Chief Of Staff", pct: 8 },
        { label: "Example · Tech bot", pct: 7 },
        { label: "Example · LLM Coach", pct: 6 },
        { label: "Example · Coder Bot", pct: 9 },
        { label: "Example · others", pct: 6 },
      ],
      topBots: [
        { label: "Example · Grok Bot (not actual)", pct: 6 },
        { label: "Example · Coder Bot (not actual)", pct: 5 },
        { label: "Example · Chief Of Staff (not actual)", pct: 4 },
        { label: "Example · Tech bot (not actual)", pct: 3 },
        { label: "Example · Email Bot (not actual)", pct: 3 },
      ],
    },
    TEAMS,
  };
}

export function sampleSnapshot(nowMs = Date.now()) {
  return demoData(nowMs);
}

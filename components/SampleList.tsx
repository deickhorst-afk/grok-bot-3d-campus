"use client";
// Accessible list alternative. The 3D campus stays the default view.
import type { Team } from "./ControlCenter";

type Provenance = { kind: string; revision: string; asOf: string; note: string } | null;

const STATUS: Record<string, string> = { active: "Active", partial: "Partly active", hold: "Waiting for you", frozen: "Frozen" };

export default function SampleList(props: {
  teams: Team[];
  updated: string;
  provenance: Provenance;
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const note = props.provenance?.note || "Invented example data. Not a live collection.";
  return (
    <main style={{ position: "absolute", inset: 0, zIndex: 30, overflow: "auto", background: "#141414", color: "#fff", padding: "16px 16px calc(24px + env(safe-area-inset-bottom))", WebkitOverflowScrolling: "touch" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button autoFocus onClick={props.onClose} style={{ font: "inherit", fontSize: 16, fontWeight: 700, minHeight: 44, padding: "10px 16px", borderRadius: 999, border: "1px solid #3b3b3d", background: "#c22576", color: "#fff", cursor: "pointer" }}>
            Back to 3D campus
          </button>
          <span style={{ fontSize: 13, color: "#9a9a9a" }}>List alternative · same sample snapshot</span>
        </div>
        <header>
          <h1 style={{ fontSize: 22, margin: "8px 0 6px" }}>Sample team list</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: "#d0d0d0" }}>{note}</p>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#9a9a9a" }}>
            {props.updated}
            {props.provenance ? ` · ${props.provenance.revision} · ${props.provenance.asOf}` : ""}
          </p>
        </header>
        {props.teams.map((team, i) => (
          <article key={team.id} aria-labelledby={`team-${team.id}`} style={{ background: "#1e1e1e", border: "1px solid #2c2c2e", borderRadius: 16, padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <h2 id={`team-${team.id}`} style={{ fontSize: 18, margin: 0 }}>{i + 1}. {team.name}</h2>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ec5aa6" }}>{STATUS[team.status] || team.status}</span>
              <span style={{ fontSize: 12, color: "#9a9a9a" }}>{team.usage || "example usage"}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.45, margin: "8px 0" }}>{team.work}</p>
            <h3 style={{ fontSize: 13, margin: "10px 0 4px", color: "#9a9a9a" }}>Sample tasks</h3>
            <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 14, lineHeight: 1.45 }}>
              {team.tasks.map((task) => <li key={task.text}>{task.state}: {task.text}{task.owner ? ` · ${task.owner}` : ""}</li>)}
            </ul>
            <h3 style={{ fontSize: 13, margin: "10px 0 4px", color: "#9a9a9a" }}>Sample activity</h3>
            <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 14, lineHeight: 1.45 }}>
              {team.activity.map((item) => <li key={item.time + item.text}><span style={{ color: "#9a9a9a" }}>{item.time}</span> · {item.text}</li>)}
            </ul>
            <h3 style={{ fontSize: 13, margin: "10px 0 4px", color: "#9a9a9a" }}>Sample queue · not real approvals</h3>
            {team.pending.length ? (
              <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 14, lineHeight: 1.45 }}>
                {team.pending.map((item) => <li key={item.id}>{item.what} <span style={{ color: "#9a9a9a" }}>({item.since})</span></li>)}
              </ul>
            ) : <p style={{ margin: 0, fontSize: 14, color: "#9a9a9a" }}>No sample queue items.</p>}
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6e6e6e" }}>Sample desks, not additional bots: {[team.lead, ...team.members].map((m) => m.name).join(", ")}.</p>
            <button onClick={() => props.onOpen(team.id)} style={{ font: "inherit", fontSize: 15, fontWeight: 700, minHeight: 44, marginTop: 10, padding: "10px 14px", borderRadius: 12, border: "1px solid #3b3b3d", background: "#2c2c2e", color: "#fff", cursor: "pointer" }}>
              Open {team.name} in 3D
            </button>
          </article>
        ))}
        <footer style={{ fontSize: 12, color: "#6e6e6e", lineHeight: 1.45 }}>
          MIT License. Copyright (c) 2026 Sar Bar-Shem. This preview adds no live integration.
        </footer>
      </div>
    </main>
  );
}

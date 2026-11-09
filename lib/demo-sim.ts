// Sample preview: the snapshot is read-only invented data.
// send() and refreshRound() do nothing. They must not invent follow-ups,
// approvals, or "the team acted" events.
import { demoData } from "./demo-data";

export type DemoApi = {
  snapshot: () => ReturnType<typeof demoData>;
  send: (items: string[]) => void;
  refreshRound: () => void;
  subscribe: (fn: () => void) => () => void;
};

export function createDemoSim(): DemoApi {
  try { sessionStorage.removeItem("ccDemoSim.v1"); } catch { /* private mode */ }
  return {
    snapshot: () => demoData(Date.now()),
    send: () => {},
    refreshRound: () => {},
    subscribe: () => () => {},
  };
}

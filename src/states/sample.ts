import { createMachine } from "xstate";

export const toggleMachine = createMachine({
  id: "toggle-state",
  initial: "On",
  states: {
    On: { on: { toggle: "Off" } },
    Off: { on: { toggle: "On" } },
  },
});

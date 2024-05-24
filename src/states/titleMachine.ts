import { createMachine, sendTo } from "xstate";
export const titleMachine = createMachine({
  context: {
    value: "hello",
  },
  initial: "display",
  states: {
    display: {
      on: {
        "title.updated": {
          actions: sendTo(({ system }) => system.get("notifier"), {
            type: "notify",
          }),
        },
      },
    },
  },
});

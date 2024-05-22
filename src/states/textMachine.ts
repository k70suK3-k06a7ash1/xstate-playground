import { assign, createMachine } from "xstate";

export const textMachine = createMachine({
  context: {
    committedValue: "",
    value: "",
  },
  initial: "reading",
  states: {
    reading: {
      on: {
        "text.edit": { target: "editing" },
      },
    },
    editing: {
      on: {
        "text.change": {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        "text.commit": {
          actions: assign({
            committedValue: ({ context }) => context.value,
          }),
          target: "reading",
        },
        "text.cancel": {
          actions: assign({
            value: ({ context }) => context.committedValue,
          }),
          target: "reading",
        },
      },
    },
  },
});

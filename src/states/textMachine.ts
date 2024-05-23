import { assign, createMachine, sendTo } from "xstate";

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
        "text.double": {
          actions: assign({
            value: ({ context }) => context.value.repeat(2),
          }),
        },
        "text.revert": {
          actions: assign({
            value: ({ context }) => context.committedValue,
          }),
        },
        "text.commit": {
          actions: assign({
            committedValue: ({ context }) => context.value,
          }),
          target: "reading",
        },
        "text.send": {
          actions: sendTo("childActor", ({ self }) => ({
            type: "ping",
            sender: self,
          })),
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

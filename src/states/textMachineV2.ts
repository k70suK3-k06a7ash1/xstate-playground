import { assign, setup } from "xstate";

export const textMachineV2 = setup({
  types: {
    context: {} as { committedValue: string; value: string },
    events: {} as
      | { type: "text.edit" }
      | { type: "text.change"; value: string }
      | { type: "text.double" }
      | { type: "text.revert" }
      | { type: "text.commit" }
      | { type: "text.cancel" },
  },
  actions: {
    double: assign({
      value: ({ context }) => context.value.repeat(2),
    }),
    revert: assign({
      value: ({ context }) => context.committedValue,
    }),
    cancel: assign({
      value: ({ context }) => context.committedValue,
    }),
    commit: assign({
      committedValue: ({ context }) => context.value,
    }),
  },
}).createMachine({
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
          actions: "double",
        },
        "text.revert": {
          actions: "revert",
        },
        "text.commit": {
          actions: "commit",
          target: "reading",
        },
        // "text.send": {
        //   actions: sendTo("childActor", ({ self }) => ({
        //     type: "ping",
        //     sender: self,
        //   })),
        // },
        "text.cancel": {
          actions: "cancel",
          target: "reading",
        },
      },
    },
  },
});

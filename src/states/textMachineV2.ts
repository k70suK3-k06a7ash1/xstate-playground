import { assign, setup } from "xstate";

export const textMachineV2 = setup({
  types: {
    context: {} as { committedValue: string; value: string },
    events: {} as
      | { type: "text.edit" }
      | { type: "text.change"; value: string }
      | { type: "text.double" }
      | { type: "text.revert" }
      | { type: "text.init" }
      | { type: "text.commit" }
      | { type: "text.cancel" },
  },
  actions: {
    init: assign({
      value: () => "",
      committedValue: () => "",
    }),
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
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgCcx0ICoBiAFzAA96TJd6BtABgF1FQABwD2sDrmH4BIJogBMAZjkkALAEYAbBoCsADgUBODQYXdtGgDQgAnojVy1quRpULtB93IDs3NwF8-KzQsPEJSdnoaBmZWAg4efiQQETFIyWlZBDluDRJuFTkjNTdslRUDXStbBDUvRzltNQ8vAzVdNQ7dXQCgjBwCYjZqSPw6RhYSHHRRsATpFPF0pMyCqvk6kl0vOXU1AsL9Ex6QYP6wofFR6ImIYQBXACMAG1m+edFFqWXEVxIjAxU3B2Cl0vjqCjWNS8uXc0Jc3CaOzkW2Op1CgwiUXGrAoADcwGQuG8kgs0l9QCsvCQ9kpTND1BpdOZIe0SEpCpoNGptNoEd1Aic+ujwsMsTFJsJUKh4sShB8yRl5Dk8gUiiV8uVKjZ5FoSNpnD5tEo2vqAaihQMRZcxuLMNNMGAnnMSfKJOSZErcvlClz1WUKpCFFzNgiVPrtjyzcd8MIIHBpGjLe9Um7FQgALSWbUZjTmkKW8iUaijZOfNNB7R6uQONpqMwGrPVZFU7g+JT6RSaLoqPNnDGiksulNLCmIYP6Vs7HI8lQtQPbamz7ldA0NAIBIA */
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
        "text.init": {
          actions: "init",
          target: "reading",
        },
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

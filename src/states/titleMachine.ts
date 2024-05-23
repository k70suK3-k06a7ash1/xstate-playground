import { assign, createMachine } from "xstate";
export const titleMachine = createMachine({
  context: {
    value: "hello",
  },
  initial: "display",
  states: {
    display: {
      on: {
        "title.update": {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
      },
    },
  },
});

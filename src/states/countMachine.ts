import { setup, assign } from "xstate";

export const machine = setup({
  types: {
    context: {} as { count: number },
    events: {} as { type: "inc" } | { type: "dec" },
  },
  actions: {
    increment: assign({
      count: ({ context }) => context.count + 1,
    }),
    decrement: assign({
      count: ({ context }) => context.count - 1,
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgMwG0AGAXUVAAcB7WXAF1yf3pAA9EAjABYAdAGYhAdipVJAVgBscoTLECBAGhABPQbJEAmSVKEAOU2oMqAnEIC+drWix5CpCGEq0ezVhy48-AgCBiLCCmZi1gZUQgoGAmpausEGDo4g+Ewe8EggzjgExD4s7JzceUECksmIMZIiyrbWkgrxZgLm6XZAA */
  context: { count: 0 },
  on: {
    inc: { actions: "increment" },
    dec: { actions: "decrement" },
  },
});

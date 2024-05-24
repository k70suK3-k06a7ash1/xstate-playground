import { createMachine } from "xstate";
import { titleMachine } from "./titleMachine";
import { textMachine } from "./textMachine";

export const providerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtADZ0AT0FDkaEMXLVadAHRVcJADaMWbTtz6IALACYxiAIyGAHItMBWQwGZ9ATkMAGJ0Pt3DUqUA */
  invoke: {
    src: titleMachine,
    systemId: "provider",
  },
  initial: "ideal",
  states: {
    ideal: {
      invoke: {
        src: textMachine,
      },
    },
  },
});

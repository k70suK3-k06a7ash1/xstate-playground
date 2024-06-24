import { setup } from "xstate";

export type EditStatusEvent =
  | { type: "fetch" }
  | { type: "change" }
  | { type: "submit" }
  | { type: "failed" };

export type EditStatusEventKeys = EditStatusEvent["type"];

export const editStatusMachine = setup({
  types: {
    events: {} as EditStatusEvent,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgNwBcBiAMzApwG0AGAXUVAAcB7WS3bvg4gAHogDMANgDsJACwBWcQrlzmzJZICMAGhABPCVoAc89ScVzjWhQoBM0gL6O9aLHkKkA7un74oVCKwFOgUYCToNGEATsji6sxEVG44BMQkPn5QLOxIIDx8FAJCeWIICgCcciTGStLMxtIVWuLGFXqGCHba8lrMdipyLZIVFVLOrhipniRg+OgARgA2YFQ46P5gOcIF-ILCZZLMWiSSCvVVyhUKRwodiNYkJib2KlUVduLiEyApHumwdAANwIAVgAFcFqhKNs8rsivtSogbKZKtI7FohhjasZmOJ7l1KiRmnZjHJxFYtGcKj8-mlSICQf5aL4VhBYVxeHsSqAyiiSGiMViXrj8QZEHZjvIBgp+kMFFTSbSpv8GcDIIFgqFwpEYsg+uoknSZozIBz8lyETzRBIZPIlIN1JpdOKuj0hv1BsNRuMXL8VfTZtFotxopqQmEIlEwLEDYlkgGZjGQ9FzfDigdbbJFMpVE6pC7OpK7MS7HZml85Oi8VpnH78NwIHBhMbiDtLRmkQgALSSAm95XuQPkCjtwqd3kS4ziAVycuVD6NBTGAYE8QmEikrTSN5aGzr5hyQfTdKZIr+MfczMIKyyM478vdZSSDEEgYVEhNcnicvSLQVQ9jGPVVZnmZYwEvK1rz-WRHzGcRmk9bcCTaJ5VG0f9pCaYwgL9Vs1SZKBIInG0bzsFCP3JewHG3awBkkI88MTAF1QgYjEUnLp6k3csbCaCojjJaQ3yJL9xHRWUKkaa5gMDZNQ3Y60yho05+lqBUMQ+f87ldSUTniep0Sw2pWlsOtHCAA */
  initial: "init",
  states: {
    init: {
      on: {
        fetch: {
          target: "waiting",
        },
      },
    },
    waiting: {
      after: {
        3000: { target: "enable" },
      },
    },
    enable: {
      on: {
        change: {
          target: "saving",
        },
      },
    },
    saving: {
      on: {
        submit: {
          target: "saved",
        },
        failed: {
          target: "error",
        },
      },
    },
    saved: {
      after: {
        1000: { target: "waiting" },
      },
    },
    error: {
      after: {
        1000: { target: "waiting" },
      },
    },
  },
});

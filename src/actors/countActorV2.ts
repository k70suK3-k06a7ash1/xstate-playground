import { EventObject, ActorLogic, Snapshot } from "xstate";
import { Match } from "effect";
export const countLogic: ActorLogic<
  Snapshot<undefined> & { context: number },
  EventObject
> = {
  transition: (state, event) =>
    Match.value({ type: event.type }).pipe(
      Match.when({ type: "INC" }, () => ({
        ...state,
        context: state.context + 1,
      })),
      Match.when({ type: "DEC" }, () => ({
        ...state,
        context: state.context - 1,
      })),
      Match.orElse(() => state)
    ),
  getInitialSnapshot: () => ({
    status: "active",
    output: undefined,
    error: undefined,
    context: 0,
  }),
  getPersistedSnapshot: (s) => s,
};

// const actor = createActor(countLogic);
// actor.subscribe((state) => {
//   console.log(state.context);
// });
// actor.start(); // => 0
// actor.send({ type: "INC" }); // => 1
// actor.send({ type: "INC" }); // => 2

import { createActor, EventObject, ActorLogic, Snapshot } from "xstate";

const countLogic: ActorLogic<
  Snapshot<undefined> & { context: number },
  EventObject
> = {
  transition: (state, event) => {
    if (event.type === "INC") {
      return {
        ...state,
        context: state.context + 1,
      };
    } else if (event.type === "DEC") {
      return {
        ...state,
        context: state.context - 1,
      };
    }
    return state;
  },
  getInitialSnapshot: () => ({
    status: "active",
    output: undefined,
    error: undefined,
    context: 0,
  }),
  getPersistedSnapshot: (s) => s,
};

const actor = createActor(countLogic);
actor.subscribe((state) => {
  console.log(state.context);
});
actor.start(); // => 0
actor.send({ type: "INC" }); // => 1
actor.send({ type: "INC" }); // => 2

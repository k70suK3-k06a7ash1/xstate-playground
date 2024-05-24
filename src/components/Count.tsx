import { useActor } from "@xstate/react";
import { countLogic } from "../actors/countActorV2";

export const Count = () => {
  const [state, send] = useActor(countLogic);
  return (
    <>
      <h1>count is : {state.context}</h1>
      <button onClick={() => send({ type: "DEC" })}>DEC</button>
      <button onClick={() => send({ type: "INC" })}>INC</button>
    </>
  );
};

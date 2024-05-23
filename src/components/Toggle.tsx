import { useMachine } from "@xstate/react";
import { toggleMachine } from "../states/toggleMachine";
export const Toggle = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div>
      <h1>current state is : {state.value.toString()}</h1>
      <button onClick={() => send({ type: "toggle" })}>toggle action</button>
    </div>
  );
};

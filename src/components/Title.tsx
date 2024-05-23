import { titleMachine } from "../states/titleMachine";
import { useMachine } from "@xstate/react";

export const Title = () => {
  const [title, _send] = useMachine(titleMachine);
  return <h1>{title.context.value}</h1>;
};

import { textMachine } from "../states/textMachine";
import { useMachine } from "@xstate/react";
import { isEqual } from "lodash";

export const TextEditor = () => {
  const [textState, sendText] = useMachine(textMachine);

  return (
    <div>
      <h1>{textState.context.value}</h1>
      <h2>{textState.value.toString()}</h2>
      <button onClick={() => sendText({ type: "text.edit" })}>text edit</button>
      <button onClick={() => sendText({ type: "text.cancel", value: "Hello" })}>
        text reading
      </button>

      <input disabled={isEqual(textState.value.toString(), "reading")} />

      <button onClick={() => sendText({ type: "text.change", value: "Hello" })}>
        text change
      </button>
      <button onClick={() => sendText({ type: "text.commit" })}>
        text commit
      </button>
    </div>
  );
};
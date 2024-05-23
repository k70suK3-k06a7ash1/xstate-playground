import { useMachine } from "@xstate/react";
import { isEqual } from "lodash";
import { textMachineV2 } from "../states/textMachineV2";

export const TextEditor = () => {
  const [textState, sendText] = useMachine(textMachineV2);

  return (
    <div>
      <h1>{textState.context.value}</h1>
      <h2>{textState.value.toString()}</h2>
      <button onClick={() => sendText({ type: "text.edit" })}>text edit</button>
      <button onClick={() => sendText({ type: "text.cancel" })}>
        text reading
      </button>
      <button onClick={() => sendText({ type: "text.init" })}>text init</button>

      <input
        value={textState.context.value}
        disabled={isEqual(textState.value.toString(), "reading")}
        onChange={(e) =>
          sendText({ type: "text.change", value: e.currentTarget.value })
        }
      />
      <button onClick={() => sendText({ type: "text.double" })}>double</button>
      <button onClick={() => sendText({ type: "text.revert" })}>revert</button>

      <button onClick={() => sendText({ type: "text.commit" })}>
        text commit
      </button>
    </div>
  );
};

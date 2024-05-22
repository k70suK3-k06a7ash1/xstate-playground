import "./App.css";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "./states/sample";
import { TextEditor } from "./components/TextEditor";

function App() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <>
      <TextEditor />
      <div>
        <h1>current state is : {state.value.toString()}</h1>
        <button onClick={() => send({ type: "toggle" })}>toggle action</button>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import { Count } from "./components/Count";

import { TextEditor } from "./components/TextEditor";
import { Title } from "./components/Title";
import { Toggle } from "./components/Toggle";

function App() {
  return (
    <>
      <Title />
      <TextEditor />
      <Toggle />
      <Count />
    </>
  );
}

export default App;

import "./App.css";

import { TextEditor } from "./components/TextEditor";
import { Title } from "./components/Title";
import { Toggle } from "./components/Toggle";

function App() {
  return (
    <>
      <Title />
      <TextEditor />
      <Toggle />
    </>
  );
}

export default App;

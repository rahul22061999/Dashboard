import { useState } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModelForm from "./components/ModelForm";

function App() {
  const [isOpen, setisOpen] = useState(false);
  const [modelMode, setmodelMode] = useState("add");

  const handleOpen = (mode) => {
    setisOpen(true);
    setmodelMode(mode);
  };

  const handleSubmit = () => {
    if (modelMode === "add") {
      console.log("model mode add");
    } else {
      console.log("model mode Edit");
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <TableList handleOpen={handleOpen} />
      <ModelForm
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onSubmit={handleSubmit}
        mode={modelMode}
      />
    </>
  );
}

export default App;

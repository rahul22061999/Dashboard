import { useState } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModelForm from "./components/ModelForm";
import axios from "axios";

function App() {
  const [isOpen, setisOpen] = useState(false);
  const [modelMode, setmodelMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleOpen = (mode, client) => {
    setisOpen(true);
    setmodelMode(mode);
    setClientData(client || null); // ✅ important for edit mode
  };

  const handleSubmit = async (newClientData, mode) => {
    try {
      if (mode === "add") {
        await axios.post(
          "http://localhost:3000/api/clients/clients",
          newClientData
        );
      } else if (mode === "edit") {
        await axios.put(
          `http://localhost:3000/api/clients/clients/${clientData?.id}`,
          newClientData
        );
      } else if (mode === "delete") {
        await axios.delete(
          `http://localhost:3000/api/clients/clients/${clientData.id}`
        );
      }

      setRefreshTrigger((prev) => !prev); // ✅ trigger table refresh
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList
        handleOpen={handleOpen}
        searchTerm={searchTerm}
        refresh={refreshTrigger}
      />
      <ModelForm
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onSubmit={handleSubmit}
        mode={modelMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;

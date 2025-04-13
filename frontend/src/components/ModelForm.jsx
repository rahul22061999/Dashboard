import React, { useEffect, useState } from "react";

const ModelForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if ((mode === "edit" || mode === "delete") && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode, clientData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name,
      email,
      job,
      rate: Number(rate),
      isactive: status,
      id: clientData?.id, // optional, helpful for delete fallback
    };

    try {
      await onSubmit(dataToSend, mode);
      if (mode !== "delete") {
        setName("");
        setEmail("");
        setJob("");
        setRate("");
        setStatus(false);
      }
      onClose();
    } catch (error) {
      console.error("❌ Submission failed:", error.message);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg py-4">
          {mode === "edit"
            ? "Edit Client"
            : mode === "delete"
            ? "Delete Client"
            : "Add Client"}
        </h3>

        <form onSubmit={handleSubmit}>
          {mode !== "delete" ? (
            <>
              <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
                Name
                <input
                  type="text"
                  className="grow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
                Email
                <input
                  type="text"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
                Job
                <input
                  type="text"
                  className="grow"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </label>
              <div className="flex mb-4 justify-between">
                <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
                  Rate
                  <input
                    type="number"
                    className="grow"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </label>
                <select
                  value={status ? "Active" : "Inactive"}
                  onChange={(e) => setStatus(e.target.value === "Active")}
                  className="select select-bordered w-full max-w-xs mt-2"
                >
                  <option>Inactive</option>
                  <option>Active</option>
                </select>
              </div>
            </>
          ) : (
            <div className="text-red-500 text-center">
              Are you sure you want to delete{" "}
              <strong>{clientData?.name}</strong>?
            </div>
          )}

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn ${
                mode === "delete" ? "btn-error" : "btn-success"
              }`}
            >
              {mode === "delete"
                ? "Yes, Delete"
                : mode === "edit"
                ? "Save Changes"
                : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModelForm;

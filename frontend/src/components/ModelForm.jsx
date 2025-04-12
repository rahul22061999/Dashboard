import React, { useState } from "react";

const ModelForm = ({ isOpen, onClose, mode, onSubmit }) => {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(e.target.value === "Active");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit" : "Client Details"}
          </h3>
          <form onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
              Job
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <div className="flex mb-4 justify-between ">
              <label className="input input-bordered m-4 mt-2 flex items-center gap-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  placeholder="Rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <select
                value={status ? "Active" : "Inactive"}
                onChange={handleStatusChange}
                className="select select-bordered w-full max-w-xs mt-2"
              >
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <button className="btn btn-success">
              {mode === "edit" ? "save changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModelForm;

import React from "react";

const TableList = ({ handleOpen }) => {
  const clients = [
    {
      id: 1,
      name: "Rahul",
      email: "rahul.com",
      job: "wms",
      city: "las vegas",
      isActive: true,
    },
    {
      id: 2,
      name: "Priya",
      email: "priya.com",
      job: "frontend",
      city: "seattle",
      isActive: false,
    },
    {
      id: 3,
      name: "Alex",
      email: "alex.com",
      job: "backend",
      city: "nyc",
      isActive: true,
    },
  ];

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {Object.keys(clients[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody className="hover">
          {clients.map((client, index) => (
            <tr key={index}>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.city}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 
            ${
              client.isActive
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
                >
                  {client.isActive ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleOpen("edit")}
                  className="btn btn-neutral rounded-full"
                >
                  update
                </button>
              </td>
              <td>
                <button className="btn btn-secondary rounded-full">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;

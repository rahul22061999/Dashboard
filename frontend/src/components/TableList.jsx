import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Index } from "flexsearch";

const TableList = ({ handleOpen, searchTerm, refresh }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/clients/clients"
        );

        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [refresh]); // ✅ refetch when refresh changes

  // 2. Search using the index
  const searchIndex = useMemo(() => {
    const index = new Index({ tokenize: "forward" });

    tableData.forEach((client, i) => {
      const fullText = [
        client.id,
        client.name,
        client.email,
        client.job,
        client.rate,
        client.isactive ? "active" : "inactive",
      ].join(" ");
      index.add(i, fullText.toLowerCase());
    });

    return index;
  }, [tableData]);

  // ✅ Perform fast search
  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData;

    const resultIndexes = searchIndex.search(searchTerm.toLowerCase());
    return resultIndexes.map((i) => tableData[i]);
  }, [searchTerm, searchIndex, tableData]);

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* Head */}
        {filteredData.length > 0 && (
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
        )}

        <tbody className="hover">
          {filteredData.map((client, index) => (
            <tr key={index}>
              <th>{client.id}</th>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.job}</td>
              <td>{client.rate}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${
                    client.isactive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {client.isactive ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleOpen("edit", client)}
                  className="btn btn-neutral rounded-full"
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary rounded-full"
                  onClick={() => handleOpen("delete", client)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No matching clients found.
        </p>
      )}
    </div>
  );
};

export default TableList;

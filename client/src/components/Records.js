import React, { useEffect, useState } from "react";

function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    console.log("Records component mounted"); // Debug log
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/records");
        const data = await response.json();
        console.log("Fetched records:", data); // Debug log
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="records-container">
      <h1>Diagnosis Records</h1>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              <strong>{record.filename}</strong> - {record.result} -{" "}
              {new Date(record.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Records;

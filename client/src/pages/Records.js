// src/components/Records.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Records() {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!token) {
        setError("You must be signed in to view records.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/records", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        setRecords(data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [token]);

  if (loading) return <p>Loading records…</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="records-container">
      <h1>Diagnosis Records</h1>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              <strong>{record.filename}</strong> — {record.result} —{" "}
              {new Date(record.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

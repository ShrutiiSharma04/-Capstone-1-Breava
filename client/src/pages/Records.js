// src/pages/Records.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Records() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!isLoggedIn) {
        setError("You must be signed in to view records.");
        setLoading(false);
        return;
      }

      try {
        // axios.defaults.baseURL = http://localhost:5000
        // x-auth-token header is attached automatically by AuthContext
        const res = await axios.get("/api/records");
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [isLoggedIn]);

  if (loading) return <p>Loading records…</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="records-container">
      <h1>{user.name}’s Diagnosis Records</h1>

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

import React, { useEffect, useState } from "react";
import Leave_Management_Service from "../service/Leave_Management_Service";

function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Leave_Management_Service()
      .getHolidays()
      .then((response) => {
        console.log("Fetched holidays:", response.data); 
        setHolidays(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
        setError("Failed to fetch holidays");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading holidays...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Holiday List</h2>
      {holidays.length === 0 ? (
        <p>No holidays found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Holiday Details</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <td>{holiday.id}</td>
                <td>{holiday.date}</td>
                <td>{holiday.holidayDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HolidayList;

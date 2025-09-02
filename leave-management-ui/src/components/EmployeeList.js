import React, { useEffect, useState } from "react";
import Leave_Management_Service from "../service/Leave_Management_Service";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    
    Leave_Management_Service().getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch employees");
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Employees</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;

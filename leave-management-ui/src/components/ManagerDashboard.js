import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Leave_Management_Service from "../service/Leave_Management_Service";
import LeaveActions from "./LeaveActions";

function ManagerDashboard() {
  const location = useLocation();
  const user = location.state.user;

  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: "", holidayDetails: "" });

 
  const fetchLeaves = () => {
    Leave_Management_Service()
      .getManagerLeaves(user.empId)
      .then((res) => setLeaves(res.data))
      .catch(() => alert("Failed to fetch leave requests"));
  };

  const fetchEmployees = () => {
    Leave_Management_Service()
      .getEmployeesByManager(user.empId)
      .then((res) => setEmployees(res.data))
      .catch(() => alert("Failed to fetch employees"));
  };

  const fetchHolidays = () => {
    Leave_Management_Service()
      .getHolidays()
      .then((res) => setHolidays(res.data))
      .catch(() => alert("Failed to fetch holidays"));
  };

  const handleAddHoliday = () => {
    if (!newHoliday.date || !newHoliday.holidayDetails) {
      alert("Please fill both date and holiday details!");
      return;
    }

    Leave_Management_Service()
      .addHoliday(newHoliday, user.empId)
      .then(() => {
        alert("Holiday added successfully!");
        setNewHoliday({ date: "", holidayDetails: "" });
        fetchHolidays();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add holiday");
      });
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
    fetchHolidays();
  }, []);

  const styles = {
    container: { padding: "30px", fontFamily: "Arial, sans-serif" },
    header: { textAlign: "center", marginBottom: "30px" },
    card: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "20px",
      marginBottom: "30px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
    },
    th: {
      background: "#4facfe",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
    },
    button: {
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "transform 0.2s",
    },
    input: {
      padding: "8px",
      margin: "5px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        👔 Welcome, {user.username} (Manager) — ID: {user.empId}
      </h2>

    
      <div style={styles.card}>
        <h3>📜 Employee Leave Requests</h3>
        {leaves.length === 0 ? (
          <p>No leave requests yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Employee ID</th>
                <th style={styles.th}>From</th>
                <th style={styles.th}>To</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Remarks</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td style={styles.td}>{leave.id}</td>
                  <td style={styles.td}>{leave.employee.empId}</td>
                  <td style={styles.td}>{leave.fromDate}</td>
                  <td style={styles.td}>{leave.toDate}</td>
                  <td style={styles.td}>{leave.leaveType}</td>
                  <td style={styles.td}>{leave.leaveStatus}</td>
                  <td style={styles.td}>{leave.remarks}</td>
                  <td style={styles.td}>
                    <LeaveActions
                      leave={leave}
                      userRole={user.role}
                      onUpdate={fetchLeaves}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      <div style={styles.card}>
        <h3>👥 Your Employees</h3>
        {employees.length === 0 ? (
          <p>No employees found under you.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Job</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Manager ID</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.empId}>
                  <td style={styles.td}>{emp.empId}</td>
                  <td style={styles.td}>
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td style={styles.td}>{emp.job}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.mobile}</td>
                  <td style={styles.td}>{emp.manager?.empId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

     
      <div style={styles.card}>
        <h3>🎉 Upcoming Holidays</h3>
        {holidays.length === 0 ? (
          <p>No holidays yet.</p>
        ) : (
          <ul>
            {holidays.map((h) => (
              <li key={h.id}>
                <b>{h.date}</b> — {h.holidayDetails}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div style={styles.card}>
        <h3>➕ Add a Holiday</h3>
        <input
          type="date"
          style={styles.input}
          value={newHoliday.date}
          onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Holiday Details"
          style={styles.input}
          value={newHoliday.holidayDetails}
          onChange={(e) =>
            setNewHoliday({ ...newHoliday, holidayDetails: e.target.value })
          }
        />
        <button style={styles.button} onClick={handleAddHoliday}>
          Add Holiday
        </button>
      </div>
    </div>
  );
}

export default ManagerDashboard;

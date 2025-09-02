import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Leave_Management_Service from "../service/Leave_Management_Service";
import LeaveActions from "./LeaveActions";

function EmployeeDashboard() {
  const location = useLocation();
  const user = location.state.user;

  const [leaves, setLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [managerId, setManagerId] = useState("");

  const [newLeave, setNewLeave] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    remarks: "",
    employee: { empId: user.empId },
    manager: { empId: "" },
  });

  const fetchManagerId = () => {
    Leave_Management_Service()
      .getEmployeeById(user.empId)
      .then((res) => {
        const emp = res.data;
        if (emp.managerId) {
          setManagerId(emp.managerId);
          setNewLeave((prev) => ({
            ...prev,
            manager: { empId: emp.managerId },
          }));
        }
      })
      .catch(() => alert("Failed to fetch manager info"));
  };

  const fetchLeaves = () => {
    Leave_Management_Service()
      .viewLeaveHistory(user.empId)
      .then((res) => setLeaves(res.data))
      .catch(() => alert("Failed to fetch leave history"));
  };

  const fetchHolidays = () => {
    Leave_Management_Service()
      .getHolidays()
      .then((res) => setHolidays(res.data))
      .catch(() => alert("Failed to fetch holidays"));
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    Leave_Management_Service()
      .applyLeave(newLeave)
      .then(() => {
        alert("Leave applied successfully!");
        fetchLeaves();
        setNewLeave({ ...newLeave, fromDate: "", toDate: "", leaveType: "", remarks: "" });
      })
      .catch((err) =>
        alert(
          "Failed to apply leave: " + (err.response?.data?.message || "Unknown error")
        )
      );
  };

  useEffect(() => {
    fetchManagerId();
    fetchLeaves();
    fetchHolidays();
  }, []);

  const handleStatusChange = (leaveId, newStatus) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, leaveStatus: newStatus } : l))
    );
  };

  const getStatusBadge = (status) => {
    let color = "";
    switch (status) {
      case "APPLIED":
        color = "orange";
        break;
      case "APPROVED":
        color = "green";
        break;
      case "REJECTED":
        color = "red";
        break;
      case "WITHDRAWN":
      case "CANCELLED":
        color = "gray";
        break;
      default:
        color = "blue";
    }
    return (
      <span
        style={{
          backgroundColor: color,
          color: "white",
          padding: "4px 8px",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "12px",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div style={styles.container}>
     
      <div style={styles.welcomeCard}>
        <h2 style={{ margin: "0" }}>👋 Welcome, {user.username}</h2>
        <p style={{ margin: "5px 0", color: "#555" }}>Employee ID: {user.empId}</p>
      </div>

      
      <div style={styles.buttonGroup}>
        <button style={styles.actionButton}>📜 View Leave History</button>
        <button style={styles.actionButton}>📝 Apply Leave</button>
        <button style={styles.actionButton}>🎉 Upcoming Holidays</button>
      </div>

      <div style={styles.card}>
        <h3>📜 Your Leave History</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, i) => (
                <tr key={i}>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.leaveType}</td>
                  <td>{getStatusBadge(leave.leaveStatus)}</td>
                  <td>{leave.remarks}</td>
                  <td>
                    <LeaveActions
                      leave={leave}
                      userRole="EMPLOYEE"
                      onStatusChange={handleStatusChange}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No leave records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      <div style={styles.card}>
        <h3>🎉 Upcoming Holidays</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday Details</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length > 0 ? (
              holidays.map((holiday, i) => (
                <tr key={i}>
                  <td>{holiday.date}</td>
                  <td>{holiday.holidayDetails}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No upcoming holidays</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      <div style={styles.card}>
        <h3>📝 Apply for Leave</h3>
        <form onSubmit={handleApplyLeave} style={styles.form}>
          <label>From Date</label>
          <input
            type="date"
            value={newLeave.fromDate}
            onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
            required
            style={styles.input}
          />

          <label>To Date</label>
          <input
            type="date"
            value={newLeave.toDate}
            onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
            required
            style={styles.input}
          />

          <label>Leave Type</label>
          <select
            value={newLeave.leaveType}
            onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value })}
            required
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="SICK">Sick</option>
            <option value="CASUAL">Casual</option>
            <option value="EARNED">Earned</option>
          </select>

          <label>Remarks</label>
          <input
            type="text"
            value={newLeave.remarks}
            onChange={(e) => setNewLeave({ ...newLeave, remarks: e.target.value })}
            style={styles.input}
          />

          <button type="submit" style={styles.submitButton} disabled={!managerId}>
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  welcomeCard: {
    background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "25px",
  },
  actionButton: {
    background: "#2575fc",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    background: "#6a11cb",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default EmployeeDashboard;

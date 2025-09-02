import React from "react";
import Leave_Management_Service from "../service/Leave_Management_Service";

function LeaveActions({ leave, userRole, onStatusChange }) {
  const handleAction = (action) => {
    const managerId = leave.manager?.empId || "M001";
    const empId = leave.empId;

    if (action === "WITHDRAWN") {
      Leave_Management_Service()
        .withdrawLeave(leave.id, empId)
        .then(() => {
          alert("Leave withdrawn successfully");
          onStatusChange(leave.id, "WITHDRAWN");
        })
        .catch(() => alert("Failed to withdraw leave"));
    } else if (action === "CANCELLED") {
      Leave_Management_Service()
        .cancelLeave(leave.id, empId)
        .then(() => {
          alert("Leave cancelled successfully");
          onStatusChange(leave.id, "CANCELLED");
        })
        .catch(() => alert("Failed to cancel leave"));
    } else if (action === "APPROVED") {
      const remarks = prompt("Enter remarks for approval (optional):") || "";
      Leave_Management_Service()
        .approveLeave(leave.id, managerId, remarks)
        .then(() => {
          alert("Leave approved successfully");
          onStatusChange(leave.id, "APPROVED");
        })
        .catch(() => alert("Failed to approve leave"));
    } else if (action === "REJECTED") {
      const remarks = prompt("Enter reason for rejection:");
      if (!remarks) return alert("Remarks are required!");
      Leave_Management_Service()
        .rejectLeave(leave.id, managerId, remarks)
        .then(() => {
          alert("Leave rejected successfully");
          onStatusChange(leave.id, "REJECTED");
        })
        .catch(() => alert("Failed to reject leave"));
    }
  };

  return (
    <div>
      {userRole === "EMPLOYEE" && leave.leaveStatus === "APPLIED" && (
        <button onClick={() => handleAction("WITHDRAWN")}>Withdraw</button>
      )}
      {userRole === "EMPLOYEE" && leave.leaveStatus === "APPROVED" && (
        <button onClick={() => handleAction("CANCELLED")}>Cancel</button>
      )}
      {userRole === "MANAGER" && leave.leaveStatus === "APPLIED" && (
        <>
          <button onClick={() => handleAction("APPROVED")}>Approve</button>
          <button onClick={() => handleAction("REJECTED")}>Reject</button>
        </>
      )}
    </div>
  );
}

export default LeaveActions;
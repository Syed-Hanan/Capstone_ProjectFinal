package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.LeaveRequest;
import java.util.List;

public interface LeaveRequestService {
    LeaveRequest applyLeave(LeaveRequest request);                     
    List<LeaveRequest> getLeaveHistory(String empId);                  
    LeaveRequest approveLeave(Long leaveId, String managerId, String remarks); 
    LeaveRequest rejectLeave(Long leaveId, String managerId, String remarks);  
    LeaveRequest withdrawLeave(Long leaveId, String empId);            
    LeaveRequest cancelLeave(Long leaveId, String empId);              
    List<LeaveRequest> getLeavesByManager(String managerId);           
}
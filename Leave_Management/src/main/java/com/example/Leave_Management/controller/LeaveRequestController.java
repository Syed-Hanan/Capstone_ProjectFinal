package com.example.Leave_Management.controller;

import com.example.Leave_Management.entity.LeaveRequest;
import com.example.Leave_Management.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leaves")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/apply")
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.applyLeave(leaveRequest);
    }

    @GetMapping("/history/{empId}")
    public List<LeaveRequest> getLeaveHistory(@PathVariable String empId) {
        return leaveRequestService.getLeaveHistory(empId);
    }

    @PutMapping("/withdraw/{leaveId}")
    public LeaveRequest withdrawLeave(@PathVariable Long leaveId, @RequestParam String empId) {
        return leaveRequestService.withdrawLeave(leaveId, empId);
    }

    @PutMapping("/cancel/{leaveId}")
    public LeaveRequest cancelLeave(@PathVariable Long leaveId, @RequestParam String empId) {
        return leaveRequestService.cancelLeave(leaveId, empId);
    }

    @PutMapping("/approve/{leaveId}")
    public LeaveRequest approveLeave(@PathVariable Long leaveId, @RequestParam String managerId, @RequestParam String remarks) {
        return leaveRequestService.approveLeave(leaveId, managerId, remarks);
    }

    @PutMapping("/reject/{leaveId}")
    public LeaveRequest rejectLeave(@PathVariable Long leaveId, @RequestParam String managerId, @RequestParam String remarks) {
        return leaveRequestService.rejectLeave(leaveId, managerId, remarks);
    }

    
    @GetMapping("/manager/{managerId}")
    public List<LeaveRequest> getManagerEmployeeLeaves(@PathVariable String managerId) {
        return leaveRequestService.getLeavesByManager(managerId);
    }
}
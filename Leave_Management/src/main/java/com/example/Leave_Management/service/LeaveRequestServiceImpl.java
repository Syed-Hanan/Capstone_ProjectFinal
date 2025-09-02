package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.Employee;
import com.example.Leave_Management.entity.LeaveRequest;
import com.example.Leave_Management.repo.EmployeeRepository;
import com.example.Leave_Management.repo.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public LeaveRequest applyLeave(LeaveRequest request) {
        
        Employee emp = employeeRepository.findById(request.getEmployee().getEmpId())
                .orElseThrow(() -> new RuntimeException("Employee not found: " + request.getEmployee().getEmpId()));

        Employee mgr = employeeRepository.findById(request.getManager().getEmpId())
                .orElseThrow(() -> new RuntimeException("Manager not found: " + request.getManager().getEmpId()));

        
        request.setEmployee(emp);
        request.setManager(mgr);

        long days = ChronoUnit.DAYS.between(request.getFromDate(), request.getToDate()) + 1;
        request.setNumberOfDays((int) days);
        request.setDateApplied(LocalDate.now());
        request.setLeaveStatus("APPLIED");

        return leaveRequestRepository.save(request);
    }

    @Override
    public List<LeaveRequest> getLeaveHistory(String empId) {
        return leaveRequestRepository.findByEmployee_EmpId(empId);
    }

    @Override
    public LeaveRequest approveLeave(Long leaveId, String managerId, String remarks) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId).orElse(null);
        if (req != null && req.getManager().getEmpId().equals(managerId)) {
            req.setLeaveStatus("APPROVED");
            req.setRemarks(remarks);
            return leaveRequestRepository.save(req);
        }
        return null;
    }

    @Override
    public LeaveRequest rejectLeave(Long leaveId, String managerId, String remarks) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId).orElse(null);
        if (req != null && req.getManager().getEmpId().equals(managerId)) {
            req.setLeaveStatus("REJECTED");
            req.setRemarks(remarks);
            return leaveRequestRepository.save(req);
        }
        return null;
    }

    @Override
    public LeaveRequest withdrawLeave(Long leaveId, String empId) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId).orElse(null);
        if (req != null && req.getEmployee().getEmpId().equals(empId) && req.getLeaveStatus().equals("APPLIED")) {
            req.setLeaveStatus("WITHDRAWN");
            return leaveRequestRepository.save(req);
        }
        return null;
    }

    @Override
    public LeaveRequest cancelLeave(Long leaveId, String empId) {
        LeaveRequest req = leaveRequestRepository.findById(leaveId).orElse(null);
        if (req != null && req.getEmployee().getEmpId().equals(empId) && req.getLeaveStatus().equals("APPROVED")) {
            req.setLeaveStatus("CANCELLED");
            return leaveRequestRepository.save(req);
        }
        return null;
    }

    @Override
    public List<LeaveRequest> getLeavesByManager(String managerId) {
        return leaveRequestRepository.findByManager_EmpId(managerId);
    }
}
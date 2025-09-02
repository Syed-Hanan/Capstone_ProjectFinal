package com.example.Leave_Management.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Leave_Management.entity.LeaveRequest;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long>{
	
	 
	List<LeaveRequest> findByEmployee_EmpId(String empId);

    
    List<LeaveRequest> findByManager_EmpId(String managerId);

	

	

}
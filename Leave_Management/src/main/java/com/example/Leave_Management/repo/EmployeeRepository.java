package com.example.Leave_Management.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Leave_Management.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

   
    Employee findByEmail(String email);

   
    List<Employee> findByManager_EmpId(String managerEmpId);
}

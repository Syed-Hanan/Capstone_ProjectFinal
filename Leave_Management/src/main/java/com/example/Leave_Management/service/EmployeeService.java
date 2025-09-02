package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.Employee;
import java.util.List;

public interface EmployeeService {
    Employee getEmployeeByEmail(String email);           
    List<Employee> getAllEmployees();                   
    List<Employee> getEmployeesByManager(String managerEmpId); 
    Employee getEmployeeById(String empId);             
    Employee addEmployee(Employee employee);            
}

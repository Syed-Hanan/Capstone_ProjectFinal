package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.Employee;
import com.example.Leave_Management.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public List<Employee> getEmployeesByManager(String managerEmpId) {
        return employeeRepository.findByManager_EmpId(managerEmpId);
    }

    @Override
    public Employee getEmployeeById(String empId) {
        return employeeRepository.findById(empId).orElse(null);
    }
}

package com.example.Leave_Management.controller;

import com.example.Leave_Management.entity.Employee;
import com.example.Leave_Management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    
    @PostMapping("/add")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    // Get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    
    @GetMapping("/{empId}")
    public Employee getEmployeeById(@PathVariable String empId) {
        return employeeService.getEmployeeById(empId);
    }

    
    @GetMapping("/manager/{managerEmpId}")
    public List<Employee> getEmployeesByManager(@PathVariable String managerEmpId) {
        return employeeService.getEmployeesByManager(managerEmpId);
    }
}

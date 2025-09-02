package com.example.Leave_Management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Login {
    @Id
    @Column(length = 30)
    private String username;

    @Column(length = 30)
    private String password;

    @Column(length = 10)
    private String role;

    @Column(length = 10)
    private String empId; 

    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmpId() { return empId; }
    public void setEmpId(String empId) { this.empId = empId; }
}
package com.example.Leave_Management.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "EMPID")
    private String empId;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "JOB")
    private String job;

    @Column(name = "MOBILE")
    private String mobile;

    @Column(name = "EMAIL")
    private String email;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MANAGER_ID")
    @JsonBackReference 
    private Employee manager;

    
    public Employee() {}

    
    public Employee(String empId, String firstName, String lastName, String job,
                    String mobile, String email, Employee manager) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.mobile = mobile;
        this.email = email;
        this.manager = manager;
    }

    
    public String getEmpId() { return empId; }
    public void setEmpId(String empId) { this.empId = empId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getJob() { return job; }
    public void setJob(String job) { this.job = job; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Employee getManager() { return manager; }
    public void setManager(Employee manager) { this.manager = manager; }

    
    @JsonProperty("managerId")
    public String getManagerId() {
        return manager != null ? manager.getEmpId() : null;
    }
}
package com.example.Leave_Management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Leave_Management.entity.Login;
import com.example.Leave_Management.service.LoginService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Login user) {
        loginService.addUser(user);
        return new ResponseEntity<>("User created successfully!", HttpStatus.OK);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> loginValidate(@RequestBody Login user) {
        try {
           
            Login u = loginService.userValidation(user);

            
            Map<String, Object> response = new HashMap<>();
            response.put("username", u.getUsername());
            response.put("role", u.getRole());
            response.put("empId", u.getEmpId());   
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("Session invalidated", HttpStatus.OK);
    }
}
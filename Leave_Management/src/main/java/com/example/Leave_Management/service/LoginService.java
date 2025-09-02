package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.Login;

public interface LoginService {
    void addUser(Login user);
    Login userValidation(Login user); 
}
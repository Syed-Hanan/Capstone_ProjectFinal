package com.example.Leave_Management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Leave_Management.entity.Login;
import com.example.Leave_Management.repo.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository loginRepo;

    @Override
    public void addUser(Login user) {
        loginRepo.save(user);
    }

    @Override
    public Login userValidation(Login user) {
        Login u = loginRepo.findByUsername(user.getUsername());
        if (u != null && u.getPassword().equals(user.getPassword())) {
            return u;
        }
        throw new RuntimeException("Invalid username or password");
    }
}
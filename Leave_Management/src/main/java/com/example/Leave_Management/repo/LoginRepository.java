package com.example.Leave_Management.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Leave_Management.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
    Login findByUsername(String username);
}
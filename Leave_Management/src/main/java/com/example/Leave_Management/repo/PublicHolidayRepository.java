package com.example.Leave_Management.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Leave_Management.entity.PublicHoliday;

public interface PublicHolidayRepository extends JpaRepository<PublicHoliday, Long> {
}
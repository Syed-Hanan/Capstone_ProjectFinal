package com.example.Leave_Management.service;

import com.example.Leave_Management.entity.PublicHoliday;
import com.example.Leave_Management.repo.PublicHolidayRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicHolidayService {

    private final PublicHolidayRepository holidayRepository;

    public PublicHolidayService(PublicHolidayRepository holidayRepository) {
        this.holidayRepository = holidayRepository;
    }

    public List<PublicHoliday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public PublicHoliday addHoliday(PublicHoliday holiday) {
        return holidayRepository.save(holiday);
    }
}
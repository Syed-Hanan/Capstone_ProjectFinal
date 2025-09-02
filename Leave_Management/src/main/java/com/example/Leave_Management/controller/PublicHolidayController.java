package com.example.Leave_Management.controller;

import com.example.Leave_Management.entity.PublicHoliday;
import com.example.Leave_Management.service.PublicHolidayService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/holidays")
@CrossOrigin(origins = "http://localhost:3000") 
public class PublicHolidayController {

    private final PublicHolidayService holidayService;

    public PublicHolidayController(PublicHolidayService holidayService) {
        this.holidayService = holidayService;
    }

    @GetMapping
    public List<PublicHoliday> getAllHolidays() {
        return holidayService.getAllHolidays();
    }

    @PostMapping
    public PublicHoliday addHoliday(@RequestBody PublicHoliday holiday) {
        return holidayService.addHoliday(holiday);
    }
}
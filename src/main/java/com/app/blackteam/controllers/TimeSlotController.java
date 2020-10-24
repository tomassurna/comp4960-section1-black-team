package com.app.blackteam.controllers;

import com.app.blackteam.entities.TimeSlot;
import com.app.blackteam.repositories.TimeSlotRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping(path = "/TimeSlot")
@Controller
public class TimeSlotController {

    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotController(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    @ResponseBody
    @GetMapping(path = "/all")
    public List<TimeSlot> getAllTimeSlots() {
        return StreamSupport.stream(timeSlotRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @ResponseBody
    @GetMapping(path = "/{id}")
    public Optional<TimeSlot> getTimeSlotById(@PathVariable UUID id) {
        return timeSlotRepository.findById(id);
    }

    @ResponseBody
    @PostMapping(path = "/addTimeSlot")
    public void addTimeSlot(@RequestBody TimeSlot timeSlot) {
        // We don't save the object directly because we want JDBC to generate the Id value
        timeSlotRepository.save(new TimeSlot(timeSlot.getStartTime(), timeSlot.getEndTime()));
    }

    @ResponseBody
    @PostMapping(path = "/updateTimeSlot")
    public void updateTimeSlot(@RequestBody TimeSlot timeSlot) {
        timeSlot.setIsNew(false);

        timeSlotRepository.save(timeSlot);
    }

    @ResponseBody
    @PostMapping(path = "/deleteTimeSlot")
    public void deleteTimeSlot(@RequestBody UUID id) {
        timeSlotRepository.deleteById(id);
    }
}

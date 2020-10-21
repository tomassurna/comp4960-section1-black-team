package com.app.blackteam.controllers;

import com.app.blackteam.entities.TimeSlot;
import com.app.blackteam.repositories.TimeSlotRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
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
  @GetMapping
  public Optional<TimeSlot> getAllTeamMates(@RequestBody UUID id) {
    return timeSlotRepository.findById(id);
  }

  @ResponseBody
  @PostMapping(path = "/addTimeSlot")
  public void addTimeSlot(@RequestBody Time startTime, @RequestBody Time endTime) {
    timeSlotRepository.save(new TimeSlot(startTime, endTime));
  }

  @ResponseBody
  @PostMapping(path = "/updateTimeSlot")
  public void updateTimeSlot(@RequestBody Time startTime, @RequestBody Time endTime) {
    TimeSlot timeSlot = new TimeSlot(startTime, endTime);

    timeSlot.setIsNew(false);

    timeSlotRepository.save(timeSlot);
  }

  @ResponseBody
  @PostMapping(path = "/deleteTimeSlot")
  public void deleteTimeSlot(@RequestBody UUID id) {
    timeSlotRepository.deleteById(id);
  }
}

package com.app.blackteam.controllers;

import com.app.blackteam.entities.Speaker;
import com.app.blackteam.repositories.SpeakerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping(path = "/Speaker")
@Controller
public class SpeakerController {

  private final SpeakerRepository speakerRepository;

  public SpeakerController(SpeakerRepository SpeakerRepository) {
    this.speakerRepository = SpeakerRepository;
  }

  @ResponseBody
  @GetMapping(path = "/all")
  public List<Speaker> getAllSpeakers() {
    return StreamSupport.stream(speakerRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @ResponseBody
  @GetMapping
  public Optional<Speaker> getAllTeamMates(@RequestBody UUID id) {
    return speakerRepository.findById(id);
  }

  @ResponseBody
  @PostMapping(path = "/addSpeaker")
  public void addSpeaker(
      @RequestBody String speakerName,
      @RequestBody String speakerEmail,
      @RequestBody(required = false) String everyDayNumber,
      @RequestBody(required = false) String dayOfNumber) {
    speakerRepository.save(
        new Speaker(speakerName, speakerEmail)
            .setEverydayNumber(everyDayNumber)
            .setDayOfNumber(dayOfNumber));
  }

  @ResponseBody
  @PostMapping(path = "/updateSpeaker")
  public void updateSpeaker(
      @RequestBody String speakerName,
      @RequestBody String speakerEmail,
      @RequestBody(required = false) String everyDayNumber,
      @RequestBody(required = false) String dayOfNumber) {
    Speaker speaker =
        new Speaker(speakerName, speakerEmail)
            .setEverydayNumber(everyDayNumber)
            .setDayOfNumber(dayOfNumber);

    speaker.setIsNew(false);

    speakerRepository.save(speaker);
  }

  @ResponseBody
  @PostMapping(path = "/deleteSpeaker")
  public void deleteSpeaker(@RequestBody UUID id) {
    speakerRepository.deleteById(id);
  }
}

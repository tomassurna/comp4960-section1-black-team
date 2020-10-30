package com.app.blackteam.controllers;

import com.app.blackteam.entities.Speaker;
import com.app.blackteam.repositories.SpeakerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
    @GetMapping(path = "/{id}")
    public Optional<Speaker> getSpeakerById(@PathVariable UUID id) {
        return speakerRepository.findById(id);
    }

    @ResponseBody
    @RequestMapping(path = "/addSpeaker", method = RequestMethod.POST)
    public Speaker addSpeaker(@RequestBody Speaker speaker) {
        return speakerRepository.save(speaker);
    }

    @ResponseBody
    @PostMapping(path = "/updateSpeaker")
    public Speaker updateSpeaker(@RequestBody Speaker speaker) {
        return speakerRepository.save(speaker);
    }

    @ResponseBody
    @PostMapping(path = "/deleteSpeaker")
    public void deleteSpeaker(@RequestBody Collection<UUID> ids) {
        ids.forEach(speakerRepository::deleteById);
    }
}

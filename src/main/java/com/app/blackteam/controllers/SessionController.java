package com.app.blackteam.controllers;

import com.app.blackteam.entities.Session;
import com.app.blackteam.repositories.SessionRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping(path = "/Session")
@Controller
public class SessionController {

    private final SessionRepository sessionRepository;

    public SessionController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @ResponseBody
    @GetMapping(path = "/all")
    public List<Session> getAllSessions() {
        return StreamSupport.stream(sessionRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @ResponseBody
    @GetMapping(path = "/{id}")
    public Optional<Session> getSessionById(@PathVariable UUID id) {
        return sessionRepository.findById(id);
    }

    @ResponseBody
    @PostMapping(path = "/addSession")
    public Session addSession(@RequestBody Session session) {
        // We don't save the object directly because we want JDBC to generate the Id value
        return sessionRepository.save(
                new Session(session.getSessionTitle())
                        .setRoom(session.getRoom())
                        .setSpeaker(session.getSpeaker())
                        .setTimeSlot(session.getTimeSlot()));
    }

    @ResponseBody
    @PostMapping(path = "/updateSession")
    public Session updateSession(@RequestBody Session session) {
        session.setIsNew(false);

        return sessionRepository.save(session);
    }

    @ResponseBody
    @PostMapping(path = "/deleteSession")
    public void deleteSession(@RequestBody UUID id) {
        sessionRepository.deleteById(id);
    }
}

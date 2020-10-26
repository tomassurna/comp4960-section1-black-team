package com.app.blackteam.controllers;

import com.app.blackteam.entities.Session;
import com.app.blackteam.repositories.SessionRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
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
        session.setIsNew(true);
        return sessionRepository.save(session);
    }

    @ResponseBody
    @PostMapping(path = "/updateSession")
    public Session updateSession(@RequestBody Session session) {
        return sessionRepository.save(session);
    }

    @ResponseBody
    @PostMapping(path = "/deleteSession")
    public void deleteSession(@RequestBody Collection<UUID> ids) {
        ids.forEach(sessionRepository::deleteById);
    }
}

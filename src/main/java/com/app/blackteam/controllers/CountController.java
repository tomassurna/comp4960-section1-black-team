package com.app.blackteam.controllers;

import com.app.blackteam.entities.Count;
import com.app.blackteam.repositories.CountRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping(path = "/Count")
@Controller
public class CountController {

    private final CountRepository countRepository;

    public CountController(CountRepository countRepository) {
        this.countRepository = countRepository;
    }

    @ResponseBody
    @GetMapping(path = "/all")
    public List<Count> getAllCounts() {
        return StreamSupport.stream(countRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @ResponseBody
    @GetMapping(path = "/{id}")
    public Optional<Count> getCountById(@PathVariable UUID id) {
        return countRepository.findById(id);
    }

    @ResponseBody
    @PostMapping(path = "/saveCount")
    public Count saveCount(@RequestBody Count count) {
        return countRepository.save(count);
    }

    @ResponseBody
    @PostMapping(path = "/deleteCount")
    public void deleteCount(@RequestBody Collection<UUID> ids) {
        ids.forEach(countRepository::deleteById);
    }
}

package com.app.blackteam.controllers;

import com.app.blackteam.entities.DayOfPassword;
import com.app.blackteam.repositories.DayOfPasswordRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.stream.StreamSupport;

@RequestMapping(path = "/DayOfPassword")
@Controller
public class DayOfPasswordController {

    private final DayOfPasswordRepository dayOfPasswordRepository;

    public DayOfPasswordController(DayOfPasswordRepository dayOfPasswordRepository) {
        this.dayOfPasswordRepository = dayOfPasswordRepository;
    }

    @ResponseBody
    @GetMapping(path = "/authenticate")
    public boolean authenticate(@RequestBody String password) {
        return StreamSupport.stream(dayOfPasswordRepository.findAll().spliterator(), false)
                .anyMatch(dayOfPassword -> dayOfPassword.getPassword().equals(password));
    }

    @ResponseBody
    @PostMapping(path = "/savePassword")
    public void saveRoom(@RequestBody String dayOfPassword) {
        dayOfPasswordRepository.deleteAll();
        dayOfPasswordRepository.save(new DayOfPassword(dayOfPassword));
    }

}

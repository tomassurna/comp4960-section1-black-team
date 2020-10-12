package com.app.blackteam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class MainController {

  private final TeammateRepository teammateRepository;

  public MainController(TeammateRepository teammateRepository) {
    this.teammateRepository = teammateRepository;
  }

  @GetMapping(path = "/all")
  public @ResponseBody List<Teammate> getAllTeamMates() {
    return StreamSupport.stream(teammateRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @PostMapping(path = "/addTeammate")
  public @ResponseBody void addTeamMate(@RequestBody String name) {
    teammateRepository.save(new Teammate().setName(name));
  }
}

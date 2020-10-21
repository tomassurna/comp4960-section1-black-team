package com.app.blackteam.controllers;

import com.app.blackteam.entities.Room;
import com.app.blackteam.repositories.RoomRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RequestMapping(path = "/Room")
@Controller
public class RoomController {

  private final RoomRepository roomRepository;

  public RoomController(RoomRepository roomRepository) {
    this.roomRepository = roomRepository;
  }

  @ResponseBody
  @GetMapping(path = "/all")
  public List<Room> getAllRooms() {
    return StreamSupport.stream(roomRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @ResponseBody
  @GetMapping
  public Optional<Room> getAllTeamMates(@RequestBody UUID id) {
    return roomRepository.findById(id);
  }

  @ResponseBody
  @PostMapping(path = "/addRoom")
  public void addRoom(@RequestBody String name, @RequestBody int capacity) {
    roomRepository.save(new Room(name, capacity));
  }

  @ResponseBody
  @PostMapping(path = "/updateRoom")
  public void updateRoom(@RequestBody String name, @RequestBody int capacity) {
    Room room = new Room(name, capacity);

    room.setIsNew(false);

    roomRepository.save(room);
  }

  @ResponseBody
  @PostMapping(path = "/deleteRoom")
  public void deleteRoom(@RequestBody UUID id) {
    roomRepository.deleteById(id);
  }
}

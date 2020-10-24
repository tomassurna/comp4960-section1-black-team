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
    @GetMapping(path = "/{id}")
    public Optional<Room> getRoomById(@PathVariable UUID id) {
        return roomRepository.findById(id);
    }

    @ResponseBody
    @PostMapping(path = "/addRoom")
    public Room addRoom(@RequestBody Room room) {
        // We don't save the object directly because we want JDBC to generate the Id value
        return roomRepository.save(new Room(room.getName(), room.getCapacity()));
    }

    @ResponseBody
    @PostMapping(path = "/updateRoom")
    public Room updateRoom(@RequestBody Room room) {
        room.setIsNew(false);

        return roomRepository.save(room);
    }

    @ResponseBody
    @PostMapping(path = "/deleteRoom")
    public void deleteRoom(@RequestBody UUID id) {
        roomRepository.deleteById(id);
    }
}

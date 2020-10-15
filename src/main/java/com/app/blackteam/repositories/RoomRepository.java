package com.app.blackteam.repositories;

import com.app.blackteam.entities.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface RoomRepository extends CrudRepository<Room, UUID> {
}

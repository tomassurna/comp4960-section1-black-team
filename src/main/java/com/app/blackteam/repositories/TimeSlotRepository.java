package com.app.blackteam.repositories;

import com.app.blackteam.entities.TimeSlot;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TimeSlotRepository extends CrudRepository<TimeSlot, UUID> {
}

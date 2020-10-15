package com.app.blackteam.repositories;

import com.app.blackteam.entities.Speaker;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SpeakerRepository extends CrudRepository<Speaker, UUID> {
}

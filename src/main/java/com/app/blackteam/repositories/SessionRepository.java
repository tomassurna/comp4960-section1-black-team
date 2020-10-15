package com.app.blackteam.repositories;

import com.app.blackteam.entities.Session;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SessionRepository extends CrudRepository<Session, UUID> {
}

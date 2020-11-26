package com.app.blackteam.repositories;

import com.app.blackteam.entities.Count;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CountRepository extends CrudRepository<Count, UUID> {
}

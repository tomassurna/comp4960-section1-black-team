package com.app.blackteam;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TeammateRepository extends CrudRepository<Teammate, UUID> {
}

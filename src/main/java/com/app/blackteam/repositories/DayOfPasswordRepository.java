package com.app.blackteam.repositories;

import com.app.blackteam.entities.DayOfPassword;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface DayOfPasswordRepository extends CrudRepository<DayOfPassword, UUID> {
}

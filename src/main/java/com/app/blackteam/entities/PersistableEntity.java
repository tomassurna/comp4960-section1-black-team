package com.app.blackteam.entities;

import org.springframework.data.domain.Persistable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class PersistableEntity implements Persistable<UUID> {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  private boolean isNew;

  public PersistableEntity() {
    isNew = true;
  }

  @Override
  public UUID getId() {
    return id;
  }

  @Override
  public boolean isNew() {
    return isNew;
  }

  public void setIsNew(boolean isNew) {
    this.isNew = isNew;
  }
}

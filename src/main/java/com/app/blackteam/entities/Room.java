package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Room extends PersistableEntity{
    private String name;

    private int capacity;

    public Room() {
    }

    public Room(String name, int capacity) {
        this.name = name;
        this.capacity = capacity;
    }

    public String getName() {
        return name;
    }

    public Room setName(String name) {
        this.name = name;
        return this;
    }

    public int getCapacity() {
        return capacity;
    }

    public Room setCapacity(int capacity) {
        this.capacity = capacity;
        return this;
    }

}

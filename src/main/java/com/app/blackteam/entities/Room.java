package com.app.blackteam.entities;

import javax.persistence.Entity;

@Entity
public class Room extends PersistableEntity {
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

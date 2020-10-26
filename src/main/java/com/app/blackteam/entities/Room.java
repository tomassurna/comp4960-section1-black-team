package com.app.blackteam.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Room extends PersistableEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
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

package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Room {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)

    private UUID roomID;
    private String name;
    private int capacity;

    public Room(UUID roomID, String name, int capacity){
        this.roomID = roomID;
        updateRoom(name, capacity);
    }

    public Room(UUID roomID){
        this.roomID = roomID;
        updateRoom("tempName", 10);
    }

    public UUID getRoomId() {
        return this.roomID;
    }

    public int getCapacity(){
        return this.capacity;
    }

    public String getName() {
        return this.name;
    }

    private void deleteRoom(UUID roomID){

    }

    private void updateRoom(String name, int capacity){
        this.name = name;
        this.capacity = capacity;
    }

    private Room getRoom(UUID roomID){
        return this;
    }
}

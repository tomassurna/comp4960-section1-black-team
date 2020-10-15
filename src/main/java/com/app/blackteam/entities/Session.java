package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID sessionID;

    private String sessionTitle;

    private UUID timeSlotID;

    private UUID speakerID;

    private UUID roomID;

    private UUID countID;

    public Session() {
    }

    public Session(String sessionTitle) {
        this.sessionTitle = sessionTitle;
    }

    public UUID getSessionID() {
        return sessionID;
    }

    public String getSessionTitle() {
        return sessionTitle;
    }

    public void setSessionTitle(String sessionTitle) {
        this.sessionTitle = sessionTitle;
    }

    public UUID getTimeSlotID() {
        return timeSlotID;
    }

    public void setTimeSlotID(UUID timeSlotID) {
        this.timeSlotID = timeSlotID;
    }

    public UUID getSpeakerID() {
        return speakerID;
    }

    public void setSpeakerID(UUID speakerID) {
        this.speakerID = speakerID;
    }

    public UUID getRoomID() {
        return roomID;
    }

    public void setRoomID(UUID roomID) {
        this.roomID = roomID;
    }

    public UUID getCountID() {
        return countID;
    }

    public void setCountID(UUID countID) {
        this.countID = countID;
    }
}

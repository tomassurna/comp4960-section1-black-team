package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Session extends PersistableEntity{
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

    public String getSessionTitle() {
        return sessionTitle;
    }

    public Session setSessionTitle(String sessionTitle) {
        this.sessionTitle = sessionTitle;
        return this;
    }

    public UUID getTimeSlotID() {
        return timeSlotID;
    }

    public Session setTimeSlotID(UUID timeSlotID) {
        this.timeSlotID = timeSlotID;
        return this;
    }

    public UUID getSpeakerID() {
        return speakerID;
    }

    public Session setSpeakerID(UUID speakerID) {
        this.speakerID = speakerID;
        return this;
    }

    public UUID getRoomID() {
        return roomID;
    }

    public Session setRoomID(UUID roomID) {
        this.roomID = roomID;
        return this;
    }

    public UUID getCountID() {
        return countID;
    }

    public Session setCountID(UUID countID) {
        this.countID = countID;
        return this;
    }
}

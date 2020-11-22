package com.app.blackteam.entities;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
public class Session extends PersistableEntity {
    @Column(nullable = false)
    private String sessionTitle;

    @OneToOne
    @NotFound(action= NotFoundAction.IGNORE)
    private TimeSlot timeSlot;

    @OneToOne
    @NotFound(action= NotFoundAction.IGNORE)
    private Speaker speaker;

    @OneToOne
    @NotFound(action= NotFoundAction.IGNORE)
    private Room room;

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

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    public Session setTimeSlot(TimeSlot timeSlot) {
        this.timeSlot = timeSlot;
        return this;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public Session setSpeaker(Speaker speaker) {
        this.speaker = speaker;
        return this;
    }

    public Room getRoom() {
        return room;
    }

    public Session setRoom(Room room) {
        this.room = room;
        return this;
    }
}

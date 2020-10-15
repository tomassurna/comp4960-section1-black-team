package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Speaker {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID speakerID;

    private String speakerName;

    private String email;

    private String everydayNumber;

    private String dayOfNumber;

    public Speaker() {
    }

    public Speaker(String speakerName, String email) {
        this.speakerName = speakerName;
        this.email = email;
    }

    public UUID getSpeakerID() {
        return speakerID;
    }

    public String getSpeakerName() {
        return speakerName;
    }

    public void setSpeakerName(String speakerName) {
        this.speakerName = speakerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEverydayNumber() {
        return everydayNumber;
    }

    public void setEverydayNumber(String everydayNumber) {
        this.everydayNumber = everydayNumber;
    }

    public String getDayOfNumber() {
        return dayOfNumber;
    }

    public void setDayOfNumber(String dayOfNumber) {
        this.dayOfNumber = dayOfNumber;
    }
}

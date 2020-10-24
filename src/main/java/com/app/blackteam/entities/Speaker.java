package com.app.blackteam.entities;

import javax.persistence.Entity;

@Entity
public class Speaker extends PersistableEntity {
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

    public String getSpeakerName() {
        return speakerName;
    }

    public Speaker setSpeakerName(String speakerName) {
        this.speakerName = speakerName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Speaker setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getEverydayNumber() {
        return everydayNumber;
    }

    public Speaker setEverydayNumber(String everydayNumber) {
        this.everydayNumber = everydayNumber;
        return this;
    }

    public String getDayOfNumber() {
        return dayOfNumber;
    }

    public Speaker setDayOfNumber(String dayOfNumber) {
        this.dayOfNumber = dayOfNumber;
        return this;
    }
}

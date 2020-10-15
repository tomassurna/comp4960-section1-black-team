package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Speaker {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID speakerID;
    private String speakerName;
    private String email;
    private String everydayNumber;
    private String dayOfNumber;

    public Speaker(String speakerName, String email){
        this.speakerName = speakerName;
        this.email = email;
    }

    public void deleteSpeaker(UUID speakerID){

    }

    public void updateSpeaker(UUID speakerID, String newName, String newEmail){
        this.speakerID = speakerID;
        this.speakerName = newName;
        this.email = newEmail;
    }

    public UUID getSpeakerID(){
        return this.speakerID;
    }

    private Speaker getSpeaker(){
        return this;
    }
}

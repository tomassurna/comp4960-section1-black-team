package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Session {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID sessionID;
    private String sessionTitle;
    private UUID timeslotID;
    private UUID speakerID;
    private UUID roomID;
    private UUID countID;

    public Session(String sessionTitle, UUID sessionID){
        this.sessionTitle = sessionTitle;
        this.sessionID = sessionID;
    }

    public UUID getSessionID(){
        return this.sessionID;
    }

    private void deleteSession(UUID sessionID){

    }

    private void updateSession(UUID sessionID, String sessionTitle){
        this.sessionID = sessionID;
        this.sessionTitle = sessionTitle;
    }

    private Session getSession(UUID sessionID){
        return this;
    }
}

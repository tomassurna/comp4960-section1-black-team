package com.app.blackteam.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;
import java.util.UUID;

@Entity // This tells Hibernate to make a table out of this class
public class Count {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private UUID countID;
    private String countType;
    private Time customTime;
    private int countValue;
    private String counterName;

    public boolean newCount(){
        return true;
    }

    public Count(String countType, int countValue, String counterName){
        this.countType = countType;
        this.countValue = countValue;
        this.counterName = counterName;
    }

    public Count(Time customTime, int countValue, String counterName){
        this.customTime = customTime;
        this.countValue = countValue;
        this.counterName = counterName;
    }

    public UUID getCountID(){
        return this.countID;
    }

    public int getCountValue(){
        return this.countValue;
    }

    public String getCountType(){
        return this.countType;
    }

    public Time getCustomTime(){
        return this.customTime;
    }

    private boolean checkTime(String temp_string){
        return true;
    }

    private Count getCount(UUID countID){
        return this;
    }
}

package com.app.blackteam.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Count extends PersistableEntity {
    @Column(nullable = false)
    private String counterName;

    @Column
    private int beginningCount;

    @Column
    private int middleCount;

    @Column
    private int endCount;

    public Count() {
    }

    public String getCounterName() {
        return counterName;
    }

    public void setCounterName(String counterName) {
        this.counterName = counterName;
    }

    public int getBeginningCount() {
        return beginningCount;
    }

    public void setBeginningCount(int beginningCount) {
        this.beginningCount = beginningCount;
    }

    public int getMiddleCount() {
        return middleCount;
    }

    public void setMiddleCount(int middleCount) {
        this.middleCount = middleCount;
    }

    public int getEndCount() {
        return endCount;
    }

    public void setEndCount(int endCount) {
        this.endCount = endCount;
    }
}

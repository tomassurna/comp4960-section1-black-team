package com.app.blackteam.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class DayOfPassword extends PersistableEntity {

    @Column(nullable = false)
    private String password;


    public DayOfPassword() {
    }

    public DayOfPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}

package com.sjsu.cmpe275.surveyape.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity

public class User {
    @Id
    private String userId;

    @Column
    private String username;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @Column
    private String age;

    @Column
    private boolean isActivated;

    @Column
    private String verificationCode;

    @JsonBackReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
    private List<Survey> surveys;


    public User(){

    }

    public User(String userId, String username, String password, String email, String age, boolean isActivated, String verificationCode) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.isActivated = isActivated;
        this.verificationCode = verificationCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public boolean isActivated() {
        return isActivated;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}

package com.sjsu.cmpe275.surveyape.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    private String userId;

    @Column
    private String age;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private boolean isActivated;

    @OneToMany(mappedBy = "owner")
    private List<Survey> surveys;

    private int verificationCode;

}

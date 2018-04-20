package com.sjsu.cmpe275.surveyape.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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

    @Column
    private List<Survey>  surveys;

}

package com.sjsu.cmpe275.surveyape.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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


    @JsonBackReference
    @OneToMany( cascade = CascadeType.ALL,mappedBy = "owner")
    private List<Survey> surveys;

    private int verificationCode;

}

package com.sjsu.cmpe275.surveyape.model;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//@Entity
public class Questionnairre {

//    @Id
    private int questionnairreId;

//    @OneToOne
//    @JoinColumn(name = "userId", nullable = false)
    //private User user;

    //@OneToMany(mappedBy = "passenger", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
}

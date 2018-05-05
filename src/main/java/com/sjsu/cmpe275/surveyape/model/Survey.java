package com.sjsu.cmpe275.surveyape.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Survey {
    @Id
    private String surveyId;

    private String surveyName;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name="userId")
    private User owner;


   @JsonManagedReference
    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    private boolean published;

    private Date endTime;

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyLinkDistribution> links;

    public Survey() {
    }

    public Survey(String surveyName,Date endTime, boolean published,User owner) {
        this.surveyName = surveyName;
        this.owner = owner;
        this.published = published;
        this.endTime = endTime;
    }
    //    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
//    private  List<Responses responses;



}

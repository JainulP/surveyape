package com.sjsu.cmpe275.surveyape.model;

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

//    @Type(type = "JsonUserType")
//    //@Convert(converter = JpaConverterJson.class)
//    private MyJsonType questionnaire;

    @ManyToOne
    @JoinColumn(name="userId")
    private User owner;

//    @Column
//    @ElementCollection(targetClass=Questionnairre.class)
//    private Questionnairre questionnairre;

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    private boolean published;

    private Date endTime;

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyLinkDistribution> links;


//    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
//    private  List<Responses responses;
}

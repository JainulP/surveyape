package com.sjsu.cmpe275.surveyape.model;

import javax.persistence.*;

@Entity
public class SurveyLinkDistribution {

    @Id
    private int linkId;

    private String link;

    @ManyToOne(targetEntity = Survey.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Survey survey;

    private String useremail;

    private boolean hasTaken;


}

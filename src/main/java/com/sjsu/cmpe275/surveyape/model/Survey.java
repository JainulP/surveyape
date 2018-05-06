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
    @GeneratedValue
    private int surveyId;

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


    private int surveyType;//0 for open survey, 1 for closed survey, 2 for open unique survey

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyLinkDistribution> links;

    public Survey() {
    }

    public Survey(String surveyName,Date endTime,int surveyType, boolean published,User owner) {
        this.surveyName = surveyName;
        this.owner = owner;
        this.published = published;
        this.endTime = endTime;
        this.surveyType = surveyType;
    }
    //    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
//    private  List<Responses responses;


    public int getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(int surveyId) {
        this.surveyId = surveyId;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public List<SurveyLinkDistribution> getLinks() {
        return links;
    }

    public void setLinks(List<SurveyLinkDistribution> links) {
        this.links = links;
    }

    public int getSurveyType() {
        return surveyType;
    }

    public void setSurveyType(int surveyType) {
        this.surveyType = surveyType;
    }
}

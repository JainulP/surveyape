package com.sjsu.cmpe275.surveyape.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.sjsu.cmpe275.surveyape.utils.View;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SurveyLinks {

    @Id
    @GeneratedValue
    private int linkId;

    @JsonView(View.SurveyView.class)
    private String link;

    @JsonManagedReference
    @ManyToOne(targetEntity = Survey.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Survey survey;

    private String userEmail;

    private boolean activated;

    private boolean isCompleted;

    public SurveyLinks() {

    }

    public  SurveyLinks(Survey survey,String link){
        this.survey = survey;
        this.link = link;
        this.activated = false;
        this.isCompleted = false;
    }

    public SurveyLinks(Survey survey, String userEmail,String link) {
        this.survey = survey;
        this.userEmail = userEmail;
        this.link = link;
        this.activated = false;
        this.isCompleted = true;
    }

    public int getLinkId() {
        return linkId;
    }

    public void setLinkId(int linkId) {
        this.linkId = linkId;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}

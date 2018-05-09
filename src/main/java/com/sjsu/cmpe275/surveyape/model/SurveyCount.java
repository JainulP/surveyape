package com.sjsu.cmpe275.surveyape.model;
import javax.persistence.*;

@Entity
public class SurveyCount {

    @Id
    private int surveyId;
    private int count;


    public SurveyCount(){
    }

    public SurveyCount(int surveyId, int count) {
        this.surveyId = surveyId;
        this.count = count;
    }

    public int getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(int surveyId) {
        this.surveyId = surveyId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}


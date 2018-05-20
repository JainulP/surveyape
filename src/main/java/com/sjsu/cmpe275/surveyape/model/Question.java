package com.sjsu.cmpe275.surveyape.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue
    private int questionId;

    private String questionStr;

    private String choiceType;//0 for text or 1 for image

    private String answerType;//0 for single or 1 for multiple

    private int questionType;//0 for multiple choice, 1 for yes/no question, 2 for    short answer question, 3 for datetime question, 4 for star rating question

    private String visualStyle;// 0 for dropdown , 1 for radio button, 2 for checkbox

//    @JsonIgnore
    @JsonBackReference
    @ManyToOne(targetEntity = Survey.class, fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    private Survey survey;
    

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> options;


    @JsonManagedReference
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Responses> responses;


    public Question() {

    }

    public Question( String questionStr, String answerType, String choiceType, int questionType, List<String> options,String visualStyle, Survey survey) {
        this.questionStr = questionStr;
        this.choiceType = choiceType;
        this.answerType = answerType;
        this.questionType = questionType;
        this.survey = survey;
        this.options = options;
        this.visualStyle = visualStyle;
    }

    public Question( String questionStr, int questionType,List<String> options, Survey survey) {
        this.questionStr = questionStr;
        this.questionType = questionType;
        this.survey = survey;
        this.options = options;
    }

    public Question( String questionStr, int questionType, Survey survey) {
        this.questionStr = questionStr;
        this.questionType = questionType;
        this.survey = survey;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestionStr() {
        return questionStr;
    }

    public void setQuestionStr(String questionStr) {
        this.questionStr = questionStr;
    }

    public String getChoiceType() {
        return choiceType;
    }

    public void setChoiceType(String choiceType) {
        this.choiceType = choiceType;
    }

    public String getAnswerType() {
        return answerType;
    }

    public void setAnswerType(String answerType) {
        this.answerType = answerType;
    }

    public int getQuestionType() {
        return questionType;
    }

    public void setQuestionType(int questionType) {
        this.questionType = questionType;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public List<Responses> getResponses() {
        return responses;
    }

    public void setResponses(List<Responses> responses) {
        this.responses = responses;
    }

    public String getVisualStyle() {
        return visualStyle;
    }

    public void setVisualStyle(String visualStyle) {
        this.visualStyle = visualStyle;
    }
}

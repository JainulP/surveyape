package com.sjsu.cmpe275.surveyape.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class Responses {

    @Id
    @GeneratedValue
    private int resId;

    @Column
    private String answers;


    @JsonBackReference
    @ManyToOne(targetEntity = Question.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name="question_id")
    private Question question;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User userId;

    @Column
    private String email;

    @Column
    private String  surveyId;




    public Responses() {

    }

    public Responses(Question question, String answers,User userId, String email, String surveyId) {
        this.userId = userId;
        this.setQuestion(question);
        this.answers = answers;
        this.email = email;
        this.surveyId = surveyId;

    }

    public Responses(User userId, Question question, String answers) {

        this.userId = userId;
        this.setQuestion(question);
        this.answers = answers;

    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String responses) {
        this.answers = responses;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public int getResId() {
        return resId;
    }

    public void setResId(int resId) {
        this.resId = resId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

}

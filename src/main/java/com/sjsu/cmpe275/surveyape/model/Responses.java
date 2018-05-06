package com.sjsu.cmpe275.surveyape.model;


import javax.persistence.*;

@Entity
public class Responses {

    @Id
    @GeneratedValue
    private int resId;

    @Column
    private String answers;


    @ManyToOne(targetEntity = Question.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name="question_id")
    private Question question;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User userId;

    @Column
    private String email;

    public Responses() {

    }

    public Responses(Question question, String answers,User userId, String email) {
        this.userId = userId;
        this.setQuestion(question);
        this.answers = answers;
        this.email = email;

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
        this.answers = answers;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }


    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

}

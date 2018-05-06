package com.sjsu.cmpe275.surveyape.model;


import javax.persistence.*;

@Entity
public class Responses {

    @Id
    @GeneratedValue
    private int resId;

    private String answers;

    @ManyToOne(targetEntity = Question.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Question question;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "userId")
    private User userId;

    public Responses() {

    }

    public Responses(int resId, User userId, Question question, String answers) {
        super();
        this.resId = resId;
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

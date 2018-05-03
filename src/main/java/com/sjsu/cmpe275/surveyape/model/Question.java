package com.sjsu.cmpe275.surveyape.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Question {

    @Id
    private int questionId;
    private String questionStr;
    private String choiceType;//text or image
    private String answerType;//single or multiple

    private int questionType;//0 for multiple choice, 1 for yes/no question, 2 for short answer question, 3 for datetime question, 4 for star rating question

    @ManyToOne(targetEntity = Survey.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Survey survey;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> options;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Responses> responses;
}

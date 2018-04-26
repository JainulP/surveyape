package com.sjsu.cmpe275.surveyape.model;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Question implements Serializable {
    private String questionId;
    private String choiceType;
    private String answerType;
    private List<String> options;
}

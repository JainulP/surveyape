package com.sjsu.cmpe275.surveyape.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Survey {
    @Id
    private String surveyId;

    //@Type(type = "com.sjsu.cmpe275.surveyape.model.MyJsonType")
    @Convert(converter = JpaConverterJson.class)
    private MyJsonType questionnaire;

    @ManyToOne
    @JoinColumn(name="userId")
    private User owner;
}

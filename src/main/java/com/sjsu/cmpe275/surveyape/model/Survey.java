package com.sjsu.cmpe275.surveyape.model;

import com.sjsu.cmpe275.surveyape.hibernate.MyJsonType;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class Survey {
    @Id
    private String surveyId;

    @Type(type = "JsonUserType")
    //@Convert(converter = JpaConverterJson.class)
    private MyJsonType questionnaire;

    @ManyToOne
    @JoinColumn(name="userId")
    private User owner;
}

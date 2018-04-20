package com.sjsu.cmpe275.surveyape.model;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Questionairre implements Serializable {
    private List<Question> questions;

}

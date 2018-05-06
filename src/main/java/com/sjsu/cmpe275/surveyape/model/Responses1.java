package com.sjsu.cmpe275.surveyape.model;
/*package com.sjsu.cmpe275.surveyape.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Responses {

    @Id
    private int resId;

    private String useremail;

//    @ManyToOne(targetEntity = Survey.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
//    private Survey survey;

    @ManyToOne(targetEntity = Question.class, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Question question;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> answers;
}
*/
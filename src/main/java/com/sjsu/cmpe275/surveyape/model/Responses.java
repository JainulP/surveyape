package com.sjsu.cmpe275.surveyape.model;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.sjsu.cmpe275.surveyape.model.User;
 
@Entity
public class Responses {
	
	@Id 
	@GeneratedValue
	private String resId;
	
	
	private String responses;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Question question;
	@OneToOne
	@JoinColumn(name = "email", referencedColumnName="userId" )
	private User userId;
	
	
	public Responses() {
		
	}
	
	public Responses( String resId, User userId, Question question, String responses) {
		super();
		this.resId= resId;
		this.userId= userId;
		this.setQuestion(question);
		this.responses= responses;
		
	}
	
	public String getAnswer() {
		return responses;
	}

	public void setAnswer(String responses) {
		this.responses = responses;
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

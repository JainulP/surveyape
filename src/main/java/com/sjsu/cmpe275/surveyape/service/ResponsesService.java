package com.sjsu.cmpe275.surveyape.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sjsu.cmpe275.surveyape.model.Question;
import com.sjsu.cmpe275.surveyape.model.Responses;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.User;

import com.sjsu.cmpe275.surveyape.repository.ResponsesRepository;

@Service
public class ResponsesService {
	
	@Autowired
	private ResponsesRepository responsesRepository;
	
	
	public void addResponses(Responses responses) {
		responsesRepository.save(responses);
		
	}

	public List<Responses> getAllAnswers(String userId, String questionId) {
		
		List<Responses> ans = new ArrayList<>();
		responsesRepository.findByUserIdAndQuestion(userId, questionId)
		.forEach(ans :: add);
		return ans;
	}
	

}

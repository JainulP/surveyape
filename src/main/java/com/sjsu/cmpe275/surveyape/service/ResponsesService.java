package com.sjsu.cmpe275.surveyape.service;

import com.sjsu.cmpe275.surveyape.model.Responses;
import com.sjsu.cmpe275.surveyape.repository.ResponsesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResponsesService {

	@Autowired
	private ResponsesRepository responsesRepository;


	public void addResponses(Responses responses) {
		responsesRepository.save(responses);

	}

	public List<Responses> getAllAnswers(int userId, int questionId) {

		List<Responses> ans = new ArrayList<>();
		responsesRepository.findByUserIdAndQuestion(userId, questionId)
		.forEach(ans :: add);
		return ans;
	}


}

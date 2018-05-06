package com.sjsu.cmpe275.surveyape.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.sjsu.cmpe275.surveyape.model.Question;
import com.sjsu.cmpe275.surveyape.model.Responses;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.User;
import com.sjsu.cmpe275.surveyape.service.ResponsesService;

@RestController
public class ResponseController {
	
	@Autowired
	private ResponsesService responsesService;

	@RequestMapping("/responses/{userId}")
	public List<Responses> getAllAnswer(@PathVariable String userId, @RequestParam("question") String question) {
		return responsesService.getAllAnswers(userId, question);
	}
	
	@RequestMapping(method=RequestMethod.POST, value= "/survey/{surveyId}/{resId}")
	public void addResponses(@RequestBody Responses responses, @PathVariable String resId) {
		responsesService.addResponses(responses);
	}
	
	
}



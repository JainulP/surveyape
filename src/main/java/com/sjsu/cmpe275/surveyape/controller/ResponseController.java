//package com.sjsu.cmpe275.surveyape.controller;
//
//import com.sjsu.cmpe275.surveyape.model.Responses;
//import com.sjsu.cmpe275.surveyape.service.ResponsesService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class ResponseController {
//
//	@Autowired
//	private ResponsesService responsesService;
//
//	@RequestMapping("/responses/{userId}")
//	public List<Responses> getAllAnswer(@PathVariable int userId, @RequestParam("question") int questionId) {
//		return responsesService.getAllAnswers(userId, questionId);
//	}
//
//	@RequestMapping(method=RequestMethod.POST, value= "/response")
//	public void addResponses(@RequestBody Responses responses, @PathVariable String resId) {
//		responsesService.addResponses(responses);
//	}
//
//
//}
//
//

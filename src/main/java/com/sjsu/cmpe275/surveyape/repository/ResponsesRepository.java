package com.sjsu.cmpe275.surveyape.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


import com.sjsu.cmpe275.surveyape.model.Responses;

public interface ResponsesRepository extends CrudRepository<Responses, String> {
	
	public List<Responses> findByUserIdAndQuestion(String userId, String question);

}

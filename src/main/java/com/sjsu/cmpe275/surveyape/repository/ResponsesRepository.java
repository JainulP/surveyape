package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Responses;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ResponsesRepository extends CrudRepository<Responses, Integer> {
	
	public List<Responses> findByUserIdAndQuestion(int userId, int question);

}

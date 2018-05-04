package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, Integer> {
}

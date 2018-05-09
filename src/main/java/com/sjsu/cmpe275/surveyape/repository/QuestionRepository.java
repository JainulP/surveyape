package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends CrudRepository<Question, Integer> {

    @Query(value = "SELECT question_str from question where question_id=:qid",nativeQuery = true)
    String getQuestionNameByQuestionId(@Param("qid") int qid);
}


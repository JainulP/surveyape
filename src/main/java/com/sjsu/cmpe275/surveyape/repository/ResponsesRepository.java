package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Responses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResponsesRepository extends JpaRepository<Responses, Integer> {

    @Query(value = "SELECT answers from responses where question_id=:qid", nativeQuery = true)
    List<String> getAnswersByQuestionId(@Param("qid") int questionId);

    @Query(value = "SELECT answers from responses where question_id=:uid and user_id=:qid", nativeQuery = true)
    List<String> getAnswersByUserIdAndQuestion(@Param("uid") int userId, @Param("qid") int questionId);

    @Query(value = "SELECT answers from responses where user_id=:uid")
    List<String> getAnswersByUser(@Param("uid") int userId);

}

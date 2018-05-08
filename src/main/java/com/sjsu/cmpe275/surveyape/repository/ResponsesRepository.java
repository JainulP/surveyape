package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Responses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ResponsesRepository extends JpaRepository<Responses, Integer> {

    @Query(value = "SELECT answers from responses where question_id=:qid", nativeQuery = true)
    List<String> getAnswersByQuestionId(@Param("qid") int questionId);

    @Query(value = "SELECT answers from responses where question_id=:qid and user_id=:uid", nativeQuery = true)
    List<String> getAnswersByUserIdAndQuestion(@Param("uid") int userId, @Param("qid") int questionId);

    @Query(value = "SELECT answers from responses where user_id=:uid", nativeQuery = true)
    List<String> getAnswersByUser(@Param("uid") int userId);

    @Query(value = "SELECT answers from responses where qid=:qid", nativeQuery = true)
    List<Object[]> getAllAnswersByQuestionForStats(@Param("qid") int qid);

    @Query(value = "SELECT answers FROM responses WHERE survey_id=:sid  AND question_id=:qid", nativeQuery = true)
    List<String> findAllBySurveyId(int surveyId);

    @Query(value="SELECT answers,question_id FROM responses WHERE survey_id=:sid",nativeQuery = true)
    Map<String,Integer> getQuestionAndAnswersForSurvey(@Param("sid") int surveyId);



}

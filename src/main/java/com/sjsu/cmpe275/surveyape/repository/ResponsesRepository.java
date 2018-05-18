package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Responses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

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

    @Query(value="SELECT DISTINCT question_id FROM responses WHERE survey_id=:sid",nativeQuery = true)
    List<Integer> getQuestionAndAnswersForSurvey(@Param("sid") int surveyId);

    @Query(value = "SELECT options from question_options where question_question_id=:qid", nativeQuery = true)
    List<String> getOptionsForQuestion(@Param("qid") int questionId);

//    @Query(value = "SELECT answers,question_id FROM responses WHERE survey_id=:sid", nativeQuery = true)
//    List<Integer> getQuestionAndAnswersForSurvey(@Param("sid") int surveyId);


    @Query(value = "SELECT count(*) from Responses where question_id = :qid and answers=:option ",nativeQuery = true)
    int getCountOfAnswerChoices(@Param("qid")int qid,@Param("option") String option);

    @Query(value = "SELECT question_type from Question where question_id=:qid",nativeQuery = true)
    int getQuestionTypeForQuestion(@Param("qid") int question_id);

    @Query(value = "SELECT visual_style from Question where question_id=:qid",nativeQuery = true)
    int getVisualTypeForQuestion(@Param("qid") int question_id);


    @Query(value = "SELECT question_id from question where survey_survey_id = :sid and question_type=2",nativeQuery = true)
    List <Integer> getTextReponsesForSurvey (@Param("sid") int surveyId);



}

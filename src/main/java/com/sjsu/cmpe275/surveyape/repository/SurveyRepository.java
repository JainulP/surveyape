package com.sjsu.cmpe275.surveyape.repository;

import com.fasterxml.jackson.annotation.JsonView;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.utils.View;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

@JsonView(View.SurveyView.class)
public interface SurveyRepository extends CrudRepository<Survey, Integer> {

    @Query(value = "SELECT DISTINCT * from survey s where  (s.survey_type=0 OR s.survey_type=2 ) AND  s.published = true ", nativeQuery = true)
    List<Survey> getGeneralAndOpenSurvey();

//    @Query(value = "SELECT start_time,end_time,(\n" +
//            "SELECT count(user_email) FROM survey_links sld,survey s WHERE sld.survey_survey_id=s.survey_id AND is_completed='1' AND link IS NOT NULL) AS participants,((\n" +
//            "SELECT count(user_email) FROM survey_links sld,survey s WHERE sld.survey_survey_id=s.survey_id AND is_completed='1' AND link IS NOT NULL)/(\n" +
//            "SELECT count(user_email) FROM survey_links sld,survey s WHERE sld.survey_survey_id=s.survey_id AND link IS NOT NULL)*100) AS participant_rate FROM survey where survey_id=:sid", nativeQuery = true)
//    Survey getSurveyStatsByTimeAndParticipants(@Param("sid") String surveyId);


    @Query(value = "SELECT start_time, end_time from Survey where survey_id=:survey_id", nativeQuery = true)
    Map<Date, Date> getStartAndEndTimeForSurvey(@Param("survey_id") int survey_id);


    @Query(value = "SELECT count(user_email) FROM survey_links sld,survey s WHERE sld.survey_survey_id=:survey_id AND is_completed='1' AND link IS NOT NULL",nativeQuery = true)
    int getParticipantsForSurvey(@Param("survey_id") int survey_id);

    @Query(value = "SELECT count(user_email) FROM survey_links sld,survey s WHERE sld.survey_survey_id=:survey_id AND link IS NOT NULL", nativeQuery = true)
    int getInvitedUsersForSurvey(@Param("survey_id") int survey_id);



    @Query(value = "SELECT DISTINCT * from survey s, survey_links sl where  s.survey_id = sl.survey_survey_id  AND sl.user_id = :userId  AND sl.is_completed=1", nativeQuery = true)
    List<Survey> getCompletedSurveysForUser(@Param("userId") int userId);

    @Query(value = "SELECT DISTINCT * from survey s, survey_links sl where  s.survey_id = sl.survey_survey_id  AND sl.user_id = :userId  AND sl.is_completed=0", nativeQuery = true)
    List<Survey> getinCompletedSurveysForUser(@Param("userId") int userId);

    @Query(value =
            "SELECT DISTINCT * from survey s where  s.user_id = :userId  AND s.published=1", nativeQuery = true)
    List<Survey> getCreatedAndPublishedSurveyByOwner(@Param("userId") int userId);

    @Query(value =
            "SELECT DISTINCT * from survey s where  s.user_id = :userId", nativeQuery = true)
    List<Survey> getCreatedSurveyByOwner(@Param("userId") int userId);


}

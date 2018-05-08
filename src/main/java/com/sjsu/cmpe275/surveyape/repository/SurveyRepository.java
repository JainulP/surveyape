package com.sjsu.cmpe275.surveyape.repository;

import com.fasterxml.jackson.annotation.JsonView;
import com.sjsu.cmpe275.surveyape.model.StatsDto;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.utils.View;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@JsonView(View.SurveyView.class)
public interface SurveyRepository extends CrudRepository<Survey, Integer> {


    @Query(value = "SELECT DISTINCT * from survey s where  (s.survey_type=0 OR s.survey_type=2 ) AND  s.published = true ", nativeQuery = true)
    List<Survey> getGeneralAndOpenSurvey();

    @Query(value="SELECT start_time,end_time,(\n" +
            "SELECT count(useremail) FROM survey_link_distribution sld,survey s WHERE sld.survey_survey_id=s.survey_id AND has_taken='1' AND link IS NOT NULL) AS participants,((\n" +
            "SELECT count(useremail) FROM survey_link_distribution sld,survey s WHERE sld.survey_survey_id=s.survey_id AND has_taken='1' AND link IS NOT NULL)/(\n" +
            "SELECT count(useremail) FROM survey_link_distribution sld,survey s WHERE sld.survey_survey_id=s.survey_id AND link IS NOT NULL)*100) AS participant_rate FROM survey where survey_id=:sid)",nativeQuery = true)
    StatsDto getSurveyStatsByTimeAndParticipants(@Param("sid") String surveyId);



    @Query(value = "SELECT DISTINCT * from survey s, survey_links sl where  s.survey_id = sl.survey_survey_id  AND sl.user_id = :userId  AND sl.is_completed=1", nativeQuery = true)
    List<Survey> getCompletedSurveysForUser(@Param("userId") int userId);

    @Query(value = "SELECT DISTINCT * from survey s, survey_links sl where  s.survey_id = sl.survey_survey_id  AND sl.user_id = :userId  AND sl.is_completed=0", nativeQuery = true)
    List<Survey> getinCompletedSurveysForUser(@Param("userId") int userId);
}

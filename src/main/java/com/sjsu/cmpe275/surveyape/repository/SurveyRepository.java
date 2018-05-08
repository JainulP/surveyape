package com.sjsu.cmpe275.surveyape.repository;

import com.fasterxml.jackson.annotation.JsonView;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.utils.View;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@JsonView(View.SurveyView.class)
public interface SurveyRepository extends CrudRepository<Survey, Integer> {


    @Query(value = "SELECT DISTINCT * from survey s, survey_links sl where s.survey_id = sl.survey_survey_id AND (s.survey_type=0 OR s.survey_type=2 ) AND  s.published = true AND sl.user_email = '' ", nativeQuery = true)
    List<Survey> getGeneralAndOpenSurvey();
}

package com.sjsu.cmpe275.surveyape.repository;

import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.SurveyLinks;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SurveyLinksRepository extends CrudRepository<SurveyLinks, Integer> {

    List<SurveyLinks> getSurveyLinksBySurvey(Survey survey);

    @Query(value = "SELECT DISTINCT user_email FROM SurveyApe.survey_links sl WHERE sl.survey_survey_id = :surveyId",
            nativeQuery = true)
    List<String> getEmailsBySurvey(@Param("surveyId") String surveyId);

}

package com.sjsu.cmpe275.surveyape.repository;


import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.SurveyCount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyCountRepository extends JpaRepository<SurveyCount,Integer> {
    Survey findBySurveyId(int surveyId);

}

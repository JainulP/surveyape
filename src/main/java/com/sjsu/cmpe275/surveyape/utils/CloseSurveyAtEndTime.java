//package com.sjsu.cmpe275.surveyape.utils;
//
//import com.sjsu.cmpe275.surveyape.controller.SurveyController;
//import com.sjsu.cmpe275.surveyape.model.Survey;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.util.TimerTask;
//
//
//public class CloseSurveyAtEndTime extends TimerTask {
//
//    @Autowired
//    private Survey survey ;
//
//
//
//    @Autowired
//    private SurveyController surveyController;
//
//
//    public CloseSurveyAtEndTime() {
//
//    }
//
//    public CloseSurveyAtEndTime(Survey survey) {
//        this.survey = survey;
//    }
//
//    @Override
//    public void run() {
//
//        surveyController.invalidateSurveyLinks(survey);
//
//
//
//    }
//}

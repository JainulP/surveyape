package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.BadRequestController;
import com.sjsu.cmpe275.surveyape.model.Question;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/survey")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSurveyJson(@PathVariable("surveyId") String surveyId) {

        return getSurvey(surveyId);

    }


    private ResponseEntity<?> getSurvey(String id) {

        Survey survey = surveyRepository.findById(id).get();

        if (survey == null) {
            System.out.println("Not Found");
            return new ResponseEntity<>( new BadRequestController(new BadRequest(404, "Sorry, the requested survey with id " +
                    id + " does not exist"))
                    , HttpStatus.NOT_FOUND);
        } else {
            System.out.println("Found question");
            return new ResponseEntity<>(survey, HttpStatus.OK);

        }
    }


}

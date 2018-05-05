package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.*;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import com.sjsu.cmpe275.surveyape.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/survey")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSurvey(@RequestParam(value = "surveyName") String surveyName,
                                          @RequestParam(value = "endTime", required = false) String endTime,
                                          @RequestParam(value = "published") String published,
                                          @RequestParam(value = "userId") String userId) {

        User user = userRepository.findById(userId).get();
        String format = "yyyy-MM-dd-HH";

        SimpleDateFormat sdf = new SimpleDateFormat(format);

        Survey survey = null;
        try {
            survey = surveyRepository.save(new Survey(surveyName, sdf.parse(endTime), Boolean.getBoolean(published), user));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(survey, HttpStatus.OK);

    }

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSurveyJson(@PathVariable("surveyId") String surveyId) {

        return getSurvey(surveyId);

    }


    private ResponseEntity<?> getSurvey(String id) {

        Survey survey = surveyRepository.findById(Integer.parseInt(id)).get();

        if (survey == null) {
            System.out.println("Not Found");
            return new ResponseEntity<>(new BadRequestController(new BadRequest(404, "Sorry, the requested survey with id " +
                    id + " does not exist"))
                    , HttpStatus.NOT_FOUND);
        } else {
            System.out.println("Found question");
            return new ResponseEntity<>(survey, HttpStatus.OK);

        }
    }


    @RequestMapping(value = "/{surveyId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteSurvey(@PathVariable("surveyId") String surveyId) {

        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
        if (survey == null) {
            return new ResponseEntity<>(new BadRequestController(new BadRequest(404, "Survey with id " + surveyId + " does not exist")), HttpStatus.NOT_FOUND);
        } else {
            // write to db
            surveyRepository.delete(survey);
            return new ResponseEntity<>(new BadRequestController(new BadRequest(200, "Survey with id " + surveyId +
                    " is deleted successfully")), HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateSurveyEndTime(@RequestParam(value = "surveyId") String surveyId,
                                                 @RequestParam(value = "endTime") String endTime) {

        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
        if (survey != null) {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH");
            try {
                Date date1 = null;
                if(survey.getEndTime() != null) {
                     date1 = sdf.parse(survey.getEndTime().toString());
                }
               
                Date date2 = sdf.parse(sdf.format(new Date()));

                if (date1 == null || date1.compareTo(date2) < 0) {
                    survey.setEndTime(sdf.parse(endTime));
                    Survey updatedSurvey = surveyRepository.save(survey);
                    return new ResponseEntity<>(updatedSurvey, HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>(new BadRequestController(new BadRequest(400, "Sorry, the survey has already been expired")), HttpStatus.BAD_REQUEST);

                }
            } catch (ParseException e) {
                e.printStackTrace();
                return new ResponseEntity<>(new BadRequestController(new BadRequest(400, "Invalid Date")), HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<>(new BadRequestController(new BadRequest(404, "Survey with id " + surveyId + " does not exist")), HttpStatus.NOT_FOUND);

        }


    }





}

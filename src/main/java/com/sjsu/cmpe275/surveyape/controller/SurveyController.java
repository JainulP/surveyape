package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.*;
import com.sjsu.cmpe275.surveyape.repository.SurveyLinksRepository;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import com.sjsu.cmpe275.surveyape.repository.UserRepository;
import com.sjsu.cmpe275.surveyape.service.EmailService;
//import com.sjsu.cmpe275.surveyape.utils.CloseSurveyAtEndTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Timer;

@RestController
@RequestMapping(value = "/survey")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SurveyLinksRepository surveyLinksRepository;

    @Autowired
    private EmailService emailService;


    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSurvey(@RequestParam(value = "surveyName") String surveyName,
                                          @RequestParam(value = "endTime", required = false) String endTime,
                                          @RequestParam(value = "userId") String userId,
                                          @RequestParam(value = "surveyType") String surveyType) {

        User user = userRepository.findById(Integer.parseInt(userId)).get();
        String format = "yyyy-MM-dd-HH";

        SimpleDateFormat sdf = new SimpleDateFormat(format);

        Survey survey = null;
        Date date = null;
        try {
            date = sdf.parse(endTime);
            survey = surveyRepository.save(new Survey(surveyName, sdf.parse(endTime),Integer.parseInt(surveyType), user));
        } catch (ParseException e) {
            return new ResponseEntity<>(new BadRequest(400, "Invalid Date"), HttpStatus.BAD_REQUEST);
//            e.printStackTrace();
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
            return new ResponseEntity<>(new BadRequest(404, "Sorry, the requested survey with id " +id + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(survey, HttpStatus.OK);

        }
    }


    @RequestMapping(value = "/{surveyId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteSurvey(@PathVariable("surveyId") String surveyId) {

        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
        if (survey == null) {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            // write to db
            surveyRepository.delete(survey);
            return new ResponseEntity<>(new BadRequest(200, "Survey with id " + surveyId +" is deleted successfully"), HttpStatus.OK);
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
                     date1 =sdf.parse(sdf.format(survey.getEndTime()));
                }

                Date date2 = sdf.parse(sdf.format(new Date()));

                if (date1 == null || date1.compareTo(date2) > 0) {
                    survey.setEndTime(sdf.parse(endTime));
//                    //Now create the time and schedule it
//                    Timer timer = new Timer();
//
//                    //Use this if you want to execute it once
//                    timer.schedule(new CloseSurveyAtEndTime(survey), sdf.parse(endTime));
                    Survey updatedSurvey = surveyRepository.save(survey);
                    return new ResponseEntity<>(updatedSurvey, HttpStatus.OK);
                }
                else{
                    return new ResponseEntity<>(new BadRequest(400, "Sorry, the survey has already been expired"), HttpStatus.BAD_REQUEST);

                }
            } catch (ParseException e) {
                e.printStackTrace();
                return new ResponseEntity<>(new BadRequest(400, "Invalid Date"), HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);

        }


    }

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> closeSurvey(@PathVariable("surveyId") String surveyId) {

        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
        if (survey == null) {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH");
            // write to db
            Date date1 = null;

                try {
                    date1 = sdf.parse(sdf.format(new Date()));
                    survey.setEndTime(date1);
                } catch (ParseException e) {
                    e.printStackTrace();
                }

            surveyRepository.save(survey);

            //mark all the links invalid
           invalidateSurveyLinks(survey);

            return new ResponseEntity<>(new BadRequest(200, "Survey with id " + surveyId +" is closed successfully"), HttpStatus.OK);
        }
    }

    //mark all the links invalid
    public void invalidateSurveyLinks(Survey survey){
        List<SurveyLinks> surveyLinks = surveyLinksRepository.getSurveyLinksBySurvey(survey);
        for(SurveyLinks link : surveyLinks){
            link.setActivated(false);
            surveyLinksRepository.save(link);
        }
    }


    @RequestMapping(value = "/{surveyId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> publishSurvey(@PathVariable("surveyId") String surveyId,
                                           @RequestParam(value= "published") String published) {
        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
            if (survey == null) {
                return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);
            }
            if(survey.getEndTime()!= null) {
//                //Now create the time and schedule it
//                Timer timer = new Timer();
//
//                //Use this if you want to execute it once
//                timer.schedule(new CloseSurveyAtEndTime(survey), survey.getEndTime());
            }
            if (published.equals("true")) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH");
                // write to db
                Date date1 = null;
                try {
                    date1 = sdf.parse(sdf.format(new Date()));
                    survey.setStartTime(date1);
                    survey.setPublished(true);
                    if (survey.getSurveyType() == 0) {//general open survey
                        List<String> emails = surveyLinksRepository.getEmailsBySurvey(Integer.toString(survey.getSurveyId()));
                        String url = emailService.sendUniqueInvitationForGeneralSurveyUsers(emails, null, surveyId);

                    }
                    else if(survey.getSurveyType() == 1){//closed surveey
                        List<String> emails = surveyLinksRepository.getEmailsBySurvey(Integer.toString(survey.getSurveyId()));
                        List<String> urls = emailService.sendUniqueInvitationForClosedSurveyUsers(emails, null, surveyId);
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                //}
                surveyRepository.save(survey);

                //activate links for participants added
                activateSurveyLink(survey);

                return new ResponseEntity<>(new BadRequest(200, "Survey with id " + surveyId + " is published successfully"), HttpStatus.OK);

            }
            else {

                   List<Question> questions = survey.getQuestions();
                   for(Question question: questions){
                       if(question.getResponses().size() >0){
                           return new ResponseEntity<>(new BadRequest(400, "Survey with id " + surveyId + " can not be unpublished as it has been already responded by some participants"), HttpStatus.BAD_REQUEST);

                       }
                   }
                    //de-activate links for participants added
                    invalidateSurveyLinks(survey);

                    survey.setPublished(false);
                    surveyRepository.save(survey);

                    return new ResponseEntity<>(new BadRequest(200, "Survey with id " + surveyId + " is unpublished successfully"), HttpStatus.OK);
                 }


    }




    public void activateSurveyLink(Survey survey){
        List<SurveyLinks> surveyLinks = surveyLinksRepository.getSurveyLinksBySurvey(survey);
        for(SurveyLinks link : surveyLinks){
            link.setActivated(true);
            surveyLinksRepository.save(link);
        }
    }





}

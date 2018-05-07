package com.sjsu.cmpe275.surveyape.controller;


import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.SurveyLinks;
import com.sjsu.cmpe275.surveyape.repository.SurveyLinksRepository;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import com.sjsu.cmpe275.surveyape.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping(value = "/participants")
public class AddParticipantsController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyLinksRepository surveyLinksRepository;

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addParticipants(@PathVariable("surveyId") String surveyId,
                                             @RequestParam(value = "emails") List<String> emails) {
        List<SurveyLinks> surveyLinks = new ArrayList<>();
        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
        if(survey != null) {
            if(survey.getSurveyType() == 0){//general open survey
                 String url = "127.0.0.1:8080/"+surveyId;
                if(survey.getPublished() == true){
                    emailService.sendUniqueInvitationForGeneralSurveyUsers(emails, null, surveyId);
                }
                   for(String email : emails) {
                         SurveyLinks links = surveyLinksRepository.save(new SurveyLinks(survey,email,url));
                         surveyLinks.add(links);

                    }
                return new ResponseEntity<>(new BadRequest(200, "Participants have been successfully added"), HttpStatus.OK);
            }else if(survey.getSurveyType() == 1){//closed survey
                if(survey.getPublished() == true){
                    emailService.sendUniqueInvitationForClosedSurveyUsers(emails, null, surveyId);
                }
                for(String email : emails) {
                    String url = "127.0.0.1:8080/"+surveyId+"/"+ Base64.getEncoder().encodeToString(email.getBytes());
                    SurveyLinks links = surveyLinksRepository.save(new SurveyLinks(survey,email,url));
                    surveyLinks.add(links);
                }
                return new ResponseEntity<>(new BadRequest(200, "Participants have been successfully added"), HttpStatus.OK);
            }
            return  null;


        }
        else{
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);

        }


    }


}

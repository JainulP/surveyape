package com.sjsu.cmpe275.surveyape.controller;


import com.google.zxing.WriterException;
import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.SurveyLinks;
import com.sjsu.cmpe275.surveyape.repository.SurveyLinksRepository;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import com.sjsu.cmpe275.surveyape.service.EmailService;
import com.sjsu.cmpe275.surveyape.service.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

//import com.sjsu.cmpe275.surveyape.service.QRCodeService;

@RestController
@RequestMapping(value = "/participants")
public class AddParticipantsController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private SurveyController surveyController;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyLinksRepository surveyLinksRepository;

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addParticipants(@PathVariable("surveyId") String surveyId,
                                             @RequestParam(value = "emails") List<String> emails) {
        List<SurveyLinks> surveyLinks = new ArrayList<>();
        Optional<Survey> surveyOptional = surveyRepository.findById(Integer.parseInt(surveyId));
        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            if (survey.getSurveyType() == 0) {//general open survey
                String url = "http://54.213.196.21:3000/survey/" + surveyId;

                for (String email : emails) {
                    SurveyLinks links = surveyLinksRepository.save(new SurveyLinks(survey, email, url));
//                    try {
//                        String QR_CODE_IMAGE_PATH = "/Users/jainulpatel/Documents/CMPE275/surveyape/src/main/resources/QRCodes/" + email + surveyId + "MyQRCode.png";
//                        qrCodeService.generateQRCodeImage(url, 350, 350, QR_CODE_IMAGE_PATH);
//                    } catch (WriterException e) {
//                        e.printStackTrace();
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
                    surveyLinks.add(links);

                }
                if (survey.getPublished() == true) {
//                    for (String email : emails) {
//                        try {
//                            String QR_CODE_IMAGE_PATH = "/Users/jainulpatel/Documents/CMPE275/surveyape/src/main/resources/QRCodes/" + email + surveyId + "MyQRCode.png";
//                            qrCodeService.generateQRCodeImage(url, 350, 350, QR_CODE_IMAGE_PATH);
//                        } catch (WriterException e) {
//                            e.printStackTrace();
//                        } catch (IOException e) {
//                            e.printStackTrace();
//                        }
//                    }
                    emailService.sendUniqueInvitationForGeneralSurveyUsers(emails, surveyId);
                    surveyController.activateSurveyLink(survey);

                }


                return new ResponseEntity<>(new BadRequest(200, "Participants have been successfully added"), HttpStatus.OK);
            } else if (survey.getSurveyType() == 1) {//closed survey
                for (String email : emails) {
                    String url = "http://54.213.196.21:3000/survey/" + surveyId + "/" + Base64.getEncoder().encodeToString(email.getBytes());
                    SurveyLinks links = surveyLinksRepository.save(new SurveyLinks(survey, email, url));
                    surveyLinks.add(links);

                }
                if (survey.getPublished() == true) {
                    emailService.sendUniqueInvitationForClosedSurveyUsers(emails, surveyId);
                    surveyController.activateSurveyLink(survey);
                }

                return new ResponseEntity<>(new BadRequest(200, "Participants have been successfully added"), HttpStatus.OK);
            }
            return null;


        } else {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);

        }


    }

    @RequestMapping(value = "/open/{surveyId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sendInviteForOpenUniqueSurvey(@PathVariable("surveyId") String surveyId,
                                                           @RequestParam(value = "email") String email) {

        Optional<Survey> surveyOptional = surveyRepository.findById(Integer.parseInt(surveyId));
        if (!surveyOptional.isPresent()) {
            return new ResponseEntity<>(new BadRequest(400, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);

        }
        Survey survey = surveyOptional.get();
        if (survey == null) {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            // write to db
            String url = "http://54.213.196.21:3000/survey/" + surveyId + "/open/" + Base64.getEncoder().encodeToString(email.getBytes());
            SurveyLinks links = surveyLinksRepository.save(new SurveyLinks(survey, email, url));
            links.setActivated(true);
            links.setCompleted(false);
            surveyLinksRepository.save(links);
            emailService.sendUniqueInvitationForOpenUniqueSurveyUsers(email, surveyId);
            return new ResponseEntity<>(new BadRequest(200, "Unique invitation link has been sent to the email id provided by you."), HttpStatus.OK);
        }
    }


}

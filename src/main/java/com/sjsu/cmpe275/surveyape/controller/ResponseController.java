package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.*;
import com.sjsu.cmpe275.surveyape.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ResponseController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private ResponsesRepository responsesRepository;
    private QuestionRepository questionRepository;
    private UserRepository userRepository;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyLinksRepository surveyLinksRepository;

    @Autowired
    private SurveyController surveyController;

    @Autowired
    public ResponseController(ResponsesRepository responsesRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.responsesRepository = responsesRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }


    /**
     * Get all answers by a user
     *
     * @param uid
     * @return
     */
    @GetMapping(value = "/response/{uid}", produces = "application/json")
    public ResponseEntity<?> getAllAnswersByUser(@PathVariable int uid) {
        List<String> answers = responsesRepository.getAnswersByUser(uid);
        if (answers.size() > 0) {
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(404, "No answers given by this user"), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get all the responses by a user for a particular survey
     *
     * @param userId
     * @return
     */
    @GetMapping(value = "/responses/{userid}/{qid}", produces = "application/json")
    public ResponseEntity<?> getAllAnswersByUserId(@PathVariable int userId, @PathVariable int qid) {
        List<String> answers = responsesRepository.getAnswersByUserIdAndQuestion(userId, qid);
        if (answers.size() > 0) {
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(404, "No answers given by this user for this question"), HttpStatus.NOT_FOUND);
        }
    }


    /* For creating a response*?
    /**
     * Creates a response
     * @param answers
     * @param questionId
     * @param email
     * @param userId
     * @param surveyid
     * @return
     */
    @PostMapping(value = "/response", produces = "application/json")
    public ResponseEntity<?> addResponses(@RequestParam String answers, @RequestParam(name = "qid") int questionId, @RequestParam(name = "email", required = false) String email, @RequestParam(name = "userid", required = false) Integer userId, @RequestParam(name = "surveyid") String surveyid) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            if (userId != null) {
                Optional<User> userOptional = userRepository.findById(userId);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    Responses responses = new Responses(question, answers, user, user.getEmail(), surveyid);
                    responsesRepository.save(responses);
                    return new ResponseEntity<>("Response saved", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new BadRequest(404, "Invalid user"), HttpStatus.BAD_REQUEST);
                }
            } else {
                if (email == null) {
                    responsesRepository.save(new Responses(question, answers, null, "Anonymous", surveyid));
                } else {
                    responsesRepository.save(new Responses(question, answers, null, email, surveyid));
                }
                return new ResponseEntity<>(new BadRequest(200, "Response saved"), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Invalid question"), HttpStatus.BAD_REQUEST);
        }


    }

    @PutMapping(value = "/response/{resId}", produces = "application/json")
    public ResponseEntity<?> updateResponses(@PathVariable int resId,@RequestParam String answers, @RequestParam(name = "qid") int questionId, @RequestParam(name = "email", required = false) String email, @RequestParam(name = "userid", required = false) Integer userId, @RequestParam(name = "surveyid") String surveyid) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            if (userId != null) {
                Optional<User> userOptional = userRepository.findById(userId);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    Optional<Responses> responsesOptional = responsesRepository.findById(resId);
                    if(responsesOptional.isPresent()){
                        Responses response = responsesOptional.get();
                        response.setAnswers(answers);
                        responsesRepository.save(response);
                        return new ResponseEntity<>(new BadRequest(200, "Response saved"), HttpStatus.OK);
                    }
                    else{
                        return new ResponseEntity<>(new BadRequest(200, "Error in updating your response. Please try again later"), HttpStatus.OK);

                    }

                } else {
                    return new ResponseEntity<>(new BadRequest(404, "Invalid user"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new BadRequest(200, "Response saved"), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Invalid question"), HttpStatus.BAD_REQUEST);
        }


    }

    /* For stats */

    /**
     * creates a map of answers & question
     *
     * @param surveyId
     * @return
     */

    @GetMapping(value = "/responses", produces = "application/json", params = "surveyId")
    public ResponseEntity<?> getAnswersBySurveyAndQuestionId(@RequestParam(value = "surveyId") int surveyId) {
        Map<String, Integer> answers = responsesRepository.getQuestionAndAnswersForSurvey(surveyId);
        if (answers.size() > 0) {
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(400, "No answers/questions for this survey "), HttpStatus.NOT_FOUND);
        }
    }


    /* For Stats */

    /**
     * Get all the responses for a question
     *
     * @param qid
     * @return
     */
    @GetMapping(value = "/responses/{qid}", produces = "application/json")
    public ResponseEntity<?> getAllAnswersForQuestion(@PathVariable int qid) {
        List<String> answers = responsesRepository.getAnswersByQuestionId(qid);
        if (answers.size() > 0) {
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(404, "No answers found for this question"), HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/responses/{surveyId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> completeSurvey(@PathVariable("surveyId") String surveyId,
                                            @RequestParam(value = "email", required = false) String userEmail) {

        Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();

        if (survey == null) {
            return new ResponseEntity<>(new BadRequest(404, "Survey with id " + surveyId + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            SurveyLinks surveyLinks = surveyLinksRepository.getSurveyLinksBySurveyAndUserEmail(survey, userEmail);
//                if(survey.getSurveyType() != 0 && surveyLinks != null) {
            if (surveyLinks != null) {

                //mark all the links invalid
                surveyLinks.setActivated(false);
                surveyLinks.setCompleted(true);
                surveyLinksRepository.save(surveyLinks);
                return new ResponseEntity<>(new BadRequest(200, "Survey is completed successfully"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new BadRequest(200, "Survey is completed successfully"), HttpStatus.OK);
            }

        }


    }


}



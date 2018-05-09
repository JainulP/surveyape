package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.*;
import com.sjsu.cmpe275.surveyape.repository.*;
import com.sjsu.cmpe275.surveyape.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    private EmailService emailService;

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
    public ResponseEntity<?> addResponses(@RequestParam String answers, @RequestParam(name = "qid") int questionId, @RequestParam(name = "email", required = false) String email, @RequestParam(name = "userid", required = false) String userId, @RequestParam(name = "surveyid") String surveyid) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            if (userId != "" && !userId.isEmpty() && !userId.equals("null")) {
                Optional<User> userOptional = userRepository.findById(Integer.parseInt(userId));
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    Responses responses = new Responses(question, answers, user, user.getEmail(), surveyid);
                    Responses responsestmp = responsesRepository.save(responses);
                    return new ResponseEntity<>(responsestmp, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new BadRequest(404, "Invalid user"), HttpStatus.BAD_REQUEST);
                }
            } else {
                Responses responses = new Responses();
                if (email == null || email.equals("null") || email.isEmpty()) {
                    responses = responsesRepository.save(new Responses(question, answers, null, "Anonymous", surveyid));
                } else {
                    responses = responsesRepository.save(new Responses(question, answers, null, email, surveyid));
                }
                return new ResponseEntity<>(responses, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Invalid question"), HttpStatus.BAD_REQUEST);
        }


    }

    @PutMapping(value = "/response/{resId}", produces = "application/json")
    public ResponseEntity<?> updateResponses(@PathVariable int resId, @RequestParam String answers, @RequestParam(name = "qid") int questionId, @RequestParam(name = "email", required = false) String email, @RequestParam(name = "userid", required = false) String userId, @RequestParam(name = "surveyid") String surveyid) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            if (userId != "" && !userId.isEmpty() && !userId.equals("null")) {
                Optional<User> userOptional = userRepository.findById(Integer.parseInt(userId));
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    Optional<Responses> responsesOptional = responsesRepository.findById(resId);
                    if (responsesOptional.isPresent()) {
                        Responses response = responsesOptional.get();
                        response.setAnswers(answers);
                        responsesRepository.save(response);
                        return new ResponseEntity<>(response, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(new BadRequest(200, "Error in updating your response. Please try again later"), HttpStatus.OK);

                    }

                } else {
                    return new ResponseEntity<>(new BadRequest(404, "Invalid user"), HttpStatus.BAD_REQUEST);
                }
//            } else {
//                Optional<Responses> responsesOptional = responsesRepository.findById(resId);
//                if(responsesOptional.isPresent()){
//                    Responses response = responsesOptional.get();
//                    response.setAnswers(answers);
//                    responsesRepository.save(response);
//                    return new ResponseEntity<>(response, HttpStatus.OK);
//                }
//                else{
//                    return new ResponseEntity<>(new BadRequest(200, "Error in updating your response. Please try again later"), HttpStatus.OK);
//
//                }
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Invalid question"), HttpStatus.BAD_REQUEST);
        }


        return null;
    }

    /* For stats */

    /**
     * creates a map of answers & question
     *
     * @param surveyId
     * @return
     */

    @GetMapping(value = "/responses/questionstats", produces = "application/json", params = "surveyId")
    public ResponseEntity<?> getAnswersBySurveyAndQuestionId(@RequestParam(value = "surveyId") String surveyId) {
        List<Integer> questions = responsesRepository.getQuestionAndAnswersForSurvey(Integer.parseInt(surveyId));
        List<Map<String, String>> masterList = new ArrayList<>();

        List<String> optionsList = new ArrayList<>();
        if (questions.size() > 0) {
            for (Integer question : questions) {
                Map<String, String> optionsCountMap = new HashMap<>();
                String questionStr = questionRepository.getQuestionNameByQuestionId(question);
                int questionType = responsesRepository.getQuestionTypeForQuestion(question);

                optionsCountMap.put("Question", questionStr);

                //QuestionStyle - 0 for multiple choice, 1 for yes/no question, 2 for    short answer question, 3 for datetime question, 4 for star rating question
                // VisualStyle - // 0 for dropdown , 1 for radio button, 2 for checkbox

                // only yes/no or multiple choice with radiobutton  or multiple choice with dropdown

                if (questionType == 1 || questionType == 4) {
                    List<String> options = responsesRepository.getOptionsForQuestion(question);
                    for (String option : options) {
                        int count = responsesRepository.getCountOfAnswerChoices(question, option);
                        //create the map
                        optionsCountMap.put(option, String.valueOf(count));
                    }
                } else if (questionType == 0) {  // for multiple choice
                    int visualType = responsesRepository.getVisualTypeForQuestion(question);
                    if (visualType == 1 || visualType == 0) {  // for radio button/dropdown
                        List<String> options = responsesRepository.getOptionsForQuestion(question);
                        for (String option : options) {
                            int count = responsesRepository.getCountOfAnswerChoices(question, option);
                            //create the map
                            optionsCountMap.put(option, String.valueOf(count));
                        }
                    } else if (visualType == 2) {   // for checkbox

                        // Multiple choice questions with checkboxes

                        // get all the answers
                        List<String> answers = responsesRepository.getAnswersByQuestionId(question);

                        // separate the choices by comma and add it to master list
                        for (String answer : answers) {
                            String[] splitOptions = answer.split(",");
                            optionsList.addAll(Arrays.asList(splitOptions));
                        }

                        // filter out duplicate elements
                        Set<String> uniqueOptions = new HashSet<>(optionsList);

                        // create the map
                        for (String option : uniqueOptions) {
                            int count = Collections.frequency(optionsList, option);
                            optionsCountMap.put(option, String.valueOf(count));
                        }
                    }
                }
                masterList.add(optionsCountMap);
            }
            return new ResponseEntity<>(masterList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(404, "No Stats available"), HttpStatus.NOT_FOUND);
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
            if(survey.getSurveyType() != 0) {
                SurveyLinks surveyLinks = surveyLinksRepository.getSurveyLinksBySurveyAndUserEmail(survey, userEmail);
//                if(survey.getSurveyType() != 0 && surveyLinks != null) {
                if (surveyLinks != null) {
                    //mark all the links invalid
                    surveyLinks.setActivated(false);
                    surveyLinks.setCompleted(true);
                    surveyLinksRepository.save(surveyLinks);
                    if(userEmail.isEmpty() || userEmail == null){
                        return new ResponseEntity<>(new BadRequest(400, "Can not send confirmation as emil id is not found"), HttpStatus.NOT_FOUND);
                    }
                    else{
                        emailService.sendConfirmationForCompletion(userEmail,"Survey Confirmation","Thank you for submitting this survey. Your response has been successfully recorded.");
                    }
                }

            }
            else if(survey.getSurveyType() == 0){
                if(!userEmail.isEmpty() &&  userEmail != null){
                    emailService.sendConfirmationForCompletion(userEmail,"Survey Confirmation","Thank you for submitting this survey. Your response has been successfully recorded.");
                }
            }
            return new ResponseEntity<>(new BadRequest(200, "Survey is completed successfully"), HttpStatus.OK);
        }



    }






}



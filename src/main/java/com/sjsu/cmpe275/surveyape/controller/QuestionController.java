package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.Question;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.repository.QuestionRepository;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/question")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SurveyRepository surveyRepository;


    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createQuestion(@RequestParam(value = "questionStr") String questionStr,
                                            @RequestParam(value = "answerType", required = false) String answerType,
                                            @RequestParam(value = "choiceType", required = false) String choiceType,
                                            @RequestParam(value = "questionType") String questionType,
                                            @RequestParam(value = "options", required = false) List<String> options,
                                            @RequestParam(value = "visual", required = false) String visual,
                                            @RequestParam(value = "surveyId") String surveyId) {


        Optional<Survey> surveyOptional = surveyRepository.findById(Integer.parseInt(surveyId));

        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            if (questionType.equals("0") || Integer.parseInt(questionType) == 0) {
                Question question = questionRepository.save(new Question(questionStr, answerType, choiceType, Integer.parseInt(questionType), options, visual, survey));
                return new ResponseEntity<>(question, HttpStatus.OK);
            } else {
                Question question = questionRepository.save(new Question(questionStr, Integer.parseInt(questionType), survey));
                return new ResponseEntity<>(question, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(404, "Survey ID not available"), HttpStatus.NOT_FOUND);
        }


    }

    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateQuestion(@RequestParam(value = "questionId") String questionId,
                                            @RequestParam(value = "questionStr", required = false) String questionStr,
                                            @RequestParam(value = "answerType", required = false) String answerType,
                                            @RequestParam(value = "choiceType", required = false) String choiceType,
                                            @RequestParam(value = "questionType") String questionType,
                                            @RequestParam(value = "options", required = false) List<String> options,
                                            @RequestParam(value = "visual", required = false) String visual,
                                            @RequestParam(value = "surveyId") String surveyId) {


        Optional<Question> queOptional = questionRepository.findById(Integer.parseInt(questionId));
        if (queOptional.isPresent()) {
            Question question = queOptional.get();
            // Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
            if (question.getQuestionType() == 0) {
                if (questionStr != null) {
                    question.setQuestionStr(questionStr);
                }
                if (answerType != null) {
                    question.setAnswerType(answerType);
                }
                if (choiceType != null) {
                    question.setChoiceType(choiceType);
                }
                if (questionType != null) {
                    question.setQuestionType(Integer.parseInt(questionType));
                }
                if (options != null) {
                    question.setOptions(options);
                }
                if (visual != null) {
                    question.setVisualStyle(visual);
                }
                Question updatedQuestion = questionRepository.save(question);
                return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
            } else {
                if (questionStr != null) {
                    question.setQuestionStr(questionStr);
                }
                if (questionType != null) {
                    question.setQuestionType(Integer.parseInt(questionType));
                }
                Question updatedQuestion = questionRepository.save(question);
                return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(404, "Question with id " + questionId + " does not exist"), HttpStatus.NOT_FOUND);

        }


    }


    @RequestMapping(value = "/{questionId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getQuestionJson(@PathVariable("questionId") String questionId) {

        return getQuestion(questionId);

    }


    private ResponseEntity<?> getQuestion(String id) {

        Optional<Question> questionOptional = questionRepository.findById(Integer.parseInt(id));
        if (!questionOptional.isPresent()) {
            return new ResponseEntity<>(new BadRequest(404, "Sorry, the requested question with id " + id + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            Question question = questionOptional.get();
            return new ResponseEntity<>(question, HttpStatus.OK);

        }
    }


    @RequestMapping(value = "/{questionId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteQuestion(@PathVariable("questionId") String questionId) {

        Optional<Question> questionOptional = questionRepository.findById(Integer.parseInt(questionId));
        if (!questionOptional.isPresent()) {
            return new ResponseEntity<>(new BadRequest(404, "Question with id " + questionId + " does not exist"), HttpStatus.NOT_FOUND);
        } else {
            // write to db
            Question question = questionOptional.get();
            questionRepository.delete(question);
            return new ResponseEntity<>(new BadRequest(200, "Question with id " + questionId + " is deleted successfully"), HttpStatus.OK);
        }
    }
}



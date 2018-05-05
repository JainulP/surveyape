package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.BadRequestController;
import com.sjsu.cmpe275.surveyape.model.Question;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.repository.QuestionRepository;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/question")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SurveyRepository surveyRepository;


    @RequestMapping(method= RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createQuestion(@RequestParam(value="questionStr") String questionStr,
                                             @RequestParam(value="answerType") String answerType,
                                             @RequestParam(value="choiceType") String choiceType,
                                             @RequestParam(value="questionType") String questionType,
                                             @RequestParam(value = "options") List<String> options,
                                             @RequestParam(value = "surveyId") String surveyId){

            Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();

            Question question = questionRepository.save(new Question(questionStr, answerType, choiceType, Integer.parseInt(questionType), options, survey));

            return new ResponseEntity<>(question, HttpStatus.OK);

    }

    @RequestMapping(method= RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateQuestion(@RequestParam(value="questionId") String questionId,
                                            @RequestParam(value="questionStr", required = false) String questionStr,
                                            @RequestParam(value="answerType",required = false) String answerType,
                                            @RequestParam(value="choiceType",required = false) String choiceType,
                                            @RequestParam(value="questionType",required = false) String questionType,
                                            @RequestParam(value = "options",required = false) List<String> options,
                                            @RequestParam(value = "surveyId") String surveyId) {


        Question question = questionRepository.findById(Integer.parseInt(questionId)).get();
        if (question != null) {
            Survey survey = surveyRepository.findById(Integer.parseInt(surveyId)).get();
            if(questionStr != null){
                question.setQuestionStr(questionStr);
            }
            if(answerType != null){
                question.setAnswerType(answerType);
            }
            if(choiceType != null){
                question.setChoiceType(choiceType);
            }
            if(questionType != null){
                question.setQuestionType(Integer.parseInt(questionType));
            }
            if(options != null){
                question.setOptions(options);
            }
            Question updatedQuestion = questionRepository.save(question);

            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(new BadRequestController(new BadRequest(404, "Question with id " + questionId + " does not exist")),HttpStatus.NOT_FOUND);

        }


    }




    @RequestMapping(value = "/{questionId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getQuestionJson(@PathVariable("questionId") String questionId) {

        return getQuestion(questionId);

    }


    private ResponseEntity<?> getQuestion(String id) {

        Question question = questionRepository.findById(Integer.parseInt(id)).get();

        if (question == null) {
            return new ResponseEntity<>( new BadRequestController(new BadRequest(404, "Sorry, the requested question with id " +
                    id + " does not exist"))
                    , HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(question, HttpStatus.OK);

        }
    }



    @RequestMapping(value = "/{questionId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteQuestion(@PathVariable("questionId") String questionId) {

        Question question = questionRepository.findById(Integer.parseInt(questionId)).get();
        if (question == null) {
           return new ResponseEntity<>(new BadRequestController(new BadRequest(404, "Question with id " + questionId + " does not exist")),HttpStatus.NOT_FOUND);
        } else {
            // write to db
            questionRepository.delete(question);
            return new ResponseEntity<>(new BadRequestController( new BadRequest(200,"Question with id " + questionId +
                    " is deleted successfully")), HttpStatus.OK);
        }
    }
}



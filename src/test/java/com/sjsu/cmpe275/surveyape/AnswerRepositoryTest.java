/*package com.sjsu.cmpe275.surveyape;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.sjsu.cmpe275.surveyape.repository.AnswerRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SurveyapeApplication.class)
@AutoConfigureMockMvc
@Transactional
public class AnswerRepositoryTest {
	

	    @Autowired
	    private AnswerRepository answerRepo;

	    @Test
	    @DirtiesContext
	    public void answerBySurveyIdTest() {
	        	    answerRepo.findBySurveyId(surveyId);
	    }
	    
}
*/
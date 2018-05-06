package com.sjsu.cmpe275.surveyape;

import com.sjsu.cmpe275.surveyape.repository.ResponsesRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SurveyapeApplication.class)
@Transactional
public class ResponseRepositoryTest {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ResponsesRepository responseRepo;

    @Test
    public void getAnswersByQuestionIdTest() {
        List<String> answers = responseRepo.getAnswersByQuestionId(3);
        logger.info("getAnswersByQuestionId ----> {}",answers);
    }

}

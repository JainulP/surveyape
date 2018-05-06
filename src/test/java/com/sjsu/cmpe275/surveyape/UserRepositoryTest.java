package com.sjsu.cmpe275.surveyape;


import com.sjsu.cmpe275.surveyape.model.User;
import com.sjsu.cmpe275.surveyape.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SurveyapeApplication.class)
@Transactional
public class UserRepositoryTest {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByEmailTest() {
        Optional<User> userOptional = userRepository.findById(1);
        userOptional.ifPresent(user -> assertEquals("scottsummers@gmail.com", user.getEmail()));
    }

    @Test
    public void findUserByEmailAndPasswordTest() {

        Optional<User> userOptional = userRepository.findByEmailAndPassword("scottsummers@gmail.com","amVhbmdyZXkxMjM=");
        if(userOptional.isPresent()){
            logger.info("user {} {}",userOptional.get().getEmail(),userOptional.get().getPassword());
        } else{
            logger.info("not found");
        }
        //userOptional.ifPresent(user -> logger.debug("Scott"+user.getEmail()+user.getPassword()));
    }

}

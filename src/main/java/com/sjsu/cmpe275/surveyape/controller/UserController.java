package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.Survey;
import com.sjsu.cmpe275.surveyape.model.User;
import com.sjsu.cmpe275.surveyape.repository.SurveyRepository;
import com.sjsu.cmpe275.surveyape.repository.UserRepository;
import com.sjsu.cmpe275.surveyape.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionAttributeStore;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpSession;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
public class UserController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private UserRepository userRepository;
    private EmailService emailService;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserController(UserRepository uRepo, EmailService eService) {
        userRepository = uRepo;
        emailService = eService;
    }

    @PostMapping(value = "/register", produces = "application/json")
    private ResponseEntity<?> registerUser(@RequestParam(value = "username") String username,
                                           @RequestParam(value = "password") String password,
                                           @RequestParam(value = "email") String email,
                                           @RequestParam(value = "age") String age) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            // String userId = UUID.nameUUIDFromBytes(email.getBytes()).toString();
            String encodedPassword = Base64.getEncoder().encodeToString(password.getBytes());
            String activationCode = String.valueOf(new Random(System.nanoTime()).nextInt(100000));
            User user = new User(username, encodedPassword, email, age, false, activationCode);
            String encodedEmail = Base64.getEncoder().encodeToString(email.getBytes());

            // sending verification email
            userRepository.save(user);
            String text = "Please click on the below link to activate and your verification code is " + activationCode + "\n" + "http://127.0.0.1:8080/activate/" + encodedEmail +"/?vCode="+ activationCode;
            emailService.sendInvitationForUser(email, "Verification email for surveyApe", text);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Email already registered"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/activate/{email}", produces = "application/json")
    private ResponseEntity<?> activateUser(@PathVariable("email") String email, @RequestParam(value = "vCode", required = false) String activationCode) {
        String decodedEmail = new String(Base64.getDecoder().decode(email.getBytes()));
        Optional<User> userOptional = userRepository.findByEmail(decodedEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getVerificationCode().equals(activationCode)) {
                logger.info("Activation code", activationCode);
                user.setActivated(true);
                userRepository.save(user);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new BadRequest(400, "Wrong verification code"), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Illegal access - Permission denied"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> userLogin(@RequestParam("email") String email, @RequestParam("password") String password,HttpSession session) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            logger.info("String password {} ----- {}", new String(Base64.getDecoder().decode(user.getPassword().getBytes())), password);
            if (password.equalsIgnoreCase(new String(Base64.getDecoder().decode(user.getPassword().getBytes())))) {
                if (user.isActivated()) {
                    session.setAttribute("username", user.getUsername());
                    return new ResponseEntity<>(user, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new BadRequest(404, "Please activate your account"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new BadRequest(404, "False Invalid Credentials"), HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(404, "User not found"), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(value = "/logout", produces = "application/json")
    public ResponseEntity<?> userLogout(WebRequest request, SessionAttributeStore store, SessionStatus status,HttpSession session) {
        store.cleanupAttribute(request,"username");
        return new ResponseEntity<>(new BadRequest(200,"You have have been logged out successfully"),HttpStatus.OK);

    }

    @RequestMapping(value = "/created/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCreatedSurveyByOwner(@PathVariable("userId")String userId){
        List<Survey> surveys = surveyRepository.getCreatedSurveyByOwner(Integer.parseInt(userId));
        if(surveys.size()>0){
            return new ResponseEntity<>(surveys,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new BadRequest(400,"No surveys found Created by you"),HttpStatus.NOT_FOUND);
        }
    }

}

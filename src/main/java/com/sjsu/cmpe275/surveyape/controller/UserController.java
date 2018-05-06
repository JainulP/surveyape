package com.sjsu.cmpe275.surveyape.controller;

import com.sjsu.cmpe275.surveyape.model.BadRequest;
import com.sjsu.cmpe275.surveyape.model.User;
import com.sjsu.cmpe275.surveyape.repository.UserRepository;
import com.sjsu.cmpe275.surveyape.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "/register", produces = "application/json")
    private ResponseEntity<?> registerUser(@RequestParam(value = "username") String username,
                                           @RequestParam(value = "password") String password,
                                           @RequestParam(value = "email") String email,
                                           @RequestParam(value = "age") String age) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            String userId = UUID.nameUUIDFromBytes(email.getBytes()).toString();
            String encodedPassword = Base64.getEncoder().encodeToString(password.getBytes());
            String activationCode = String.valueOf(new Random(System.nanoTime()).nextInt(100000));
            User user = new User(userId, username, encodedPassword, email, age, false, activationCode);

            // sending verification email
            String text = "Please click on the below link to activate and your verification code is " + activationCode + "\n" + "http://127.0.0.1/activate/" + userId;
            emailService.sendInvitationForUser(email,"Verification email for surveyApe", text);
            userRepository.save(user);

            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Email already registered"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/activate/{userId}", produces = "application/json")
    private ResponseEntity<?> activateUser(@PathVariable("userId") String userID, @RequestParam(value = "vCode") String activationCode) {
        Optional<User> userOptional = userRepository.findById(userID);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getVerificationCode().equals(activationCode)) {
                User updatedUser = new User(user.getUserId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getAge(), true, activationCode);
                userRepository.save(updatedUser);
                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new BadRequest(400, "Wrong verification code"), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new BadRequest(400, "Illegal access - Permission denied"), HttpStatus.BAD_REQUEST);
        }
    }


}

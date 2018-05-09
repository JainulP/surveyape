package com.sjsu.cmpe275.surveyape.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class EmailService {

    @Autowired
    public JavaMailSender emailSender;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public void sendInvitationForUser(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }

    public String sendUniqueInvitationForGeneralSurveyUsers(List<String> emails, String text, String surveyId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Invitation to the survey");
            String url = "127.0.0.1:3000/survey/"+surveyId;
            for (String email : emails) {
                message.setText(url);
                message.setTo(email);
                emailSender.send(message);
            }
            return url;
        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        }
        return null;
    }


    public List<String> sendUniqueInvitationForClosedSurveyUsers(List<String> emails, String text, String surveyId) {
        List<String> urls = new ArrayList<>();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Invitation to the survey");
            for (String email : emails) {
                String url = "127.0.0.1:3000/survey/"+surveyId+"/"+ Base64.getEncoder().encodeToString(email.getBytes());

                message.setText(url);
                message.setTo(email);
                emailSender.send(message);
                urls.add(url);
            }
        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        }
        return urls;
    }

    public List<String> sendUniqueInvitationForOpenUniqueSurveyUsers(String email, String text,String surveyId) {
        List<String> urls = new ArrayList<>();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Invitation to the survey");

                String url = "127.0.0.1:3000/survey/"+surveyId+"/open/"+ Base64.getEncoder().encodeToString(email.getBytes());
                message.setText(url);
                message.setTo(email);
                emailSender.send(message);
                urls.add(url);

        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        }
        return urls;
    }

    public void sendConfirmationForCompletion(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }


    public void sendInvitationViaQRCode(String to, String from, String subject) throws MessagingException {

        try {
            MimeMessage message = emailSender.createMimeMessage();

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);


            //helper.addAttachment("qrcode.png", new ClassPathResource("QRCodes/image.png"));


            //helper.addInline("Image",new File("QRCodes/image.png"));
           // helper.setText(inlineImage, true);
            helper.setSubject(subject);
            helper.setTo(to);
            helper.setFrom(from);
            helper.setText("<html>"
                    + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                    + "</html>", true);
            helper.addInline("image",new File("image.png"));
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }


}

package com.sjsu.cmpe275.surveyape.service;

import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    public JavaMailSender emailSender;


    @Autowired
    public QRCodeService qrCodeService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public void sendInvitationForUser(String to, String subject, String text) {
        sendSimpleMessage(to, subject, text);
    }

    public String sendUniqueInvitationForGeneralSurveyUsers(List<String> emails, String surveyId) {
        try {
            //  SimpleMailMessage message = new SimpleMailMessage();
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setSubject("Invitation to the survey");
            String url = "http://127.0.0.1:3000/" + surveyId;
            create_QR(url);
            for (String email : emails) {
                //message.setText(url);
                helper.setTo(email);
                helper.setText("<html>"
                        + "<body>"
                        + "<div>" + "Please use this url to take the survey " + url + "</div>"
                        + "<div>or use the QRCode to take the survey</div>"
                        + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                        + "</body>"
                        + "</html>", true);
                helper.addInline("image", new File("src/main/resources/QRCodes/image.png"));
                emailSender.send(mimeMessage);
            }
            return url;
        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        } catch (MessagingException exception) {
            logger.debug("unable to send unique Invitation for general survey users");
        }
        return null;
    }


    public List<String> sendUniqueInvitationForClosedSurveyUsers(List<String> emails, String surveyId) {
        List<String> urls = new ArrayList<>();
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setSubject("Invitation to the survey");
            for (String email : emails) {
                String url = "http://127.0.0.1:3000/" + surveyId + "/" + Base64.getEncoder().encodeToString(email.getBytes());
                helper.setTo(email);
                helper.setText("<html>"
                        + "<body>"
                        + "<div>" + "Please use this url to take the survey " + url + "</div>"
                        + "<div>or use the QRCode to take the survey</div>"
                        + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                        + "</body>"
                        + "</html>", true);
                helper.addInline("image", new File("src/main/resources/QRCodes/image.png"));
                emailSender.send(mimeMessage);
                urls.add(url);
            }
        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        } catch (MessagingException exception) {
            logger.debug("Unable to send mail for closed survey users");
        }
        return urls;
    }


    public List<String> sendUniqueInvitationForOpenUniqueSurveyUsers(String email, String surveyId) {
        List<String> urls = new ArrayList<>();
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setSubject("Invitation to the survey");

            String url = "http://127.0.0.1:3000/survey/" + surveyId + "/open/" + Base64.getEncoder().encodeToString(email.getBytes());
            helper.setTo(email);
            helper.setText("<html>"
                    + "<body>"
                    + "<div>" + "Please use this url to take the survey " + url + "</div>"
                    + "<div>or use the QRCode to take the survey</div>"
                    + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                    + "</body>"
                    + "</html>", true);
            helper.addInline("image", new File("src/main/resources/QRCodes/image.png"));
            emailSender.send(mimeMessage);
            urls.add(url);

        } catch (MailException exception) {
            logger.debug("Unable to send uniqueMessage for users");
            exception.printStackTrace();
        } catch (MessagingException exception) {
            logger.debug("unable to send mail to open unique survey users");
        }
        return urls;
    }

    public void sendConfirmationForCompletion(String to, String subject, String text) {
        sendSimpleMessage(to, subject, text);
    }


    public void create_QR(String content) {
        ByteArrayOutputStream out = QRCode.from(content).to(ImageType.PNG).stream();
        try {
            FileOutputStream fOut = new FileOutputStream(new File("src/main/resources/QRCodes/image.png"));
            fOut.write(out.toByteArray());
            fOut.flush();
            fOut.close();
        } catch (Exception e) {
            logger.debug("Creating QRCode failed");
        }
    }

    private void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
        } catch (MailException exception) {
            logger.debug("Unable to send simple message");
        }
    }

   /* public void sendInvitationViaQRCode(String to, String from, String subject) throws MessagingException {

        try {
            MimeMessage message = emailSender.createMimeMessage();

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);


            //helper.addAttachment("qrcode.png", new ClassPathResource("QRCodes/image.png"));


            //helper.addInline("Image",new File("QRCodes/image.png"));
            // helper.setText(inlineImage, true);
            helper.setSubject("Invitation via QR code");
            helper.setTo(to);
            helper.setFrom(from);
            helper.setText("<html>"
                    + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                    + "</html>", true);
            helper.addInline("image", new File("image.png"));
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }*/

    /*public void sendInvitationViaQRCodeForMultipleUsers(String encodedLink, List<String> emails) throws MessagingException {

        try {


            MimeMessage message = emailSender.createMimeMessage();

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            qrCodeService.generateQRCodeImage(encodedLink, 60, 60, "/Users/havok/Desktop/Ideaprojects/SpringProjects/surveyape/src/main/resources/QRCodes/work.png");
            for (String email : emails) {
                helper.setSubject("Invitation via QRcode");
                helper.setTo(email);
                helper.setFrom("surveyape135@gmail.com");
                helper.setText("<html>"
                        + "<img src='cid:image' style='float:left;width:200px;height:200px;'/>"
                        + "</html>", true);
                helper.addInline("image", new File("image.png"));
                emailSender.send(message);
            }
            //helper.addAttachment("qrcode.png", new ClassPathResource("QRCodes/image.png"));


            //helper.addInline("Image",new File("QRCodes/image.png"));
            // helper.setText(inlineImage, true);

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (WriterException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
*/


}






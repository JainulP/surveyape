package com.sjsu.cmpe275.surveyape.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.PrintWriter;

import static com.sjsu.cmpe275.surveyape.utils.JsonReader.readJsonFromUrl;


@RestController
public class ExportJsonController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/export")
    public void exportJson(@RequestParam String surveyId) {
        try {
            JSONObject json = readJsonFromUrl("http://127.0.0.1:8080/survey/" + surveyId); //https://jsonplaceholder.typicode.com/posts/1
            System.out.println(json.toString());
            PrintWriter out = new PrintWriter("survey" + surveyId + ".txt");
            out.println(json.toString());
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("Unable to export json due to IOException");
        } catch (JSONException e) {
            logger.error("Unable to export json due to JSONException");
        }

    }
}

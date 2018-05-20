package com.sjsu.cmpe275.surveyape.utils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;

public class JsonReader {

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        URL urlLoc = new URL(url);
        URLConnection urlConnection = urlLoc.openConnection();
        BufferedReader rd = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
        String jsonText = readAll(rd);
        JSONObject json = new JSONObject(jsonText);
        return json;

    }

}

package com.sjsu.cmpe275.surveyape.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;

@Controller
public class TestController {
    @GetMapping(value = "/")
    public String sayHello(Model model) {
        model.addAttribute("date",new Date());
        return "index";
    }
}

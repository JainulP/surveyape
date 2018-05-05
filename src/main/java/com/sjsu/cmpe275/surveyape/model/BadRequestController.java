package com.sjsu.cmpe275.surveyape.model;

public class BadRequestController {
    private BadRequest BadRequestMsg;

    public BadRequestController(BadRequest BadRequest) {
        BadRequestMsg = BadRequest;
    }

    public BadRequest getBadRequest() {
        return BadRequestMsg;
    }

    public void setBadRequest(BadRequest BadRequest) {
        BadRequestMsg = BadRequest;
    }
}

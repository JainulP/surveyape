package com.sjsu.cmpe275.surveyape.model;

import java.io.Serializable;
import java.util.Date;


public class StatsDto implements Serializable {
    private Date startDate;
    private Date endDate;
    private int participants;
    private int partipationrate;

    public StatsDto() {

    }

    public StatsDto(Date startDate, Date endDate, int participants, int partipationrate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.participants = participants;
        this.partipationrate = partipationrate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public int getPartipationrate() {
        return partipationrate;
    }

    public void setPartipationrate(int partipationrate) {
        this.partipationrate = partipationrate;
    }
}

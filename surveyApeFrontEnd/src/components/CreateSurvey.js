import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import Calendar from 'react-calendar';
import Question from './Question';

class CreateSurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            surveyId: null,
            participants : '',
            participantsAdded : '',
            date: new Date(),
            questions:[],
            createSurveyResponse:null,
            surveyData:{
                surveyName:null,
                endTime:null,
                userId:null,
                surveyType:null
            },
            questionData:{
                questionStr:null,
                answerType:null,
                choiceType:null,
                questionType:null,
                options:null,
                surveyId:null,
                visualStyle:null,
                questionId:null
            }
        }
    }
    componentDidMount(){

    }
    onChange = date => {
        this.setState({
            date : date
        });
    }

    addQuestion = () =>{
        var self = this.state;
        var questions = this.state.questions;
        questions.push(this.state.questionData)
        self.questions = questions;
        this.setState(self)
    }

    addParticipants = () =>{
        var data = {
            surveyId :this.state.createSurveyResponse.surveyId,
            participants : this.state.participants
        }
        var self = this.state;
        API.addParticipants(data)
            .then((res) => {
                console.log(res)
                self.participantsAdded = self.participantsAdded +","+ self.participants;
                self.participants = '';
                this.setState(self);
            });
    }
    createBasicSurvey = () =>{
        // date format required yyyy-MM-dd-HH
        var data = this.state;
        data.surveyData.endTime = data.date.getYear() + "-" + data.date.getMonth() + "-" +
                                     data.date.getDate() + "-" + data.date.getHours();
        this.setState(data);
        var self = this.state;
        API.createSurvey(this.state.surveyData)
            .then((res) => {
            self.questionData.surveyId = res.surveyId;
               self.createSurveyResponse = res;
               this.setState(self);
                alert("Survey successfully created! Pleas add questions to the survey!")
            });
    }
    publishSurvey = () =>{
        if(this.state.questions.length > 0){
            API.publishSurvey(this.state.createSurveyResponse.surveyId)
                .then((res) => {
                    console.log(res)
                    if(res.code==400){
                        alert("Please add questions to this survey before publishing!")
                    }
                    else{
                        window.location = "http://localhost:3000/"
                    }

                });
        }
        else{

        }
    }
    renderSurveyTypeSwitch(param) {
        switch(param) {
            case 0:
                return 'General';
            case 1:
                return 'Closed invitation-only';
            case 2:
                return 'Open unique';
            default:
                return '';
        }
    }
    render() {
        var questionList = [];
        var data = this.state.questions;
        if(data && data.length > 0){
            data.map(function (temp, index) {
                questionList.push(
                    <Question data = {temp} number = {index}/>
                );
            },this);
        }
        return (
<div>
        {
            (this.state.questionData.surveyId === null)?
                <div className="row">
                    <div className="col-md-6 margin-70">
                        <form>
                            <div className="form-group resizedTextbox">
                                <span> <span>* </span>Survey Name : </span>
                                <input type="text" className="form-control surveyape-input" id="surveyName" aria-describedby="Survey Name" placeholder="Survey Name"
                                       onChange={(event) => {
                                           var surveyDataTemp = this.state.surveyData;
                                           surveyDataTemp.surveyName = event.target.value;
                                           this.setState({
                                               surveyData: surveyDataTemp
                                           });
                                       }}
                                />
                            </div>

                            <div className="form-group resizedTextbox">
                                <span>Survey End Time: </span>
                                <span>{this.state.date.toString()}</span>
                                <Calendar id="surveyEndTime" aria-describedby="Survey End Time" placeholder="Survey End Time"
                                          onChange={this.onChange}
                                          value={this.state.data}
                                />

                            </div>
                            <span> <span>* </span>Survey Type : </span>
                            <div className="form-group resizedTextbox">
                                <select className="form-control surveyape-input" name="cards"  id="surveyType" aria-describedby="Survey Type" placeholder="Survey Type"
                                        onChange={(event) => {
                                            var surveyDataTemp = this.state.surveyData;
                                            surveyDataTemp.surveyType = event.target.value;
                                            this.setState({
                                                surveyData: surveyDataTemp
                                            });
                                        }}
                                >
                                    <option value=""></option>
                                    <option value="0">General</option>
                                    <option value="1">Closed invitation-only</option>
                                    <option value="2">Open unique</option>
                                </select>
                            </div>
                        </form>
                        <button type="button" className="surveyape-button" id = "saveUsrInfo" onClick={()=>this.createBasicSurvey()}>CREATE SURVEY</button>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
                :
                <div>
                    <div className="row">
                        <div className="col-md-10 margin-70">
                            <div>SURVEY DETAILS</div>
                            <div>
                                <span>Name: </span>
                                <span>{this.state.createSurveyResponse.surveyName}</span>
                            </div>
                            <div>
                                <span>End Time: </span>
                                <span>{this.state.createSurveyResponse.endTime}</span>
                            </div>
                            <div>
                                <span>Type: </span>
                                <span>
                                    {this.renderSurveyTypeSwitch(this.state.createSurveyResponse.surveyType)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 margin-70">
                            <span>
                                QUESTIONS
                            </span>
                            <div>
                                <button type="button" className="surveyape-button" id = "addQuestion" onClick={()=>this.addQuestion()}>ADD QUESTION</button>
                            </div>
                            <div>
                                {questionList}
                            </div>
                        </div>
                    </div>
                    {
                        (this.state.createSurveyResponse.surveyType === 1 || this.state.createSurveyResponse.surveyType === 0)?
                    <div className="row">
                        <div className="col-md-10 margin-70">
                            <span>
                                PARTICIPANTS
                            </span>
                            <div>
                                <input type="text" className="form-control surveyape-input" id="Participants" aria-describedby="Participants" placeholder="Participants"
                                       onChange={(event) => {
                                           this.setState({
                                               participants: event.target.value
                                           });
                                       }}
                                       value={this.state.participants}
                                />
                                <button type="button" className="surveyape-button" id = "addParticipants" onClick={()=>this.addParticipants()}>ADD PARTICIPANTS</button>
                           <div>
                               <span>
                                   Participants :
                               </span>
                               {
                                   (this.state.participantsAdded)
                                       ? this.state.participantsAdded.split(",").map(email => <p> {email} </p>)
                                       : ""
                               }
                           </div>
                            </div>
                        </div>
                    </div>
                        :null
                    }
<div className="row margin-70">
    <button type="button" className="surveyape-button" id = "publishSurvey" onClick={()=>this.publishSurvey()}>PUBLISH</button>
</div>
                </div>
             }
</div>

        );
    }
}

function mapStateToProps(state) {
    return {
        surveyData: state.all.componentActive
    }
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({GetComponent: GetComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSurvey));

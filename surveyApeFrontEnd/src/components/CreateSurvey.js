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
import  Moment from 'react-moment'

class CreateSurvey extends Component {
    constructor(props){
        super(props);
        var date = new Date();
        var today = date.getFullYear() +
            '-' + ((date.getMonth() + 1 >= 10)?(date.getMonth() + 1):("0"+(date.getMonth() + 1 )))+
            '-' + ((date.getDate() >= 10)?date.getDate():("0" + date.getDate())) +
            'T' + ((date.getHours()<10)?("0"+date.getHours()):date.getHours())+
            ':' + (date.getMinutes());
        this.state = {
            surveyId: null,
            participants : '',
            participantsAdded : '',
            date: new Date(),
            questions:[],
            createSurveyResponse:null,
            surveyData:{
                surveyName:null,
                endTime:today,
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
        // document.getElementById("surveyEndTime").setAttribute("min", new Date());

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
        var dateTemp = null;
        dateTemp=this.state.surveyData.endTime;
        dateTemp = dateTemp.substr(0,dateTemp.indexOf(":"));
        var s =dateTemp.indexOf("T");
        dateTemp = dateTemp.substr(0,s) + "-" + dateTemp.substr(s+1);
        data.surveyData.endTime = dateTemp;
        this.setState(data);
        var self = this.state;
        API.createSurvey(this.state.surveyData)
            .then((res) => {
            if(res.code == 400){
                alert(res.msg)
                window.location = "http://54.213.196.21:3000/"
            }
            else {
            self.questionData.surveyId = res.surveyId;
               self.createSurveyResponse = res;
               this.setState(self);
                alert("Survey successfully created! Please add questions to the survey!")
            }});
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
                        window.location = "http://54.213.196.21:3000/"
                    }

                });
        }
        else{
            alert("Please add questions to this survey before publishing!")
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
                <div className="row height-fixed">
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
                                <input id="surveyEndTime" type="datetime-local" name="partydate"  onChange={(event) => {
                                    var surveyDataTemp = this.state.surveyData;
                                    surveyDataTemp.endTime = event.target.value;
                                    this.setState({
                                        surveyData: surveyDataTemp
                                    });
                                }}
                                       defaultValue={this.state.surveyData.endTime}>
                                </input>
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
<div className="row margin-none">
    <button type="button" className="surveyape-button margin-70" id = "publishSurvey" onClick={()=>this.publishSurvey()}>PUBLISH</button>
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

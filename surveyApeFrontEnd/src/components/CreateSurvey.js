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
            date: new Date(),
            questions:[],
            createSurveyResponse:{surveyId: 15,
                surveyName: "hh",
                endTime: "0118-04-18T08:00:00.000+0000",
                owner: {
                    userId: 1,
                    email: "yediremanasa@gmail.com",
                    username: "manasa",
                    password: "MTIz",
                    age: "1",
                    verificationCode: "38187",
                    activated: true
                },
                published: false,
                questions: null,
                startTime: null,
                surveyId: 15,
                surveyName: "hh",
                surveyType: 2
            },
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
                visualStyle:null
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

    saveQuestion =(data) =>{
        API.createQuestion(data)
            .then((res) => {
                console.log(res)
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
    render() {
        var questionList = [];
        var data = this.state.questions;
        if(data && data.length > 0){
            data.map(function (temp, index) {
                questionList.push(
                    <Question data = {temp} number={index} saveQuestion={this.saveQuestion}/>
                );
            },this);
        }
        return (

<div>
        {
            (this.state.createSurveyResponse === null)?

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
                                    <option value="1">General</option>
                                    <option value="2">Closed invitation-only</option>
                                    <option value="3">Open unique</option>
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
                        <div className="col-md-6 margin-70">
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
                                <span>{this.state.createSurveyResponse.surveyType}</span>
                            </div>
                        </div>
                        <div className="col-md-6 margin-70">
                            <span>
                                QUESTIONS
                            </span>
                            <div>
                                {questionList}
                            </div>
                            <div>
                                <button type="button" className="surveyape-button" id = "saveUsrInfo" onClick={()=>this.addQuestion()}>ADD QUESTION</button>
                            </div>
                        </div>
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

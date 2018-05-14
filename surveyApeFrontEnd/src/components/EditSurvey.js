import React, { Component } from 'react';
import '../App.css';
import * as  API from '../api/API';
import Calendar from 'react-calendar';
import Question from './Question';

class EditSurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            listOfSurveys:[
                {
                    surveyId: 108,
                    surveyName: "survey_manasa"
                },
                {
                    surveyId: 82,
                    surveyName: "survey_manasa1"
                }
            ],
            surveyDetails:null,
            surveyId: "",
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

    componentWillMount(){
        var self = this.state;
        API.getListOfSurveyscreated(localStorage.getItem("userId"))
            .then((res) => {
                if (res && res.length > 0) {
                    self.listOfSurveys = res;
                    this.setState(self);
                }
            });
    }
    addQuestion = () =>{
        var self = this.state;
        var questions = this.state.questions;
        questions.push(this.state.questionData)
        self.questions = questions;
        this.setState(self)
    }

    editSurvey = () =>{
        //alert(this.state.surveyId)
        var data={
            surveyId : this.state.surveyId,
            email: localStorage.getItem("email")

        }
        var self = this.state;
        API.getSurveybYemail(data)
            .then((res) => {
                if(res && res.surveyId){
                    self.surveyDetails = res;
                    self.questions = res.questions;
                    this.setState(self);
                }
                else{
                    alert("Please try again")
                }
            });
    }
    onChange = date => {
        this.setState({
            date : date
        });
    }
    deleteSurvey = () =>{
        API.deleteSurvey(this.state.surveyId)
            .then((res) => {
                if(res){
                    alert("deleted")
                    window.location = "http://localhost:3000/";
                }
                else{
                    alert("Please try again")
                }
            });
    }
    publishSurvey = () =>{
        //if(this.state.questions.length > 0){
            API.publishSurvey(this.state.surveyId)
                .then((res) => {
                    if(res){
                        alert("published")
                        window.location = "http://localhost:3000/";
                    }
                    else{
                        alert("Please try again")
                    }
                });
        // }
        // else{
        //     alert("No questions added")
        // }
    }
    addParticipants = () =>{
        var data = {
            surveyId :this.state.surveyId,
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
        var data =  this.state.questions;
        if(data && data.length > 0){
            data.map(function (temp, index) {
                temp.surveyId = this.state.surveyId;
                questionList.push(
                    <Question data = {temp} number = {index}/>
                );
            },this);
        }
      var surveyList = [];
      var data = this.state.listOfSurveys;
      if(data && data.length > 0){
          data.map(function (temp, index) {
              surveyList.push(
                  <option value={temp.surveyId}>{temp.surveyName}</option>
              );
          },this);
      }
    return (
      <div className="height-fixed">
          <div className="row">
              <div className="col-md-6 margin-70">
                  <div className="form-group resizedTextbox">
                      <div>
                    <span>
                    Surveys
                    </span>
                      </div>
                      <select className="form-control surveyape-input" name="cards"  id="questionType" aria-describedby="Question Type" placeholder="Question Type"
                              value={this.state.surveyId}
                              onChange={(event) => {
                                  this.setState({
                                      surveyId: event.target.value
                                  });
                              }}
                      >
                          <option value=""></option>
                          {surveyList}
                      </select>
                  </div>
                  <div>
                      <button type="button" className="surveyape-button" id = "generateStats" onClick={() => this.editSurvey()}>EDIT SURVEY</button>
                  </div>
              </div>
          </div>
          {
              (this.state.surveyDetails)?
                  <div>

          <div className="row">
              <div className="row">
                  <div className="col-md-6 margin-70">
                      <form>
                          <div className="form-group resizedTextbox">
                              <span> <span>* </span>Survey Name : </span>
                              <input type="text" className="form-control surveyape-input" id="surveyName" aria-describedby="Survey Name" placeholder="Survey Name"
                                     onChange={(event) => {
                                         var surveyDataTemp = this.state.surveyDetails;
                                         surveyDataTemp.surveyName = event.target.value;
                                         this.setState({
                                             surveyDetails: surveyDataTemp
                                         });
                                     }}
                                     value={this.state.surveyDetails.surveyName}
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
                                          var surveyDataTemp = this.state.surveyDetails;
                                          surveyDataTemp.surveyType = event.target.value;
                                          this.setState({
                                              surveyDetails: surveyDataTemp
                                          });
                                      }}
                                      value={this.state.surveyDetails.surveyType}
                              >
                                  <option value=""></option>
                                  <option value="0">General</option>
                                  <option value="1">Closed invitation-only</option>
                                  <option value="2">Open unique</option>
                              </select>
                          </div>
                      </form>
                      <button type="button" className="surveyape-button" id = "saveUsrInfo" onClick={()=>this.createBasicSurvey()}>SAVE</button>
                  </div>
                  <div className="col-md-6">
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
          </div>
                  </div>
              :null}
          <button type="button" className="surveyape-button margin-70" id = "addQuestion" onClick={()=>this.deleteSurvey()}>DELETE</button>
          <button type="button" className="surveyape-button margin-70" id = "addQuestion" onClick={()=>this.publishSurvey()}>PUBLISH</button>

      </div>
    );
  }
}

export default EditSurvey;

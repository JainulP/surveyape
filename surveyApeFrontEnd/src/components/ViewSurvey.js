import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import ResponseComponentReadOnly from './ResponseComponentReadOnly.js';

class ViewSurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            surveysCreatedIncomplete :[],
            surveysCreatedComplete:[],
            surveyIdI : null,
            surveyIdC:null,
            surveyTemp:null
        }
    }
    componentWillMount(){
        var self = this.state;
        API.getAllSurveysforviewtab(localStorage.getItem("email"))
            .then((res) => {
                if(res){
                    self.surveysCreatedIncomplete = res.incompleted;
                    self.surveysCreatedComplete = res.completed;
                    this.setState(self);
                }
                else{
                    alert("Try again later");
                }
            });
    }
    viewSurvey = () =>{
        var surveyId = null;
        if(this.state.surveyIdI == ""){
            surveyId = this.state.surveyIdC;
        }
        else{
            surveyId =this.state.surveyIdI;
        }
        var data={
            surveyId : surveyId,
            email: localStorage.getItem("email")

        }
        var self = this.state;
        API.getSurveybYemail(data)
            .then((res) => {
            console.log(res)
               self.surveyTemp = res;
            this.setState(self);
            });
    }
    render() {
        var surveyListC = [];
        var data1 = this.state.surveysCreatedComplete;
        if (data1 && data1.length > 0) {
            data1.map(function (temp, index) {
                surveyListC.push(
                    <option value={temp.surveyId}>{temp.surveyName}</option>
                );
            }, this);
        }
        var surveyListI = [];
        var data2 = this.state.surveysCreatedIncomplete;
        if (data2 && data2.length > 0) {
            data2.map(function (temp, index) {
                surveyListI.push(
                    <option value={temp.surveyId}>{temp.surveyName}</option>
                );
            }, this);
        }
        var questionList = [];
        if(this.state.surveyTemp){
            var data =  this.state.surveyTemp.questions;
            if(data && data.length > 0){
                data.map(function (temp, index) {
                    questionList.push(
                        <ResponseComponentReadOnly data={temp} number={index} />
                    );
                },this);
            }
        }
        return (
            <div className="row margin-none">
                <div className="row margin-70 margin-none">
                    <div className="surveyname-head col-md-4">
                        <div>
                            SURVEYS COMPLETED
                        </div>
                        <div>
                            <select className="form-control surveyape-input" name="cards" id="questionType" aria-describedby="Question Type"
                                    placeholder="Question Type" value={this.state.surveyIdC}
                                    onChange={(event)=> { this.setState({
                                        surveyIdC: event.target.value ,
                                        surveyIdI: ""
                            }); }} >
                                <option value=" "></option>
                                {surveyListC}
                            </select>
                        </div>
                    </div>

                    <div className="surveyname-head col-md-4">
                        <div>
                            SURVEYS INCOMPLETED
                        </div>
                        <div>
                            <select className="form-control surveyape-input" name="cards" id="questionType" aria-describedby="Question Type"
                                    placeholder="Question Type" value={this.state.surveyIdI}
                                    onChange={(event)=> {
                                        this.setState({ surveyIdI: event.target.value,
                                            surveyIdC: " "});
                                    }} >
                                <option value=" "></option>
                                {surveyListI}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" className="surveyape-button" id="generateStats"
                            onClick={() => this.viewSurvey()}>VIEW
                    </button>
                </div>
                <div className="row margin-none">
                    <div className="col-md-5 margin-70">
                    <div>
                        <span>NAME: </span><span>{(this.state.surveyTemp)?this.state.surveyTemp.surveyName:''}</span>
                    </div>
                        <div>
                            <span>START TIME: </span><span>{(this.state.surveyTemp)?this.state.surveyTemp.startTime:''}</span>
                        </div>
                    </div>
                    <div className="col-md-5 margin-70">
                        <div>
                            <span>TYPE: </span><span>{(this.state.surveyTemp)?this.state.surveyTemp.surveyType:''}</span>
                        </div>
                        <div>
                            <span>END TIME: </span><span>{(this.state.surveyTemp)?this.state.surveyTemp.endTime:''}</span>
                        </div>
                    </div>
                </div>
                <div className="row margin-none">
                    <div className="col-md-5 margin-70">
                        {questionList}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //.log(state)
    //return {
       // componentActive: state.all.componentActive
    //}
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({GetComponent: GetComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSurvey));

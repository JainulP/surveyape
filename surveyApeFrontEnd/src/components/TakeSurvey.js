import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import ResponseComponent from "./ResponseComponent";

class TakeSurvey extends Component {
    constructor(props){
        var surveyIdTemp = null;
        var accessCodeTemp = null;
        if(props.location.pathname.indexOf("survey") > 0){
            var loc = props.location.pathname;
            var temp = loc.substr(loc.indexOf("y")+2);
            var a = temp.split("/");
            surveyIdTemp = a[0];
            accessCodeTemp = a[1];
        }
        super(props);
        this.state = {
            surveyDetails:null,
            surveyId:surveyIdTemp,
            accessCode:accessCodeTemp,
            currentQuestion : {
                questionId: null,
                questionStr: null,
                choiceType: null,
                answerType: null,
                questionType: null,
                visualStyle: null,
                options: null,
                size:0.,
                blank:""
            },
            currentIndex : 0
        }
    }
    componentWillMount(){
        var self = this.state;

        API.getSurvey(this.state.surveyId)
            .then((res) => {
                if(res.surveyType === 1 && !this.state.accessCode){
                    alert("NO ACCESS RIGHTS")
                    this.props.history.push("/");
                    }
                if(res.published === false){
                    alert("SURVEY NOT PUBLISHED YET")
                    this.props.history.push("/");
                }
                var d1 = new Date();
                var d2 = new Date(res.endTime);
                console.log(d1.getTime() > d2.getTime());
                /*if(d1.getTime() > d2.getTime()){
                    alert("SURVEY EXPIRED")
                    this.props.history.push("/");
                }*/
                self.surveyDetails=res;
                self.currentQuestion = res.questions[0];
                self.size = res.questions.length;
                if(this.state.surveyDetails.questions.length > 1){
                    document.getElementById("nextClicked").disabled = false;
                }
                this.setState(self);
            });
    }
    componentDidMount(){
        document.getElementById("prevClicked").disabled = true;
        document.getElementById("nextClicked").disabled = true;
    }
        nextClicked = () =>{
            var self = this.state;

            if( self.currentIndex < self.surveyDetails.questions.length - 1){
                document.getElementById("nextClicked").disabled = false;
                self.currentIndex = self.currentIndex + 1;
                self.currentQuestion = self.surveyDetails.questions[self.currentIndex];
                this.setState(self);
            }
            else{
                document.getElementById("nextClicked").disabled = true;
            }

            if( self.currentIndex > 0){
                document.getElementById("prevClicked").disabled = false;
            }
            else{
                document.getElementById("prevClicked").disabled = true;
            }
        }
        prevClicked = () =>{
            var self = this.state;

            if( self.currentIndex < self.surveyDetails.questions.length - 1){
                document.getElementById("nextClicked").disabled = false;
            }
            else{
                document.getElementById("nextClicked").disabled = true;
            }

            if( self.currentIndex > 0){
                document.getElementById("prevClicked").disabled = false;
                self.currentIndex = self.currentIndex - 1;
                self.currentQuestion = self.surveyDetails.questions[self.currentIndex];
                this.setState(self);
            }
            else{
                document.getElementById("prevClicked").disabled = true;
            }
        }
    render() {
        var questionList = [];
        if(this.state.surveyDetails){
        var data = this.state.surveyDetails.questions;
        if(data && data.length > 0) {
            data.map(function (temp, index) {
                temp.surveyId = this.state.surveyId;
                questionList.push(
                    <ResponseComponent accessCode={this.state.accessCode} data={temp} number={index} surveyId={this.state.surveyId}/>
                );
            }, this);
        }
        }
        return (
            <div> Survey Name:
                {
                    (this.state.surveyDetails)?
                        this.state.surveyDetails.surveyName:null
                }
                <div>
                    <div className="pad-top-20">
                    </div>
                    <button type="button" className="surveyape-button" name="prevClicked" id = "prevClicked" onClick={()=>this.prevClicked()}>PREVIOUS</button>
                    <button type="button" className="surveyape-button" name="nextClicked" id = "nextClicked" onClick={()=>this.nextClicked()}>NEXT</button>
                    <ResponseComponent answerTemp={this.state.blank} surveyid={this.state.surveyId} size={this.state.size} accessCode={this.state.accessCode} data={this.state.currentQuestion} number={this.state.currentIndex} surveyId={this.state.surveyId}/>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TakeSurvey));

import React, { Component } from 'react';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';
import StarRatingComponent from 'react-star-rating-component';
import Calendar from 'react-calendar';

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
        var email = null
        if(accessCodeTemp && accessCodeTemp !== "open" ) {
            try {
                email = atob(accessCodeTemp);
            }
            catch (err) {
                alert("invalid link")
            }
        }
        else{
            if(localStorage.getItem("email")){
                email = localStorage.getItem("email");
            }
            if(localStorage.getItem("email") && accessCodeTemp == "open") {
                email = atob(accessCodeTemp);
            }
        }
        super(props);
        var date = new Date();

        var today = date.getFullYear() +
            '-' + ((date.getMonth() + 1 >= 10)?(date.getMonth() + 1):("0"+(date.getMonth() + 1 )))+
            '-' + ((date.getDate() >= 10)?date.getDate():("0" + date.getDate())) +
            'T' + ((date.getHours()<10)?("0"+date.getHours()):date.getHours())+
            ':' + (date.getMinutes());
        this.state = {
            surveyDetails:null,
            surveyId:surveyIdTemp,
            accessCode:accessCodeTemp,
            currentIndex : 0,
            email:email,
            questionCount:0,
            currentresponseId : null,
            answer:"",
            datetemp : today
        }
    }
    componentWillUnmount(){

    }
    componentWillMount() {
        var self = this.state;
        //general surveys
        if(!this.state.accessCode && this.state.email == null ){
        API.getSurvey(this.state.surveyId)
            .then((res) => {
                if (res.surveyType === 1 && !this.state.accessCode) {
                    alert("NO ACCESS RIGHTS")
                    this.props.history.push("/");
                }
                if (res.published === false) {
                    alert("SURVEY NOT PUBLISHED YET")
                    this.props.history.push("/");
                }
                var d1 = new Date();
                var dayeTemp= res.endTime;
                var d2 = new Date(parseInt(dayeTemp.substr(0,4)),parseInt(dayeTemp.substr(5,7))-1,parseInt(dayeTemp.substr(8,10)));
                console.log(d1.getTime() > d2);
                if(d1.getTime() > d2){
                    alert("SURVEY EXPIRED")
                    this.props.history.push("/");
                }
                var surveyDataaa = res;
                if(res.surveyType === 0){
                    surveyDataaa.responses = [];
                }
                self.surveyDetails = surveyDataaa;
                self.questionCount = surveyDataaa.questions.length;
                if(res.surveyType !== 0 && res.questions[0].responses.length>0 && self.email != null ){
                    self.currentresponseId = res.questions[0].responses[0].resId;
                }

                self.size = res.questions.length;
                if (surveyDataaa.questions.length > 1 && surveyDataaa.questions[0].responses[0]) {
                    self.answer = surveyDataaa.questions[0].responses[0].answers;
                }
                this.setState(self);
            });
          }else{
            //open-unique and closed
            var data={
                surveyId : this.state.surveyId,
                email: this.state.email
            }
            if(this.state.accessCode === "open" ){
                var surveyIdTemp = null;
                var accessCodeTemp = null;
                var loc = this.props.location.pathname;
                var temp = loc.substr(loc.indexOf("y")+2);
                var a = temp.split("/");
                surveyIdTemp = a[0];
                if(this.state.email == null){
                    accessCodeTemp = a[2];
                    if(accessCodeTemp != null && accessCodeTemp != "" && accessCodeTemp != undefined) {
                        accessCodeTemp = atob(accessCodeTemp);
                    }
                }
               else{
                    accessCodeTemp = this.state.email;
                }
                self.email = accessCodeTemp;
                this.setState(self);
                if(accessCodeTemp){
                    this.openclosesurveydetails();
                }
                else{
                    localStorage.setItem("openSurveyLink",this.props.location.pathname)
                    localStorage.setItem("surveyId",this.state.surveyId)
                    this.props.history.push("/openSurveyLogin");
                }
            }
            else{
                this.openclosesurveydetails();
            }
        }
    }

    openclosesurveydetails = () =>{
        //open-unique and closed
        var self = this.state;
        var emails = this.state.email;
        if(localStorage.getItem("email")){
        emails = localStorage.getItem("email");
        }
        var data={
            surveyId : this.state.surveyId,
            email: emails

        }

        API.getSurveybYemail(data)
            .then((res) => {
                if (res.code == 404) {
                    alert("You can not take this survey as this survey has been already been taken")
                    this.props.history.push("/");
                } else {
                    if (res.surveyType === 1 && !this.state.accessCode) {
                        alert("NO ACCESS RIGHTS")
                        this.props.history.push("/");
                    }
                    if (res.published === false) {
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
                    self.surveyDetails = res;
                    self.questionCount = res.questions.length;
                    if (res.questions.length > 1 && res.questions[0].responses[0]) {
                        self.answer = res.questions[0].responses[0].answers;
                    }
                    self.size = res.questions.length;
                    if (res.surveyType !== 0 && res.questions[0].responses.length > 0) {
                        if(self.email != null) {
                            self.currentresponseId = res.questions[0].responses[0].resId;
                        }
                    }
                    this.setState(self);
                }
            });
    }
    componentDidMount(){
    }
        nextClicked = () =>{
            var self = this.state;
            if(self.currentIndex < self.questionCount - 1) {
                self.currentIndex = self.currentIndex + 1;
                var answer = "";
                if(self.surveyDetails.questions[this.state.currentIndex].responses[0]){
                    answer = self.surveyDetails.questions[this.state.currentIndex].responses[0].answers;
                }
                self.answer = answer;
                if(self.surveyDetails.questions[this.state.currentIndex].questionType === 3){
                   /* self.answer = new Date(self.answer);*/
                }
            }
            else{
                alert("You are viewing the last question")
            }
            this.setState(self);
        }
        prevClicked = () =>{
            var self = this.state;
            if( self.currentIndex > 0){
                self.currentIndex = self.currentIndex - 1;
                var answer = "";
                if(self.surveyDetails.questions[this.state.currentIndex].responses[0]){
                    answer = self.surveyDetails.questions[this.state.currentIndex].responses[0].answers;
                }
                self.answer = answer;
                if(self.surveyDetails.questions[this.state.currentIndex].questionType === 3){
                    /*
                    Prepopulate date
                    var dateTemp = null;
                    dateTemp=answer;
                   // dateTemp = dateTemp.substr(0,dateTemp.lastIndex("-"));
                    var s =dateTemp.lastIndex("-");
                    dateTemp = dateTemp.substr(0,s) + "T" + dateTemp.substr(s+1);
                    self.answer = dateTemp;*/
                }
            }
            else{
                alert("You are viewing the first question")
            }
            this.setState(self);
        }

    //response component functions
    onStarClick(nextValue, prevValue, name) {
        this.setState({answer: nextValue});
    }

    onChange = date => {
        this.setState({
            answer : date
        });
        alert(this.state.answer)
    }

    renderOptions = (data) => {
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <option selected={this.state.surveyDetails.questions[this.state.currentIndex].responses[0].answers === temp?"selected":""}  value={temp}>{temp}</option>
                );
            }, this);
            return optionsList;
        }
    }
    renderRadio = (data, questionid) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input type="radio" name={questionid} value={temp}
                           checked={this.state.answer === temp?true:false}
                           onChange={(event) => {
                               this.setState({
                                   answer: event.target.value
                               });
                           }}/>{temp}
                    </span>
                )
            }, this);
            return optionsList;
        }
    }

    renderRadioImages = (data, questionid) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input type="radio" name={questionid} value={temp}
                           checked={this.state.answer === temp?true:false}
                           onChange={(event) => {
                               this.setState({
                                   answer: event.target.value
                               });
                           }}/><img className="img-height" src={temp}></img>
                    </span>
                )
            }, this);
            return optionsList;
        }
    }

    renderCheckboxSingle = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={temp}
                        id={temp}
                        type="checkbox"
                        value={temp}
                        checked={this.state.answer === temp?true:false}
                        onChange={(event) => {
                            var temp = this.state.surveyDetails.questions[this.state.currentIndex].options;
                            var val = event.target.value;
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i] !== val) {
                                    document.getElementById(temp[i]).checked = false;
                                }
                            }
                            this.setState({
                                answer: event.target.value
                            });
                            //console.log(this.state.answer)
                        }}
                    />{temp}
                    </span>
                );
            }, this);
            return optionsList;
        }
    }


    renderCheckboxSingleImages = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={temp}
                        id={temp}
                        type="checkbox"
                        value={temp}
                        checked={this.state.answer === temp?true:false}
                        onChange={(event) => {
                            var temp = data;
                            var val = event.target.value;
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i] !== val) {
                                    document.getElementById(temp[i]).checked = false;
                                }
                            }
                            this.setState({
                                answer: event.target.value
                            });
                            //console.log(this.state.answer)
                        }}
                    /><img className="img-height" src={temp}></img>
                    </span>
                );
            }, this);
            return optionsList;
        }
    }

    renderCheckboxMultiple = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={index}
                        type="checkbox"
                        value={temp}
                        checked={(this.state.answer.indexOf(temp)>-1)?true:false}
                        onChange={(event) => {
                            var temp = this.state.answer;
                            var val =  event.target.value;
                            var changed = false;
                            if(temp === null || temp.length === 0){
                                temp=[];
                                temp.push(val);
                            }
                            else {
                                for (let i = 0; i < temp.length; i++) {
                                    if (temp[i] === val) {
                                        temp.splice(i, 1);
                                        changed = true;
                                    }

                                }
                                if(!changed){
                                    temp.push(val);
                                }
                            }
                            // console.log(temp)
                            this.setState({
                                answer:temp
                            });
                        }}
                    />{temp}
                    </span>
                );
            }, this);
            return optionsList;
        }
    }

    renderCheckboxMultipleImages = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={index}
                        type="checkbox"
                        checked={(this.state.answer.indexOf(temp)>-1)?true:false}
                        value={temp}
                        onChange={(event) => {
                            var temp = this.state.mcqarray;
                            var val =  event.target.value;
                            var changed = false;
                            if(!temp || temp === null || temp.length === 0){
                                temp=[];
                                temp.push(val);
                            }
                            else {
                                for (let i = 0; i < temp.length; i++) {
                                    if (temp[i] === val) {
                                        temp.splice(i, 1);
                                        changed = true;
                                    }

                                }
                                if(!changed){
                                    temp.push(val);
                                }
                            }
                            var imgtemp=null;
                            if(temp.length>0){
                                imgtemp = temp[0];
                            }
                            for(var i=1;i < temp.length;i++){
                                imgtemp = imgtemp + "," + temp[i];
                            }
                            // console.log(temp)
                            this.setState({
                                answer:imgtemp,
                                mcqarray:temp
                            });
                        }}
                    /><img className="img-height" src={temp}></img>
                    </span>
                );
            }, this);
            return optionsList;
        }
    }
    submitSurvey = () =>{
        var data={
            surveyId : this.state.surveyId,
            email : this.state.email || this.state.emailtaken
        }
        API.completeSurvey(data)
            .then((res) => {
                console.log(res)
                alert("Thank you for submitting your response!")
                window.location = "http://localhost:3000/"

            });
    }
    saveResponse = () =>{
        var answerTemp = this.state.answer;
        if(this.state.surveyDetails.questions[this.state.currentIndex] && this.state.surveyDetails.questions[this.state.currentIndex].questionType === 3){
           answerTemp = new Date(answerTemp);
            var today = answerTemp.getFullYear() +
                '-' + ((answerTemp.getMonth() + 1 >= 10)?(answerTemp.getMonth() + 1):("0"+(answerTemp.getMonth() + 1 )))+
                '-' + ((answerTemp.getDate() >= 10)?answerTemp.getDate():("0" + answerTemp.getDate())) +
                '-' + ((answerTemp.getHours()<10)?("0"+answerTemp.getHours()):answerTemp.getHours());
            answerTemp = today;
        }
        if(this.state.surveyDetails.questions[this.state.currentIndex] && this.state.surveyDetails.questions[this.state.currentIndex].responses[0] && this.state.surveyDetails.questions[this.state.currentIndex].responses[0].resId) {
            var self = this.state;
            var queryData = {
                questionId :this.state.surveyDetails.questions[this.state.currentIndex].questionId,
                email:localStorage.getItem("email"),
                userid:localStorage.getItem("userId"),
                surveyid:this.state.surveyId,
                answer:answerTemp,
                responseId:this.state.surveyDetails.questions[this.state.currentIndex].responses[0].resId
            }
            API.updateResponse(queryData)
                .then((res) => {
                    console.log(res)
                    self.surveyDetails.questions[this.state.currentIndex].responses[0] = res;
                    this.setState(self);
                    alert("Response Saved. Please click next to proceed.")
                });
        }
        else{
            var queryData = {
                questionId :this.state.surveyDetails.questions[this.state.currentIndex].questionId,
                email:localStorage.getItem("email"),
                userid:localStorage.getItem("userId"),
                surveyid:this.state.surveyId,
                answer:answerTemp
            }
            var self = this.state;
            API.saveResponse(queryData)
                .then((res) => {
                    console.log(res)
                    self.surveyDetails.questions[this.state.currentIndex].responses[0] = res;
                    this.setState(self);
                    alert("Response Saved. Please click next to proceed.")
                });
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
                    <div className="row margin-70 margin-none">
                        <div className="col-md-4">
                        </div>
                        <div className="form-group border-question resizedTextbox text-center col-md-4">
                            <span>
                        {temp.questionStr}
                    </span>
                            <div>
                                {(temp.questionType === 0)?
                                    <div>
                                        {
                                            (temp.choiceType === "0")?

                                                <div>

                                                    {(temp.answerType === "0") ?

                                                        /*  Single*/
                                                        <div>

                                                            {(temp.visualStyle === "0") ?
                                                                <div>
                                                                    <select className="form-control surveyape-input" name="cards" id="visualStyle"
                                                                            aria-describedby="Visual style" placeholder="Visual style"
                                                                            value={this.state.answer}
                                                                            onChange={(event) => {
                                                                                this.setState({
                                                                                    answer: event.target.value
                                                                                });
                                                                            }}
                                                                    >
                                                                        <option value=""> </option>
                                                                        {this.renderOptions(temp.options)}
                                                                    </select>
                                                                </div>
                                                                :
                                                                <div>
                                                                    {(temp.visualStyle === "1") ?
                                                                        <div>
                                                                            {this.renderRadio(temp.options, temp.questionId)}
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            {(temp.visualStyle === "2") ?
                                                                                <div>

                                                                                    {this.renderCheckboxSingle(temp.options)}
                                                                                </div>
                                                                                :
                                                                                null
                                                                            }
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                        :
                                                        /* Multiple*/
                                                        <div>
                                                            <div>
                                                                {(temp.visualStyle === "2") ?
                                                                    <div>
                                                                        {this.renderCheckboxMultiple(temp.options)}
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        </div>
                                                    }

                                                </div>

                                                :
                                                /*For Images*/

                                                <div>

                                                    {(temp.answerType === "0") ?
                                                        /*  Single*/
                                                        <div>

                                                            <div>
                                                                {(temp.visualStyle === "1") ?
                                                                    <div>
                                                                        {this.renderRadioImages(temp.options, temp.questionId)}
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        {(temp.visualStyle === "2") ?
                                                                            <div>
                                                                                {this.renderCheckboxSingleImages(temp.options)}
                                                                            </div>
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>

                                                        </div>
                                                        :
                                                        /* Multiple*/
                                                        <div>
                                                            <div>
                                                                {(temp.visualStyle === "2") ?
                                                                    <div>
                                                                        {this.renderCheckboxMultipleImages(temp.options)}
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        </div>
                                                    }


                                                </div>
                                        }



                                    </div>
                                    :
                                    <div>
                                        {
                                            (temp.questionType === 1) ?

                                                <div>
                                                    <input type="radio" name="question-radio-1" value="yes"
                                                           checked={this.state.answer === "yes"?true:false}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   answer: event.target.value
                                                               });
                                                           }}/>YES
                                                    <input type="radio" name="question-radio-1" value="no"
                                                           checked={this.state.answer === "no"?true:false}
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   answer: event.target.value
                                                               });
                                                           }}/>NO
                                                </div>
                                                :
                                                <div>
                                                    {
                                                        (temp.questionType === 2) ?
                                                            <div>
                                                                <input type="text" className="form-control surveyape-input" id="questionStr"
                                                                       aria-describedby="questionStr" placeholder="Response"
                                                                       value={this.state.answer}
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               answer: event.target.value
                                                                           });
                                                                       }}
                                                                />
                                                            </div>
                                                            :
                                                            <div>
                                                                {
                                                                    (temp.questionType === 3) ?
                                                                        <input id="surveyEndTime" type="datetime-local" name="partydate"  onChange={(event) => {
                                                                            this.setState({
                                                                                answer: event.target.value
                                                                            });
                                                                        }}
                                                                               defaultValue={this.state.datetemp}
                                                                              />
                                                                        :
                                                                        /*question 4*/
                                                                        <div>
                                                                            {(temp.questionType === 4) ?
                                                                                <div>
                                                                                    <StarRatingComponent
                                                                                        name="rate1"
                                                                                        starCount={5}
                                                                                        value={this.state.answer}
                                                                                        onStarClick={this.onStarClick.bind(this)}
                                                                                    />
                                                                                </div>

                                                                                : null

                                                                            }
                                                                        </div>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                        }

                                    </div>
                                }
                            </div>
                            <button type="button" className="surveyape-button margin-20" id = "saveResponse" onClick={()=>this.saveResponse()}>SAVE RESPONSE</button>
                            {
                                (!this.state.email && data.length === index + 1) ?
                                    <div>
                                        <span>Enter your email id to recieve a confirmation mail</span>
                                        <input type="text" className="form-control surveyape-input" id="questionStr"
                                               aria-describedby="questionStr" placeholder="Response"
                                               value={this.state.emailtaken}
                                               onChange={(event) => {
                                                   this.setState({
                                                       emailtaken: event.target.value
                                                   });
                                               }}
                                        />
                                    </div>
                                    : null
                            }

                            <div>
                                {(data.length === index + 1)?
                                    <button type="button" className="surveyape-button margin-20" id = "submitSurvey" onClick={()=>this.submitSurvey()}>SUBMIT SURVEY</button>
                                    :null}
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                );
            }, this);
        }
        }
        return (
            <div className="height-fixed"> <span className="survey-name-style">Survey Name:
                {
                    (this.state.surveyDetails)?
                        this.state.surveyDetails.surveyName:null
                }
            </span>
                <div className="text-center">
                    <div className="pad-top-20">
                    </div>
                    <button type="button" className="surveyape-button margin-10" name="prevClicked" id = "prevClicked" onClick={()=>this.prevClicked()}>PREVIOUS</button>
                    <button type="button" className="surveyape-button margin-10" name="nextClicked" id = "nextClicked" onClick={()=>this.nextClicked()}>NEXT</button>
                    {questionList[this.state.currentIndex]}
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

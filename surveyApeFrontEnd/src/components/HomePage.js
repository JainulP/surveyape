import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import React, { Component } from 'react';
import MainComponent from './MainComponent.js';
import Footer from './Footer.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TopMenu from './TopMenu.js';
import Dashboard from './Dashboard.js';
import CreateSurvey from './CreateSurvey.js';
import TakeSurvey from './TakeSurvey.js';
import ViewSurvey from './ViewSurvey.js';

class HomePage extends Component {
    constructor(props) {
        super(props);
        var surveyIdTemp = null;
        if(props.location.pathname.indexOf("survey") > 0){
            var loc = props.location.pathname;
            surveyIdTemp = loc.substr(loc.indexOf("y")+2);
           // this.props.history.push("/survey");
        }
        this.state = {
            surveyId: surveyIdTemp
        }
    }


    loginUser = (data) => {
        API.login(data)
            .then((res) => {
            if(res.userId){
                localStorage.setItem("username", res.username);
                localStorage.setItem("email", res.email);
                localStorage.setItem("userId", res.userId);
                this.props.history.push("/");
            }
              else{
                alert("Login failed. Try again")
            }
            });
    }
    signupUser = (data) => {
        API.signup(data)
            .then((res) => {
                if (res.msg === "Email already registered") {
                    alert("Email already registered");
                }
                else {
                    alert("A verification code is sent to your mail to activate your account.");
                }
            });
    }
    activateCode = (code, emailId) =>{
        var encodedEmailId =  btoa(emailId);
        API.verifyUser(code, encodedEmailId)
            .then((res) => {
                if (res && res.msg) {
                    alert(res.msg);
                }
                else {
                   alert("Account Activated");
                    localStorage.setItem("username", res.username);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("userId", res.userId);
                    this.props.history.push("/");
                }

            });
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <MainComponent/>
                            <div className="grey-content"></div>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/signin" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <SignIn loginUser={this.loginUser}/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/signup" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <SignUp signupUser={this.signupUser}  activateCode={this.activateCode}/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/takeSurvey" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <TakeSurvey/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/viewSurvey" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <ViewSurvey/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/createSurvey" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <CreateSurvey createBasicSurvey={this.createBasicSurvey}/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/dashboard" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <Dashboard/>
                            <Footer/>
                        </div>
                    )}/>
                <Route exact path="/survey/*" render={() =>
                    (
                        <div>
                            <TakeSurvey surveyId={this.state.surveyId} />
                        </div>
                    )}/>
            </div>
        )
    }
}

function mapStateToProps(state){
   // console.log(state + " in homepage")
  //  return {
  //      hotelsList: state.hotels.hotelsList
  //  }
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({SaveBasicSurvey : SaveBasicSurvey}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));


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
    state = {
        hotelsList: [],
        admin: localStorage.getItem("admin")

    }

    loginUser = (data) => {
        API.login(data)
            .then((res) => {
               console.log(res)
            });
    }
    signupUser = (data) => {
        API.signup(data)
            .then((res) => {
                if (res.msg === "Email already registered") {
                    alert("Email already registered");
                }
                else {
                    localStorage.setItem("username", res.username);
                    localStorage.setItem("email", res.email);
                    alert("A verification code is sent to your mail to activate your account.");
                }
            });
    }
    activateCode = (code, emailId) =>{
        API.verifyUser(code, emailId)
            .then((res) => {
                console.log(res)
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
                            <SignIn loginUser={this.loginUser} activateCode = {this.activateCode}/>
                            <Footer/>
                        </div>
                    )}/>

                <Route exact path="/signup" render={() =>
                    (
                        <div>
                            <TopMenu/>
                            <SignUp signupUser={this.signupUser}/>
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
                            <CreateSurvey/>
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
            </div>
        )
    }
}

function mapStateToProps(state){
  //  console.log(state.hotels.hotelsList)
  //  return {
  //      hotelsList: state.hotels.hotelsList
  //  }
}

function mapDispatchToProps(dispatch){
   // return bindActionCreators({GetHotels : GetHotels, GetCars: GetCars, GetFlight: GetFlight}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));


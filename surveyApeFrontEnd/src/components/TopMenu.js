import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SetComponent} from '../actions/actionsAll';


class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageActive: " home",
            loggedout:true
        }
    }

    setType = (type) =>{
        //this.props.history.push("/homePage");
        //this.props.SetComponent(type);
    }
    GoTosignin = () =>{
        this.props.history.push("/signin");
    }
    GoToCreateSurvey = () =>{
        this.props.history.push("/createSurvey");
    }
    GoToViewSurvey = () =>{
        this.props.history.push("/viewSurvey");
    }
    GoToTakeSurvey = () =>{
        this.props.history.push("/takeSurvey");
    }
    GoToDashboard = () =>{
        this.props.history.push("/dashboard");
    }
    GoTosignup = () =>{
        this.props.history.push("/signup");
    }
    GoToLogout = () =>{
        var self = this.state;
        self.loggedout = false;
        this.setState(self);
localStorage.clear();

    }
    render() {
        return (
            <div className="topmenu-conatiner-menu">
                <div className="top-menu-head row">
                    <div className="col-md-6">
                        <div className="text-align-left">
                            {
                                (this.state.loggedout == true && localStorage.getItem("userId"))?
                                    <span>
                                        <span>
                                 <img className="heighht-survey-logo" src="http://localhost:3000/surveyicon.png"></img>
                        </span>
                        <span>
                            <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToCreateSurvey()}}>CREATE</a>
                        </span>
                        <span>
                            <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToViewSurvey()}}>VIEW</a>
                        </span>
                        <span>
                            <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToTakeSurvey()}}>TAKE</a>
                        </span>
                                    </span>
                                    :null
                            }
                        </div>
                    </div>
                    <div  className="col-md-6 text-align-right">
                        {
                            (this.state.loggedout == true && localStorage.getItem("userId")) ?
                                <span>
                                <span>
                        <a className="s padding-left-25 cursor-pointer" onClick={() => {
                            this.GoToDashboard()
                        }}>DASHBOARD</a>
                    </span>
                                     <span>
                        <a className="s padding-left-25 cursor-pointer" onClick={() => {
                            this.GoToLogout()
                        }}>LOGOUT</a>
                    </span>
                                </span>:

                                <span>
                    <span>
                        <a className="s padding-left-25 cursor-pointer" onClick={() => {
                            this.GoTosignin()
                        }}>SIGN IN</a>
                    </span>
                    <span>
                        <a className="s padding-left-25 cursor-pointer" onClick={() => {
                            this.GoTosignup()
                        }}>SIGN UP</a>
                    </span>
                                </span>
                        }
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state)
  //  return {
       // componentActive: state.all.componentActive
    //}
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({SetComponent: SetComponent}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu));
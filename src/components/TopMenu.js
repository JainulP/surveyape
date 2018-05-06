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
            pageActive: " home"
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
    render() {
        return (
            <div className="topmenu-conatiner-menu">
                <div className="top-menu-head row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToCreateSurvey()}}>CREATE</a>
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToViewSurvey()}}>VIEW</a>
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToTakeSurvey()}}>TAKE</a>
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoToDashboard()}}>DASHBOARD</a>
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoTosignin()}}>SIGN IN</a>
                    </div>
                    <div className="col-md-1">
                        <a className="s padding-left-25 cursor-pointer" onClick={ () =>{this.GoTosignup()}}>SIGN UP</a>
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
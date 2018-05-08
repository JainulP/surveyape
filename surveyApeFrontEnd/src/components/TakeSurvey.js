import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

class TakeSurvey extends Component {
    constructor(props){
        var surveyIdTemp = null;
        if(props.location.pathname.indexOf("survey") > 0){
            var loc = props.location.pathname;
            surveyIdTemp = loc.substr(loc.indexOf("y")+2);
            // this.props.history.push("/survey");
        }
        super(props);
        this.state = {
            surveyDetails:null,
            surveyId:surveyIdTemp
        }
    }
    componentWillMount(){
        var self = this.state;
        API.getSurvey(this.state.surveyId)
            .then((res) => {
                self.surveyDetails=res;
                this.setState(self);
            });
    }

    render() {
        return (
            <div>
                Take Survey {this.props.surveyId}
               |  Survey Name:
                {
                    (this.state.surveyDetails)?
                        this.state.surveyDetails.surveyName:null
                }
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

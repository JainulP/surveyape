import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

class ViewSurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            surveysCreated :[],
            surveysGiven:[]
        }
    }
    componentWillMount(){
        var self = this.state;
        API.surveyscreated(localStorage.getItem("userId"))
            .then((res) => {
                if(res){
                    self.surveysCreated = res;
                    API.surveyscreated(localStorage.getItem("userId"))
                        .then((res) => {
                            if(res) {
                                self.surveysGiven = res;
                                this.setState(self);
                            }
                            else{
                                alert("Try again later");
                            }
                        });
                }
                else{
                    alert("Try again later");
                }
            });
    }
    render() {
        return (
            <div className="row margin-none">
               <div className="row margin-70 margin-none">
                   <div className="surveyname-head">
                       SURVEYS CREATED
                   </div>
               </div>
                <div className="row margin-70 margin-none">
                    <div className="surveyname-head">
                        SURVEYS GIVEN
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

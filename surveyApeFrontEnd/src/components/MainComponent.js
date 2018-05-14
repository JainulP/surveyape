import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

class MainComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            listOfSurveys:[]
        }
    }

    componentWillMount(){
        var self= this.state;
        API.getAll02Surveys()
            .then((res) => {
                if(res && res.length > 0){
                self.listOfSurveys = res;
                this.setState(self);
                }
            });
    }
    surveyclicked = (surveyId, type) =>{
        if(type === 2){
            this.props.history.push("/survey/"+surveyId+"/open");
        }else{
            this.props.history.push("/survey/"+surveyId);
        }
    }
    render() {
        var TypeSurvey0 = [];
        var TypeSurvey1 = [];
        var data = this.state.listOfSurveys;
        data.map(function (temp, index) {
            if(temp.surveyType === 0){
                TypeSurvey0.push(
                   <div>
                       <span onClick={() => {
                           this.surveyclicked(temp.surveyId, temp.surveyType)
                       }}>
                           <span className="surveyname-head">
                           {temp.surveyName}
                           </span>
                           <span className="italic-survey">
                                | take before {temp.endTime}
                           </span>
                       </span>
                   </div>
                );
            }
            else{
                TypeSurvey1.push(
                    <div>
                       <span onClick={() => {
                           this.surveyclicked(temp.surveyId, temp.surveyType)
                       }}>
                            <span className="surveyname-head">
                           {temp.surveyName}
                           </span>
                           <span className="italic-survey">
                                | take before {temp.endTime}
                           </span>
                       </span>
                    </div>
                );
            }
        },this);

        return (
            <div >
                {/*<img className="back-img" src="http://localhost:3000/wc.png" ></img>*/}
                <div className="row margin-70">
                    <div className="col-md-4 box-shadow-surveyape div-head">
                        <div className="stat-heading">
                            GENERAL SURVEYS
                        </div>
                        {TypeSurvey0}
                    </div>
                    <div className="col-md-4 box-shadow-surveyape div-head">
                        <div className="stat-heading">
                            OPEN UNIQUE
                        </div>
                        {TypeSurvey1}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

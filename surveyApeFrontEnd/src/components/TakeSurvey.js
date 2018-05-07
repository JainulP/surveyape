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
        super(props);
        this.state = {
            surveyData:{
                surveyName:["survey1", "survey2", "survey3", "survey4", "survey5"],
                endTime:null,
                published:null,
                userId:null,
                surveyTye:null
            },
            questionData:{
                questionStr:null,
                answerType:null,
                choiceType:null,
                questionType:null,
                options:null,
                surveyId:null
            },
            userId: null,
            username: "Alex",


        }
    }
    componentDidMount(){

    }

    render() {
        return (
            <div className="container-fluid">
                {/*Take Survey*/}
                <div className="container">
                    <center><h1>Welcome {this.state.username}</h1></center>


                    <div className="container-fluid">
                        <div className="col-sm-6" style={{"background-color": "lavender", "height": "400px", "display": "flex", marginBottom: "10px"}}>

                            <u><h3>Take Survey</h3></u>

                            {this.state.surveyData.surveyName.map((file,i) =>

                                <div className="">
                                    <li><h4>{file}</h4></li>

                                </div>



                            )}

                        </div>
                        <div className="col-sm-6" style={{"background-color": "lavenderblush", "height": "400px", "display": "flex", marginBottom: "10px"}}>


                            <center><u><h3>Previous Survey</h3></u> </center>
                        </div>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TakeSurvey));

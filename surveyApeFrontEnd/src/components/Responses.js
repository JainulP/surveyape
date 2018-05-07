import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

class Response extends Component {
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
            questions: [{

                /*
                    choiceType: [0 -> text, 1 ->image],
                    answerType: [0 -> Single , 1 -> Multiple Choice],
                */
                questionId: 2,
                questionStr: "Describe SJSU?",
                choiceType: 0,
                answerType: 0,
                questionType: 1,
                visualStyle:  0,
                options: [],
                responses: []
            },
                {
                    questionId: 3,
                    questionStr: "Describe SE?",
                    choiceType: 1,
                    answerType: 1,
                    questionType: 1,
                    visualStyle:  0,
                    options: ["Yes", "No"],
                    responses: []
                },
                {
                    questionId: 4,
                    questionStr: "Describe CMPE275",
                    choiceType: 0,
                    answerType: 0,
                    questionType: 4,
                    visualStyle:  2,
                    options: [],
                    responses: []
                }

            ],
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
            <div className="col-sm-10" style={{"background-color": "lavender", "height": "400px", "display": "flex", marginBottom: "10px", marginLeft: "100px"}}>

    <u><h3>Take Survey</h3></u>
        <div>

        {this.state.questions.map((file,i) =>

        <li>

        <div className="panel panel-default">
            <h4>{file.questionStr}</h4>
        {
            (file.questionType === 1)?
        <div>
        {
        (file.visualStyle === 0)?

        <div className="dropdown-menu">
            <h1>print</h1>
            <select>
            <option defaultValue="True">True</option>
            <option defaultValue="False">False</option>
            </select>

            </div>
        :
        <div className="radio">
            <h1>print</h1>
            <form>
            <input type="radio" name = "True" value = "True" checked>True</input>
        <input type="radio" name = "False" value = "False">True</input>
            </form>
            </div>
        }

        </div>
        :
        <div>

        {
        (file.questionType === 2)?
        <div>
        <h1>print</h1>
            {
                (file.visualStyle === 0)?
            <div className="dropdown-menu">
                <h1>print</h1>
                <select>
                <option defaultValue="True">True</option>
                <option defaultValue="False">False</option>
                <option defaultValue="True">True</option>
                <option defaultValue="False">False</option>
                </select>

                </div>
            :
            <div className="radio">
                <form>
                <input type="radio" name = "True" value = "True" checked>True</input>
            <input type="radio" name = "False" value = "False">True</input>
                <input type="radio" name = "True" value = "True" >True</input>
                <input type="radio" name = "False" value = "False">True</input>
                </form>
                </div>
            }

        </div>
        :
        <div>

        {
        (file.questionType === 3)?
        <div>

        </div>
        :
        <div>

        {
        (file.questionType === 4)?
        <div>

        </div>
        :
        <div>



        </div>
        }

        </div>
        }

        </div>
        }


        </div>
        }




    </div>

        </li>




    )}
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Response));

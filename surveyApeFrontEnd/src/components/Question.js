import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
        number: this.props.number,
            questionStr:this.props.data.questionStr,
            answerType:this.props.data.answerType,
            choiceType:this.props.data.choiceType,
            questionType:this.props.data.questionType,
            options:this.props.data.options,
            surveyId:this.props.data.surveyId,
            visualStyle :this.props.data.visualStyle
        }
    }
    componentDidMount(){

    }

    render() {
        return (
            <div>
               QUESTION {this.state.number + 1}
                <div className="row">
                    <div className="col-md-10 margin-70">
                        <form>
                            <div className="form-group resizedTextbox">
                                <div>
                                    <span>
                                    Question
                                    </span>
                                </div>
                                <input type="text" className="form-control surveyape-input" id="questionStr" aria-describedby="questionStr" placeholder="Question"
                                       onChange={(event) => {
                                           this.setState({
                                                   questionStr: event.target.value
                                           });
                                       }}
                                />
                            </div>

                            <div className="form-group resizedTextbox">
                                <div>
                                    <span>
                                    Question Type
                                    </span>
                                </div>
                                <select className="form-control surveyape-input" name="cards"  id="questionType" aria-describedby="Question Type" placeholder="Question Type"
                                        onChange={(event) => {
                                            this.setState({
                                                    questionType: event.target.value
                                            });
                                        }}
                                >
                                    <option value=""> </option>
                                    <option value="0">Multiple Choice</option>
                                    <option value="1">Yes/No</option>
                                    <option value="2">Short Answer</option>
                                    <option value="3">Date/Time</option>
                                    <option value="4">Star Rating</option>
                                </select>
                            </div>
                            {this.state.questionType}
                            {
                                (this.state.questionType === "0" )?

                                    <div>

                                        <div className="form-group resizedTextbox">
                                        <div>
                                        <span>
                                        Choice type
                                        </span>
                                        </div>
                                        <select className="form-control surveyape-input" name="cards"  id="choiceType" aria-describedby="Choice Type" placeholder="Choice Type"
                                        onChange={(event) => {
                                        this.setState({
                                                choiceType: event.target.value
                                        });
                                    }}
                                        >
                                            <option value=""> </option>
                                        <option value="0">Text</option>
                                        <option value="1">Image</option>
                                        </select>
                                        </div>

                                        <div className="form-group resizedTextbox">
                                            <div>
                                        <span>
                                        Answer type
                                        </span>
                                            </div>
                                            <select className="form-control surveyape-input" name="cards"  id="answerType" aria-describedby="Answer Type" placeholder="Answer Type"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            answerType: event.target.value

                                                        });
                                                    }}
                                            >
                                                <option value=""> </option>
                                                <option value="0">Single</option>
                                                <option value="1">Multiple</option>
                                            </select>
                                        </div>

                                        <div className="form-group resizedTextbox">
                                            <div>
                                                <span>
                                                Visual style
                                                </span>
                                            </div>
                                            <select className="form-control surveyape-input" name="cards"  id="visualStyle" aria-describedby="Visual style" placeholder="Visual style"
                                                    onChange={(event) => {
                                                        this.setState({
                                                                visualStyle: event.target.value
                                                        });
                                                    }}
                                            >
                                                <option value="2">Checkbox</option>
                                                {
                                                    (this.state.answerType === "0")?
                                                        <option value="0">Dropdown</option>
                                                        :null
                                                }
                                                {
                                                    (this.state.answerType === "0")?
                                                        <option value="1">Radio</option>
                                                        :null
                                                }
                                            </select>
                                        </div>

                                        {
                                            (this.state.choiceType === 0)?
                                                <div>
                                                    <input type="text" className="form-control surveyape-input" id="options" aria-describedby="Options" placeholder="Options"
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   options: event.target.value
                                                               });
                                                           }}
                                                    />
                                                </div>
                                                :
                                                <div>
                                                    <input type="text" className="form-control surveyape-input" id="options" aria-describedby="Options" placeholder="Options"
                                                           onChange={(event) => {
                                                               this.setState({
                                                                   options: event.target.value
                                                               });
                                                           }}
                                                    />
                                                </div>
                                        }

                                    </div>
                                :null
                            }
                        </form>
                        <button type="button" className="surveyape-button" id = "saveUsrInfo" onClick={()=>this.props.saveQuestion(this.state)}>CREATE SURVEY</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));

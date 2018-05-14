import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import * as  API from '../api/API';
import {Doughnut} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {GetComponent} from '../actions/actionsAll';

const data1 = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfSurveys: [
                {
                    surveyId: 31,
                    surveyName: "survey_manasa"
                },
                {
                    surveyId: 32,
                    surveyName: "survey_manasa1"
                }
            ],
            surveyId: null,
            surveyStats: {
                surveyName: "survey1",
                startTime: "12/34/5",
                endTime: "12/34/5",
                noParticipants: 30,
                participationRate: 20,
                questions: []
            },
            surveyStatsLits:[]
        }
    }

    componentWillMount() {
        var self = this.state;
        API.getListOfSurveyscreated(localStorage.getItem("userId"))
            .then((res) => {
                if (res && res.length > 0) {
                    self.listOfSurveys = res;
                    this.setState(self);
                }
                if(res.msg){
                    alert(res.msg)
                }
            });
    }

    generateStats = () => {
        var self = this.state;
        API.surveyStats(this.state.surveyId)
            .then((res) => {
                if (res && res.surveyName) {
                    self.surveyStats = res;
                    this.setState(self);
                }
                if(res.msg){
                    alert(res.msg)
                }
            });
        var self = this.state;
        API.questionStats(this.state.surveyId)
            .then((res) => {
                if (res) {
                    var statsJson=[];
                    var dataStats = [];
                    var dataLabels = [];
                    var questionList =[];
                    for(var c=0;c<res.length;c++){
                        let statstemp = res[c];
                        for (var i in statstemp){
                            if(i !== 'Question'){
                                dataLabels.push(i)
                                dataStats.push(statstemp[i]);
                            }
                            else {
                                questionList.push(statstemp[i])
                                }
                        }
                        var jsonTemplate  = {
                            labels:dataLabels,
                            datasets: [{
                                data: dataStats,
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                ],
                                hoverBackgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56'
                                ]
                            }]
                        };
                        console.log(dataStats);
                        console.log(dataLabels);
                        console.log(jsonTemplate);
                        var lists=self.surveyStatsLits;
                        self.surveyStatsLits.push(jsonTemplate);
                        self.questionList = questionList;
                        this.setState(self);
                        dataStats = [];
                        dataLabels = [];
                    }
                    console.log(this.state.surveyStatsLits);
                }


            });
    }

    render() {
        var surveyList = [];
        var data = this.state.listOfSurveys;
        var temp = this.state.surveyStats;

        if (data && data.length > 0) {
            data.map(function (temp, index) {
                let a = temp.surveyId;
                surveyList.push(
                    <option value={a}>{temp.surveyName}</option>
                );
            }, this);
        }

        var pieList = [];
        var data1 = this.state.surveyStatsLits;
        var questionList = this.state.questionList;
        if (data1 && data1.length > 0) {
            data1.map(function (temp, index) {
                let a = temp.surveyId;
                pieList.push(
                    <div>
                        <div>
                            <span className="stat-heading">
                                QUESTION {index+1} : {questionList[index]}
                            </span>
                        </div>
                    <Doughnut data={temp}/>
                    </div>
                );
            }, this);
        }
        return (
            <div className="height-fixed">
                <div className="row">
                    <div className="col-md-6 margin-70">
                        <div className="form-group resizedTextbox">
                            <div>
                    <span>
                    Surveys
                    </span>
                            </div>
                            <select className="form-control surveyape-input" name="cards" id="questionType"
                                    aria-describedby="Question Type" placeholder="Question Type"
                                    value={this.state.surveyId}
                                    onChange={(event) => {
                                        this.setState({
                                            surveyId: event.target.value
                                        });
                                    }}
                            >
                                <option value=" "></option>
                                {surveyList}
                            </select>
                        </div>
                        <div>
                            <button type="button" className="surveyape-button" id="generateStats"
                                    onClick={() => this.generateStats(this.state.surveyId)}>GENERATE STATS
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row margin-70 stat-heading">
                    {temp.surveyName}
                </div>
                <div className="row margin-70">
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            START TIME
                        </div>
                        <div className="stat-data">
                            {temp.startDate}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            END TIME
                        </div>
                        <div className="stat-data">
                            {temp.endDate}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            # OF PARTICIPANTS
                        </div>
                        <div className="stat-data">
                            {temp.participants}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            PARTICIPANTS RATE
                        </div>
                        <div className="stat-data">
                            {temp.participationRate}
                        </div>
                    </div>
                </div>
                <div className="row padd-200">
                    <div className="col-md-6">
                        <div>
                            {pieList}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

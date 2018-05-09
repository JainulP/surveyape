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
            }
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
            });
    }

    generateStats = () => {
        var self = this.state;
        API.surveyStats(this.state.surveyId)
            .then((res) => {
                if (res && res.surveyId) {
                    console.log(res);
                    const data = {};
                    let questionStr = res.find(i => i['question']);
                    let labels = [];
                    let values = [];
                    for (let i in res) {
                        if (i !== 'question') {
                            labels.append(i);
                            values.append(res[i]);
                        }
                    }
                    data['labels'] = labels;
                    data['datasets'][0]['data'] = values;
                    data['datasets'][0]['backgroundColor'] = [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    ];

                    return data;
                }
            });
    }

    render() {
        var surveyList = [];
        var data = this.state.listOfSurveys;
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                surveyList.push(
                    <option value={temp.surveyId}>{temp.surveyName}</option>
                );
            }, this);
        }
        return (
            <div>
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
                    {this.state.surveyStats.surveyName}
                </div>
                <div className="row margin-70">
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            START TIME
                        </div>
                        <div className="stat-data">
                            {this.state.surveyStats.startTime}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            END TIME
                        </div>
                        <div className="stat-data">
                            {this.state.surveyStats.endTime}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            # OF PARTICIPANTS
                        </div>
                        <div className="stat-data">
                            {this.state.surveyStats.noParticipants}
                        </div>
                    </div>
                    <div className="col-md-3 box-shadow-surveyape">
                        <div className="stat-heading">
                            PARTICIPANTS RATE
                        </div>
                        <div className="stat-data">
                            {this.state.surveyStats.participationRate}
                        </div>
                    </div>
                </div>
                <div className="row padd-200">
                    <div className="col-md-6">
                        <div className="stat-heading">
                            ANSWERS CHOSEN
                        </div>
                        <div>
                            <Doughnut data={data1}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="stat-heading">
                            ANSWERS GIVEN
                        </div>
                        <div>
                            <HorizontalBar data={data2}/>
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

import React, { Component } from 'react';
import '../App.css';
import * as  API from '../api/API';
import StarRatingComponent from 'react-star-rating-component';
import Calendar from 'react-calendar';

class ResponseComponentReadOnly extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionId : this.props.data.questionId,
            userid : localStorage.getItem("userId"),
            surveyid:this.props.surveyId,
            responseId:this.props.responseId
        }
    }

    renderOptions = (data) => {
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <option disabled={true} selected={this.props.data.responses[0].answers === temp?"selected":""} value={temp}>{temp}</option>
                );
            }, this);
            return optionsList;
        }
    }
    renderRadio = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input type="radio" name={this.props.data.questionId}
                           value={temp}
                           readonly
                           disabled={true}
                           checked={this.props.data.responses[0].answers === temp?true:false}
                    />{temp}
                    </span>
            )
            }, this);
            return optionsList;
        }
    }

    renderRadioImages = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input type="radio" name={this.props.data.questionId}
                           value={temp}
                           readonly
                           disabled={true}
                           checked={this.props.data.responses[0].answers === temp?true:false}
                    /><img className="img-height" src={temp}></img>
                    </span>
                )
            }, this);
            return optionsList;
        }
    }

    renderCheckboxSingle = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={temp}
                        id={temp}
                        type="checkbox"
                        readonly
                        value={temp}
                        disabled={true}
                        checked={this.props.data.responses[0].answers === temp?true:false}
                    />{temp}
                    </span>
                );
            }, this);
            return optionsList;
        }
    }


    renderCheckboxSingleImages = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={temp}
                        id={temp}
                        type="checkbox"
                        readonly
                        value={temp}
                        disabled={true}
                        checked={this.props.data.responses[0].answers === temp?true:false}
                    /><img className="img-height" src={temp}></img>
                    </span>
                );
            }, this);
            return optionsList;
        }
    }

    renderCheckboxMultiple = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <span>
                    <input
                        name={index}
                        type="checkbox"
                        readonly
                        value={temp}
                        checked={(this.props.data.responses[0].answers.indexOf(temp)>-1)?true:false}
                        disabled={true}
                    />{temp}
                    </span>
                );
            }, this);
            return optionsList;
        }
    }

    renderCheckboxMultipleImages = (data) =>{
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                {}
                optionsList.push(
                    <span>
                    <input
                        name={index}
                        type="checkbox"
                        readonly
                        disabled={true}
                        value={temp}
                        checked={(this.props.data.responses[0].answers.indexOf(temp)>-1)?true:false}
                    /><img className="img-height" src={temp}></img>
                    </span>
                );
            }, this);
            return optionsList;
        }
    }

  render() {
    return (
      <div className="row margin-70 margin-none">
          <div className="form-group resizedTextbox col-md-6">
                    <span>
                        {this.props.data.questionStr}
                    </span>
        <div className="margin-10">
            <div>
                RESPONSES RECORDED:
            </div>
              {(this.props.data.questionType === 0)?
                        <div>
                            {
                                (this.props.data.choiceType === "0")?

                                <div>

                                    {(this.props.data.answerType === "0") ?
                                        /*  Single*/
                                        <div>
                                            {(this.props.data.visualStyle === "0") ?
                                                <div>
                                                    <select className="form-control surveyape-input" name="cards" id="visualStyle"
                                                            aria-describedby="Visual style" placeholder="Visual style"
                                                            value={this.props.data.responses[0].answers}
                                                            readonly
                                                            disabled={true}
                                                    >
                                                        <option value=""> </option>
                                                        {this.renderOptions(this.props.data.options)}
                                                    </select>
                                                </div>
                                                :
                                                <div>
                                                    {(this.props.data.visualStyle === "1") ?
                                                        <div>
                                                            {this.renderRadio(this.props.data.options)}
                                                        </div>
                                                        :
                                                        <div>
                                                            {(this.props.data.visualStyle === "2") ?
                                                                <div>
                                                                    {this.renderCheckboxSingle(this.props.data.options)}
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        :
                                        /* Multiple*/
                                        <div>
                                            <div>
                                                {(this.props.data.visualStyle === "2") ?
                                                    <div>
                                                        {this.renderCheckboxMultiple(this.props.data.options)}
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    }

                                    </div>

                                    :
                                    /*For Images*/

                                    <div>

                                        {(this.props.data.answerType === "0") ?
                                            /*  Single*/
                                            <div>

                                                    <div>
                                                        {(this.props.data.visualStyle === "1") ?
                                                            <div>
                                                                {this.renderRadioImages(this.props.data.options)}
                                                            </div>
                                                            :
                                                            <div>
                                                                {(this.props.data.visualStyle === "2") ?
                                                                    <div>
                                                                        {this.renderCheckboxSingleImages(this.props.data.options)}
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        }
                                                    </div>

                                            </div>
                                            :
                                            /* Multiple*/
                                            <div>
                                                <div>
                                                    {(this.props.data.visualStyle === "2") ?
                                                        <div>
                                                            {this.renderCheckboxMultipleImages(this.props.data.options)}
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                        }


                                    </div>
                            }



                        </div>
              :
                <div>
                  {
                  (this.props.data.questionType === 1) ?

                      <div>
                          <input type="radio" name="question-radio-1" value="yes"
                                 readonly
                                 checked={this.props.data.responses[0].answers === "yes"?true:false}/>YES
                          <input type="radio" name="question-radio-1" value="no"
                                 readonly
                                 checked={this.props.data.responses[0].answers === "no"?true:false}/>NO
                      </div>
                      :
                      <div>
                          {
                              (this.props.data.questionType === 2) ?
                                  <div>
                                      <input type="text" className="form-control surveyape-input" id="questionStr"
                                             aria-describedby="questionStr" placeholder="Response"
                                             value={this.props.data.responses[0].answers}
                                             disabled={true}
                                      />
                                  </div>
                                  :
                                  <div>
                                      {
                                          (this.props.data.questionType === 3) ?
                                              <Calendar id="surveyEndTime" aria-describedby="Survey End Time"
                                                        placeholder="Survey End Time"
                                                        value={this.props.data.responses[0].answers}
                                              />
                                              :
                                              /*question 4*/
                                              <div>
                                                  {(this.props.data.questionType === 4) ?
                                                      <div>
                                                          <StarRatingComponent
                                                              name="rate1"
                                                              starCount={5}
                                                              editing={false}
                                                              value={this.props.data.responses[0].answers}
                                                          />
                                                      </div>

                                                      : null

                                                  }
                                              </div>
                                      }
                                  </div>
                          }
                      </div>
              }

                </div>
              }
        </div>
              <div>
              </div>
          </div>
      </div>
    );
  }
}

export default ResponseComponentReadOnly;

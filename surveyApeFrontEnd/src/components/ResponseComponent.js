import React, { Component } from 'react';
import '../App.css';
import * as  API from '../api/API';
import StarRatingComponent from 'react-star-rating-component';
import Calendar from 'react-calendar';

class ResponseComponent extends Component {
    constructor(props){
        super(props);
        var email = null
        if(this.props.accessCodeTemp && this.props.accessCodeTemp !== "open" ) {
            try {
                email = atob(this.props.accessCodeTemp);
            }
            catch (err) {
                alert("invalid link")
            }
        }
        else{
            if(localStorage.getItem("email")){
                email = localStorage.getItem("email");
            }
            if(localStorage.getItem("guestemail")){
                email = localStorage.getItem("guestemail");
                localStorage.removeItem("guestemail");
            }
        }
        this.state = {
            answer:this.props.answerTemp,
            checked : null,
            questionId : this.props.data.questionId,
            email : null,
            userid : localStorage.getItem("userId"),
            surveyid:this.props.surveyId,
            responseId:this.props.responseId,
            emailtaken :null,
            responseIds:[]
        }
    }
componentWillMount(){
    var email = null;

    if(this.props.accessCode && this.props.accessCode !== "open" ) {
        try {
            var self = this.state;
            email = atob(this.props.accessCode);
            self.email = email;
            this.setState(self);
        }
        catch (err) {
            alert("invalid link")
        }
    }
    else{
        var self = this.state;
        if(localStorage.getItem("email")){
            self.email = localStorage.getItem("email");
        }
        if(localStorage.getItem("guestemail")){
            self.email = localStorage.getItem("guestemail");
            localStorage.removeItem("guestemail");
        }
        this.setState(self);
    }
}
    onStarClick(nextValue, prevValue, name) {
        this.setState({answer: nextValue});
    }

    onChange = date => {
        this.setState({
            answer : date
        });
        alert(this.state.answer)
    }

    renderOptions = (data) => {
        var optionsList = [];
        if (data && data.length > 0) {
            data.map(function (temp, index) {
                optionsList.push(
                    <option value={temp}>{temp}</option>
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
                    <input type="radio" name={this.props.data.questionId} value={temp}
                           onChange={(event) => {
                               this.setState({
                                   answer: event.target.value
                               });
                           }}/>{temp}
                    </span>
            )
            }, this);
            return optionsList;
        }
    }
    saveResponse = () =>{
        if(!this.props.responseId ||  !this.state.responseIds[this.props.number]) {
            var self = this.state;
            self.questionId = this.props.data.questionId;
            API.saveResponse(self)
                .then((res) => {
                    console.log(res)
                    var responses = self.responseIds;
                    responses[this.props.number] = res.resId;
                    self.answer = "";
                    this.setState(self);
                    alert("Response Saved")

                });
        }
        else{
            var self = this.state;
            self.questionId = this.props.data.questionId;
            self.responseId = this.state.responseIds[this.props.number]
            API.updateResponse(self)
                .then((res) => {
                    console.log(res)
                    self.answer = "";
                    alert("Response Saved")
                });
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
                        value={temp}
                        onChange={(event) => {
                            var temp = this.props.data.options;
                            var val = event.target.value;
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i] !== val) {
                                    document.getElementById(temp[i]).checked = false;
                                }
                            }
                            this.setState({
                                answer: event.target.value
                            });
                            //console.log(this.state.answer)
                        }}
                    />{temp}
                    </span>
                );
            }, this);
            return optionsList;
        }
    }
    submitSurvey = () =>{
        var data={
            surveyId : this.props.surveyid,
            email : this.state.email || this.state.emailtaken
        }
        API.completeSurvey(data)
            .then((res) => {
                console.log(res)
                alert("Thank you for submitting your response!")
                window.location = "http://localhost:3000/"

            });
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
                        value={temp}
                        onChange={(event) => {
                            var temp = this.state.answer;
                            var val =  event.target.value;
                            var changed = false;
                            if(temp === null || temp.length === 0){
                                temp=[];
                                temp.push(val);
                            }
                            else {
                                for (let i = 0; i < temp.length; i++) {
                                    if (temp[i] === val) {
                                        temp.splice(i, 1);
                                        changed = true;
                                    }

                                }
                                if(!changed){
                                    temp.push(val);
                                }
                            }
                           // console.log(temp)
                            this.setState({
                                answer:temp
                            });
                        }}
                    />{temp}
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
              <div>
                  {this.props.answer}
              </div>
              <div>
                  {this.props.responseId}
              </div>
                    <span>
                        {this.props.data.questionStr}
                    </span>
        <div>
              {(this.props.data.questionType === 0)?
                        <div>
                            {(this.props.data.answerType === "0") ?
                              /*  Single*/
                                <div>
                                    {(this.props.data.visualStyle === "0") ?
                                        <div>
                                            <select className="form-control surveyape-input" name="cards" id="visualStyle"
                                                    aria-describedby="Visual style" placeholder="Visual style"
                                                    value={this.state.visualStyle}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            visualStyle: event.target.value
                                                        });
                                                    }}
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
                <div>
                  {
                  (this.props.data.questionType === 1) ?

                      <div>
                          <input type="radio" name="question-radio-1" value="yes"
                                 onChange={(event) => {
                                     this.setState({
                                         answer: event.target.value
                                     });
                                 }}/>YES
                          <input type="radio" name="question-radio-1" value="no"
                                 onChange={(event) => {
                                     this.setState({
                                         answer: event.target.value
                                     });
                                 }}/>NO
                      </div>
                      :
                      <div>
                          {
                              (this.props.data.questionType === 2) ?
                                  <div>
                                      <input type="text" className="form-control surveyape-input" id="questionStr"
                                             aria-describedby="questionStr" placeholder="Response"
                                             value={this.state.answer}
                                             onChange={(event) => {
                                                 this.setState({
                                                     answer: event.target.value
                                                 });
                                             }}
                                      />
                                  </div>
                                  :
                                  <div>
                                      {
                                          (this.props.data.questionType === 3) ?
                                              <Calendar id="surveyEndTime" aria-describedby="Survey End Time"
                                                        placeholder="Survey End Time"
                                                        onChange={this.onChange}
                                                        value={this.state.answer}
                                              />
                                              :
                                              /*question 4*/
                                              <div>
                                                  {(this.props.data.questionType === 4) ?
                                                      <div>
                                                          <StarRatingComponent
                                                              name="rate1"
                                                              starCount={5}
                                                              value={this.state.answer}
                                                              onStarClick={this.onStarClick.bind(this)}
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
              <button type="button" className="surveyape-button" id = "saveResponse" onClick={()=>this.saveResponse()}>SAVE RESPONSE</button>
              {
                  (!this.state.email && this.props.size === this.props.number + 1) ?
                      <div>
                          <span>Enter your email id to recieve a confirmation mail</span>
                          <input type="text" className="form-control surveyape-input" id="questionStr"
                                 aria-describedby="questionStr" placeholder="Response"
                                 value={this.state.emailtaken}
                                 onChange={(event) => {
                                     this.setState({
                                         emailtaken: event.target.value
                                     });
                                 }}
                          />
                      </div>
                      : null
              }

              <div>
              {(this.props.size === this.props.number + 1)?
                  <button type="button" className="surveyape-button" id = "submitSurvey" onClick={()=>this.submitSurvey()}>SUBMIT SURVEY</button>
                  :null}
              </div>
          </div>
      </div>
    );
  }
}

export default ResponseComponent;

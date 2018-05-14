import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';

class OpenSurveyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyLink:localStorage.getItem("openSurveyLink"),
            email:null
        }
    }
componentWillMount(){

}
    GoTosignup = () =>{
        window.location = "http://localhost:3000/signup";
    }
    GoTosignin = () =>{
        window.location = "http://localhost:3000/signin";
    }
    continue =() =>{
    //    localStorage.setItem("guestemail", this.state.email);
        var data={
            surveyId : localStorage.getItem("surveyId"),
            email: this.state.email
        }
        API.sendLinkForOpenUniqueSurvey(data)
            .then((res) => {
                console.log(res)
                if(res.code==400){
                    alert(res.msg)
                }
                else{
                    alert(res.msg)
                    window.location = "http://localhost:3000/"
                }

            });
        //var link = localStorage.getItem("openSurveyLink");
        localStorage.removeItem("openSurveyLink");
      //  window.location = "http://localhost:3000";
    }
  render() {
    return (
      <div className="row margin-none height-fixed">
          <div className="margin-70 col-md-6">
          <div>
              TO PROCEED
          </div>
          <div>
        <span className="surveyname-head" onClick={this.GoTosignin}>
            SIGN IN
        </span>
          </div>
          <div>
                OR
          </div>
          <div>
                <span className="surveyname-head" onClick={this.GoTosignup}>
                SIGN UP
                 </span>
          </div>
          <div>
                OR
          </div>
          <div className="surveyname-head">
                Enter your Email ID:  <input type="text" className="form-control surveyape-input" id="email" aria-describedby="questionStr" placeholder="Email"
                                             value={this.state.email}
                                             onChange={(event) => {
                                                 this.setState({
                                                     email: event.target.value
                                                 });
                                             }}
          />
          </div>
              <button type="button" className="surveyape-button" name="continue" id = "continue" onClick={()=>this.continue()}>CONTINUE</button>
          </div>
      </div>
    );
  }
}

export default OpenSurveyLogin;

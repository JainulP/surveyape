import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Ionicon from 'react-ionicons';

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
        this.props.history.push("/signup");
    }
    GoTosignin = () =>{
        this.props.history.push("/signin");
    }
    continue =() =>{
        localStorage.setItem("guestemail", this.state.email);
        var link = localStorage.getItem("openSurveyLink");
        localStorage.removeItem("openSurveyLink");
        window.location = "http://localhost:3000"+link;
    }
  render() {
    return (
      <div className="row margin-none">
          <div className="margin-70 col-md-6">
          <div>
              TO PROCEED
          </div>
          <div>
        <span className="surveyname-head" onClick={this.GoTosignup}>
            SIGN IN
        </span>
          </div>
          <div>
                OR
          </div>
          <div>
                <span className="surveyname-head" onClick={this.GoTosignin}>
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

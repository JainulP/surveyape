import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Route, withRouter,BrowserRouter } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import * as  API from '../api/API';

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:null,
            password:null
        }
    }

    validateEmail(){
        var x = document.getElementById("emailId").value;
        if(x.length==0)
        {
            document.getElementById("addValiadationEmail").innerHTML="Can't be empty";
            var x1 = document.getElementById("addValiadationEmail");
            x1.style.display = "block";
            x1.style.fontSize="small";
            x1.style.float="left";
            x1.style.color="red";
        }
        else{
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if( re.test(x))
            {
                document.getElementById("addValiadationEmail").innerHTML="Valid Email";
                var x1 = document.getElementById("addValiadationEmail");
                x1.style.display = "block";
                x1.style.fontSize="small";
                x1.style.float="left";
                x1.style.color="green";
            }
            else{
                document.getElementById("addValiadationEmail").innerHTML="Invalid Email";
                var x1 = document.getElementById("addValiadationEmail");
                x1.style.display = "block";
                x1.style.fontSize="small";
                x1.style.float="left";
                x1.style.color="red";
            }
        }
    }
    validatePassword(){
        var val = document.getElementById("exampleInputPassword1").value;
        if(val.length==0)
        {
            document.getElementById("addValiadationPassword").innerHTML="Can't be empty";
            var x1 = document.getElementById("addValiadationPassword");
            x1.style.display = "block";
            x1.style.fontSize="small";
            x1.style.float="left";
            x1.style.color="red";
        }
        else{
            var RegExpression =new RegExp("^[0-9]{8}$");
            if( RegExpression.test(val))
            {
                document.getElementById("addValiadationPassword").innerHTML="Valid Password";
                var x1 = document.getElementById("addValiadationPassword");
                x1.style.display = "block";
                x1.style.fontSize="small";
                x1.style.float="left";
                x1.style.color="green";
            }
            else{
                document.getElementById("addValiadationPassword").innerHTML="Invalid Password should be 8";
                var x1 = document.getElementById("addValiadationPassword");
                x1.style.display = "block";
                x1.style.fontSize="small";
                x1.style.float="left";
                x1.style.color="red";
            }
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="row pad-top-bottom-150">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <div>
                        <form>
                            <div className="form-group resizedTextbox">

                                <input type="email" className="form-control surveyape-input" id="emailId" aria-describedby="emailHelp" placeholder="Enter Email"
                                       onChange={(event) => {
                                           this.setState({
                                               email: event.target.value
                                           });
                                       }}
                                       onBlur={()=>this.validateEmail()}
                                />
                                <span id="addValiadationEmail"></span>
                            </div>
                            <div className="form-group resizedTextbox">

                                <input type="password" className="form-control surveyape-input" id="exampleInputPassword1" placeholder="Password"
                                       onChange={(event) => {
                                           this.setState({
                                               password: event.target.value
                                           });
                                       }}
                                />
                                <span id="addValiadationPassword"></span>
                            </div>
                            <div className="form-group resizedTextbox">
                                 </div>
                        </form>
                            <button className="surveyape-button" id = "saveUsrInfo1" onClick={()=>this.props.loginUser(this.state)}>SIGN IN</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}
export default withRouter(Login);

import React, { Component } from 'react';
import { SignIn, authenciate } from './index';
import { Redirect } from 'react-router-dom';

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirecttopagerefer: false
        }
    }

    handleChange = email => (event) => {
        this.setState({ [email]: event.target.value });
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const User = {
            email: email,
            password: password
        };
        SignIn(User)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error });
            } else {
                //authenciate
                authenciate(data, () => {
                    this.setState({ redirecttopagerefer: true })
                });
            } 
        })
        .catch(error => {
            console.log(error);
        })
    };

    SigninForm = (email, password) => (
        <form>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" value={email} onChange={this.handleChange("email")} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autoComplete="off" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={this.handleChange("password")} className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off" />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" onClick={this.onSubmit} className="btn bg-success">Submit</button>
        </form>
    );



    render() {
        const { email, password, redirecttopagerefer } = this.state;
        
        if(redirecttopagerefer) {
            return <Redirect to="/home" />
        }

        return (            
            <div className="">
                <div className="jumbotron">
                    <h1>SignIn</h1>
                </div>
                <div className="container">
                    { this.SigninForm(email, password) }
                </div>
            </div>
        );
    }
}

export default Signin;

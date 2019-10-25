import React, { Component } from 'react';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = name => (event) => {
        this.setState({ error: "" });
        this.setState({[name]: event.target.value});
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const User = {
            name: name,
            email: email,
            password: password
        }
        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)
        }).then(response => {
            if(response.error) return this.setState({ error: response.error });
            
        }).catch(err => {
            console.log(err);
        });   
    }

    SignupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" onChange={this.handleChange("name")}  className="form-control" placeholder="Enter Name" autoComplete="off" value={name} />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" onChange={this.handleChange("email")}  className="form-control" aria-describedby="emailHelp" placeholder="Enter email" autoComplete="off" value={email} />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.handleChange("password")}  className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} />
            </div>
            <div className=""> 
                <button type="submit" onClick={this.clickSubmit} className="btn bg-success">Submit</button>
            </div>
        </form>
    );

    render() {
        const {name, email, password, error, open } = this.state;

        return (
            <div className="">
                <div className="jumbotron">
                    <h1>SignUp</h1>
                    <p className="alert alert-primary" style={{ display: error ? "" : "none" }}>{ error }</p>
                </div>

                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    New Accout is Succesfully Created
                </div>
                
                <div className="container">
                    { this.SignupForm(name, email, password) }
                </div>
            </div>
        );
    }
}

export default Signup;
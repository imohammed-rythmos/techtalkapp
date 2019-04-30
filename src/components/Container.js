import React from "react";
import LoginForm from "./LoginForm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import WelcomePage from "./WelcomePage";
import WelcomePageStore from "./../stores/WelcomePageStore";

let users = [];
class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      message: "",
      isLoggedIn: false
    };
  }

  handleLogin = e => {
    e.preventDefault();
    if (this.state.userName.length < 1 || this.state.password < 1) {
      return alert("please fill values for username and password");
    }
    let findUsers = users.filter(user => user.userName === this.state.userName);
    if (findUsers.length > 0) {
      if (bcrypt.compareSync(this.state.password, findUsers[0].password)) {
        let token = jwt.sign(
          JSON.stringify({
            userName: findUsers[0].userName,
            password: findUsers[0].password
          }),
          "scretforpayload"
        );
        console.log(token);
        this.setState({
          isLoggedIn: true,
          message: "logged in succesfully"
        });
      } else {
        this.setState({
          message: "Please verify username and password"
        });
      }
    } else {
      this.setState({
        message: "Username not found, please register"
      });
    }
  };

  handleRegister = e => {
    e.preventDefault();
    if (this.state.userName.length < 1 || this.state.password < 1) {
      return alert("please fill values for username and password");
    }
    let findUsers = users.filter(user => user.userName === this.state.userName);
    if (findUsers.length > 0) {
      return alert(`username ${findUsers} already exists`);
    }
    let hashpwd = bcrypt.hashSync(this.state.password);

    users.push({
      userName: this.state.userName,
      password: hashpwd
    });

    this.setState({
      message: "Registered succesfully"
    });
  };

  handleLogout = () => {
    this.setState({
      userName: "",
      password: "",
      message: "Please register or login",
      isLoggedIn: false
    });
  };

  Container = () => {
    return (
      <div className="container" style={{ margin: "200px" }}>
        <LoginForm
          updatePassword={val => this.setState({ password: val })}
          updateUserName={val => this.setState({ userName: val })}
          handleLogin={this.handleLogin}
          handleRegister={this.handleRegister}
          userName={this.state.userName}
          password={this.state.password}
        />
        {this.state.message ? <aside>{this.state.message}</aside> : null}
      </div>
    );
  };

  render() {
    let Content = this.Container;
    return (
      <Provider WelcomePageStore={WelcomePageStore}>
        <Router>
          <Route
            path="/"
            render={() =>
              this.state.isLoggedIn ? (
                <div className="form-group" style={{ margin: "200px" }}>
                  <WelcomePage />
                  <div>
                    <button
                      className="btn-primary"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Content />
              )
            }
          />
        </Router>
      </Provider>
    );
  }
}

export default FormContainer;

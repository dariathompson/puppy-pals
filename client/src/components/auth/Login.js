import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginDog } from "../../actions/authActions";
import classnames from "classnames";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to profile
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/show");
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null; // Triggers no change in the state
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const dogData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginDog(dogData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    if (this.props.auth.isAuthenticated) return <Redirect to="/show" />;

    return (
      <div className="container" data-test="login-container">
        <div
          style={{
            marginTop: "4rem",
          }}
          className="row">
          <div className="col s8 offset-s2">
            <div
              className="col s12"
              style={{
                paddingLeft: "11.250px",
              }}>
              <h4>
                <b> Login </b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don 't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input data-test="username-input"
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username || errors.usernamenotfound,
                  })}
                />
                <label htmlFor="username"> Username </label>
                <span className="red-text">
                  {errors.username}
                  {errors.usernamenotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input data-test="password-input"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <label htmlFor="password"> Password </label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div
                className="col s12"
                style={{
                  paddingLeft: "11.250px",
                }}>
                <button data-test="submit-button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginDog })(Login);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerDog } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      age: "",
      breed: "",
      photo: null,
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
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
  // onSubmit = (e) => {
  //   e.preventDefault();

  // const data = new FormData();
  // data.append("name", this.state.name);
  // data.append("username", this.state.username);
  // data.append("age", this.state.age);
  // data.append("breed", this.state.breed);
  // data.append("photo", this.state.photo);
  // data.append("email", this.state.email);
  // data.append("password", this.state.password);
  // data.append("password2", this.state.password2);

  // const newDog = {
  //   name: this.state.name,
  //   username: this.state.username,
  //   age: this.state.age,
  //   breed: this.state.breed,
  //   photo: this.state.photo,
  //   email: this.state.email,
  //   password: this.state.password,
  //   password2: this.state.password2,
  // };

  // this.props.registerDog(data, this.props.history);
  // };

  onClickHandler = () => {
    // e.preventDefault();
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("username", this.state.username);
    data.append("age", this.state.age);
    data.append("breed", this.state.breed);
    data.append("photo", this.state.photo);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("password2", this.state.password2);

    this.props.registerDog(data, this.props.history);
  };

  onPhotoChange = (e) => {
    this.setState({
      photo: e.target.files[0],
      loaded: 0,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            {/* <Link to="/" className="btn-flat waves-effect">
             Back to home
            </Link> */}
            <div
              className="col s12"
              style={{
                paddingLeft: "11.250px",
              }}>
              <h4>
                <b> Register </b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account ? <Link to="/login"> Log in </Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor="name"> Name </label>
                <span className="red-text"> {errors.name} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username,
                  })}
                />
                <label htmlFor="username"> Username </label>
                <span className="red-text"> {errors.username} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.age}
                  error={errors.age}
                  id="age"
                  type="text"
                  className={classnames("", {
                    invalid: errors.age,
                  })}
                />
                <label htmlFor="age"> Age </label>
                <span className="red-text"> {errors.age} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.breed}
                  error={errors.breed}
                  id="breed"
                  type="text"
                  className={classnames("", {
                    invalid: errors.breed,
                  })}
                />
                <label htmlFor="breed"> Breed </label>
                <span className="red-text"> {errors.breed} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onPhotoChange}
                  error={errors.photo}
                  id="photo"
                  type="file"
                  className={classnames("", {
                    invalid: errors.photo,
                  })}
                />
                <span className="red-text"> {errors.photo} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email"> Email </label>
                <span className="red-text"> {errors.email} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password"> Password </label>
                <span className="red-text"> {errors.password} </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2"> Confirm Password </label>
                <span className="red-text"> {errors.password2} </span>
              </div>
              <div
                className="col s12"
                style={{
                  paddingLeft: "11.250px",
                }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="button"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick={() => {
                    this.onClickHandler();
                  }}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, {
    registerDog
  }
)(withRouter(Register));

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutDog } from "../../actions/authActions";

import { Link } from "react-router-dom";


class Profile extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutDog();
  };
  render() {

    const { dog } = this.props.auth;
    console.log(dog)

    return (
      <div data-test="profile-container" className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {dog.name}
              <p>age: {dog.age}</p>
              <p>breed: {dog.breed}</p>
            </h4>
            <img src={dog.photo} alt="You" width="300" />
            <div className="buttons">
              <Link
                to="/show"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginRight: "5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable red accent-3">
                Match
              </Link>

              <Link
                to="/matches"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginLeft: "5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable green accent-3">
                Matches
              </Link>
            </div>
            <div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // }
}
Profile.propTypes = {
  logoutDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutDog })(Profile);

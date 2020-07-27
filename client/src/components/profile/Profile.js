import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutDog } from "../../actions/authActions";
class Profile extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutDog();
  };
  render() {
    const { dog } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {dog.name}
              <p className="flow-text grey-text text-darken-1">
                You are logged into
                <span style={{ fontFamily: "monospace" }}> Doggy</span> dates 👏
              </p>
              <p>age: {dog.age}</p>
              <p>breed: {dog.breed}</p>
            </h4>
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
    );
  }
}
Profile.propTypes = {
  logoutDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutDog })(Profile);

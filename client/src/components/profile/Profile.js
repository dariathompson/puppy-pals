import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutDog } from "../../actions/authActions";
import { addImage } from "../../actions/dogActions";

import { Link } from "react-router-dom";


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  onClickHandler = () => {
    // e.preventDefault();
    const { dog } = this.props.auth;
    const data = new FormData();
    data.append("file", this.state.image);
    data.append("dog_id", dog.id);

    this.props.addImage(data);
  };

  onChange = (e) => {
    this.setState({
      image: e.target.files[0],
      loaded: 0,
    });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutDog();
  };
  render() {
    const { dog } = this.props.auth;

    var buf = Buffer.from(dog.photo.data, 'latin1');
    var profilePic = buf.toString('base64')

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
            <img src={`data:image/png;base64,${profilePic}`} alt="You" width="300" />
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
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  // value={this.state.image}
                  // id="image"
                  name="file"
                  type="file"
                />
              </div>
              {/* <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                add image
              </button> */}
              <button
                type="button"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                onClick={() => {
                  this.onClickHandler(dog.username);
                }}>
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  addImage: PropTypes.func.isRequired,
  logoutDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutDog, addImage })(Profile);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatches } from "../../actions/dogActions";
import { Link } from "react-router-dom";
import "./Matches.css";

class Matches extends Component {
  componentDidMount = () => {
    this.showMatches();
  };


  showMatches() {
    const { dog } = this.props.auth;
    const dogData = {
      username: dog.username,
    };
    this.props.showMatches(dogData);
  }

  render() {
    console.log(this.props)
    const matches = this.props.dogs.matches.map((match) => {
      return (
        <div key={match.username} className="card">
          <div className="col-6">
            <h4>
              <strong>{match.name}</strong>, <small>{match.age}</small>
            </h4>
            <p>{match.breed}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <h1>Matches</h1>
        {matches}
        <Link
          to="/profile"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
          }}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3">
          Profile
        </Link>
      </div>
    );
    
  }

}
  
Matches.propTypes = {
  showMatches: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    dogs: state.dogs
  }
};
export default connect(mapStateToProps, { showMatches })(Matches);
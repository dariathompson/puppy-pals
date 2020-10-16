import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showMatches } from "../../actions/dogActions";
import "./Matches.css";

export class Matches extends Component {
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
    const matches = this.props.dogs.matches.map((match) => {
      return (
        <div key={match.username} className="card hoverable" data-test="match-card">
          <div className="col-6">
            <img data-test="photo-element" src={match.photo} alt="Match" width="300" />
            <h4>
              <strong data-test="name-element">{match.name}</strong>, <small data-test="age-element">{match.age}</small>
            </h4>
            <p data-test="breed-element">{match.breed}</p>
            <a className="btn" href={"mailto:" + match.email}>
              Message
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="main-container" data-test="matches-container">
        <h1>Matches</h1>
        {matches}
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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showDogs } from "../../actions/dogActions";

class Show extends Component {

  componentDidMount = () => {
    const { dog } = this.props.auth;
    const dogData = {
      username: dog.username,
    };
    this.props.showDogs(dogData);
  }

  
  
  render() {
    const dogs = this.props.dogs.dogs.map((dog) => {
        return (
          <div key={dog.username} className="row volunteer-cards">
            <div className="col-6">  
              <h4>{dog.name}</h4>
              <p>{dog.breed}</p>
              <p>{dog.age}</p>
            </div>
        </div>
        )
      })

    return (
      <div>
        <h1>Dogs</h1>
        {dogs}
      </div>
    );

  }
}
Show.propTypes = {
  showDogs: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { showDogs })(Show);
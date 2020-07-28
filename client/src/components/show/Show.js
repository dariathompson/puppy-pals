import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showDogs } from "../../actions/dogActions";

class Show extends Component {

  constructor() {
    super();
    this.state = {
      dogs: [],
      // errors: {}
    };
  }

  componentDidMount = () => {
    const { dog } = this.props.auth;
    console.log(dog)
    const dogData = {
      username: dog.username,
    };
    this.props.showDogs(dogData);
  }


  render() {
    console.log("Hello")
    console.log(this.state)
    return(
      <h1>Dogs</h1>
      
    )

  }
}
Show.propTypes = {
  showDogs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { showDogs })(Show);
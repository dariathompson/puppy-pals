import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showDogs, like } from "../../actions/dogActions";
import { Link } from "react-router-dom";


class Show extends Component {
  componentDidMount = () => {
    const { dog } = this.props.auth;
    const dogData = {
      username: dog.username,
    };
    this.props.showDogs(dogData);
  };

  dislike = (e) => {
    e.preventDefault();
    console.log('not for me bro');
  };

  likeDog(e, likee){
    e.preventDefault();
    const { dog } = this.props.auth;
    const likeData = {
      likee: likee,
      liker: dog.username,
    }
    console.log(likeData);
    this.props.like(likeData);
  };

  render() {
    const dogs = this.props.dogs.dogs.map((dog) => {
      return (
        <div key={dog.username} className="row volunteer-cards">
          <div className="col-6">
            <h4>{dog.name}</h4>
            <p>{dog.breed}</p>
            <p>{dog.age}</p>
            <button
              onClick={this.dislike}
              className="btn btn-large waves-effect waves-light hoverable red accent-3">
              Dislike
            </button>
            <button
              onClick={(e) => {this.likeDog(e, dog.username)}}
              className="btn btn-large waves-effect waves-light hoverable green accent-3">
              Like
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className="container center-align">
        <h1>Dogs</h1>
        {dogs}
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
Show.propTypes = {
  showDogs: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { showDogs, like })(Show);
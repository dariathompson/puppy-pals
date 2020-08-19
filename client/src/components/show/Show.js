import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showDogs, like, dislike } from "../../actions/dogActions";
import { Link } from "react-router-dom";


class Show extends Component {
  componentDidMount = () => {
    this.show();
  };

  show() {
    console.log('show');
    const { dog } = this.props.auth;
    const dogData = {
      username: dog.username,
    };
    this.props.showDogs(dogData);
  }

  async dislikeDog(dislikee) {
    const { dog } = this.props.auth;
    const dislikeData = {
      dislikee: dislikee,
      disliker: dog.username,
    };
    const dislike_response = await this.props.dislike(dislikeData);
    this.show(dislike_response)
    // this.show();
  }

  async likeDog(likee) {
    const { dog } = this.props.auth;
    const likeData = {
      likee: likee,
      liker: dog.username,
    };
    console.log('start of like');
    const like_response = await this.props.like(likeData);
    this.show(like_response);
  }

  render() {
    if (this.props.dogs.dogs.length === 0){
      return (<div><h2>No more dogs</h2></div>)
    }else{
    const dogs = this.props.dogs.dogs.map((dog) => {
      return (
        <div key={dog.username} className="row volunteer-cards">
          <div className="col-6">
            <h4>{dog.name}</h4>
            <p>{dog.breed}</p>
            <p>{dog.age}</p>
            <button
              onClick={() => {
                this.dislikeDog(dog.username);
              }}
              className="btn btn-large waves-effect waves-light hoverable red accent-3">
              Dislike
            </button>
            <button
              onClick={() => {
                this.likeDog(dog.username);
              }}
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
}
Show.propTypes = {
  showDogs: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { showDogs, like, dislike })(Show);
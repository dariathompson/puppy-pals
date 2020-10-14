import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showDogs, like, dislike } from "../../actions/dogActions";
import "./Show.css";

import dislike_img from "../../assets/dislike.svg";
import like_img from "../../assets/like.svg";


class Show extends Component {
  constructor() {
    super();
    this.state = { match: null };
  }

  componentDidMount = () => {
    this.show();
  };


  show() {
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
    this.show(dislike_response);
  }

  async likeDog(likee) {
    const { dog } = this.props.auth;
    const likeData = {
      likee: likee,
      liker: dog.username,
    };
    const like_response = await this.props.like(likeData);
    if(like_response === "Match"){
      console.log("Yayy match");
      this.setState({match: likee})
    }
    this.show(like_response);
  }

  render() {
    let dogs;
    if(this.props.dogs.dogs.length > 0){
      dogs = this.props.dogs.dogs.map((dog) => {
        return (
          <div key={dog.username} className="card">
            <div className="col-6">
              <h4>
              <img src={dog.photo} alt="Dog" width="300" />
                <strong>{dog.name}</strong>, <small>{dog.age}</small>
              </h4>
              <p>{dog.breed}</p>
              <hr className="new1"/>
              <div className="tinder--buttons">
                <button
                  onClick={() => {
                    this.dislikeDog(dog.username);
                  }}>
                  <img src={dislike_img} alt="Dislike" />
                </button>
                <button
                  onClick={() => {
                    this.likeDog(dog.username);
                  }}>
                  <img src={like_img} alt="Like" />
                </button>
              </div>
            </div>
          </div>
        );
      });
    }else{
      dogs = <div><h4>There is no one new around you</h4></div>
    }
    
    return (
      
      <div className="main-container">
        { this.state.match && (
        <div className="match-container">
          <h2>Its a match</h2>
          <button className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={() => {this.setState({match: null})}}>Next</button>
        </div>
        
      ) }
        {dogs}

      </div>
    );
    
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
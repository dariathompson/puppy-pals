import React, { Component } from "react";

import dog from '../../assets/bg_dog.png';

class Landing extends Component {
  render() {
    return (
      <div data-test="landing-container" style={{ height: "calc(100vh-60px)"}}>
          <div
          className="row"
          style={{ margin: "0", position: "absolute", bottom: "0" }}
          >
          <div className="col s12 m6">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>
                <b>Puppy Pals</b>
              </h3>
              <div>Easy way to find a new play date</div>
              </div>
            </div>
            <div className="col s12 m6">
              <img src={dog} width="80%" alt="dog"></img>
            </div>
          </div>
      </div>
    );
  }
}
export default Landing;

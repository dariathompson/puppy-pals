import React, { Component } from "react";
import dog from '../../assets/bg_dog.png';
import bg from '../../assets/bg.jpg'


class Landing extends Component {
  render() {
    return (
      <body style={{ height: "calc(100vh-60px)"}}>
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
            <img src={dog} style={{maxHeight: "90vh"}} ></img>
          </div>
        </div>
      </body>
    );
  }
}
export default Landing;

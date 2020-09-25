import React, { Component } from "react";
import dog from '../../assets/bg_dog.png';
import bg from '../../assets/bg.jpg'


class Landing extends Component {
  render() {
    return (
      // <div style={{
      //   height: "100vh",
      //   backgroundImage: `url(${bg})`,
      //   backgroundPosition: "50% 50%",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat"
      // }}>
      <div style={{position: "relative", height: "100vh"}} >
      {/* <div
        className="container" style={{position:"absolute", top: "0"}}> */}
          <div className="row" style={{margin: "0", position:"absolute", bottom: "0"}}>
            <div className="col s12 m6">
              <div style={{display: "flex", flexDirection: "column"}}>
                <h3>
                    <b>Puppy Pals</b>
                </h3>
                <div>
                  Easy way to find a new play date
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <img src={dog} width="80%"></img>
            </div>
          </div>
      {/* </div> */}
    </div>
      

    );
  }
}
export default Landing;

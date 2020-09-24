import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/user.png"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutDog } from "../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";



class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutDog();
  };

  componentDidMount() {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }

  render() {

    return (
      <div>
        <nav>
          <div class="nav-wrapper black" style={{paddingLeft: "3%"}}>
            <a href="#!" class="brand-logo">
              P U P P Y
            </a>
            <a href="#" data-target="slide-out" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
              <li>
                <a href="#login">Login</a>
              </li>
              <li>
                <a href="#getStarted">Get Started</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul class="sidenav" id="slide-out">
          <li>
            <a href="#login">Login</a>
          </li>
          <li>
            <a href="#getStarted">Get Started</a>
          </li>
        </ul>
      </div>
    );
  }
  //     <div className="NavBar">
  //       <nav>
  //         <div className="container">
  //           <a
  //             href="#"
  //             data-target="slide-out"
  //             class="sidenav-trigger show-on-large">
  //             <i class="material-icons">menu</i>
  //           </a>
  //           <ul id="nav-mobile" class="right hide-on-med-and-down">
  //             <li>
  //               <a href="#">Home</a>
  //             </li>
  //             <li>
  //               <a href="#">About</a>
  //             </li>
  //           </ul>
  //           <ul id="slide-out" class="sidenav">
  //             <li>
  //               <a href="#item1">Item 1</a>
  //             </li>
  //             <li>
  //               <a href="#item2">Item 2</a>
  //             </li>
  //             <li>
  //               <a href="#item3">Item 3</a>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav>
  //     </div>
  //   );
  // }
}

Navbar.propTypes = {
  logoutDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutDog })(Navbar);

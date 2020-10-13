import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    const isLoggedIn = this.props.auth.isAuthenticated
    let buttons;
    if (isLoggedIn) {
      buttons = 
      <div>
        <li>
          <Link to="/show">Match</Link>
        </li>
        <li>
          <Link to="/matches">Matches</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link onClick={this.onLogoutClick}>Logout</Link>
        </li>
      </div>;
    } else {
      buttons = 
      <div>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Get Started</Link>
        </li>
      </div>;
    }
    return (
      <div>
        <nav>
          <div className="nav-wrapper black" style={{paddingLeft: "3%"}}>
            <a href="/" className="brand-logo">
              P U P P Y
            </a>
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-med-and-down">
              {buttons}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="slide-out">
          {buttons}
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutDog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutDog })(Navbar);

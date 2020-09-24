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
          <div className="nav-wrapper black" style={{paddingLeft: "3%"}}>
            <a href="/" class="brand-logo">
              P U P P Y
            </a>
            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Get Started</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="slide-out">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Get Started</Link>
          </li>
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

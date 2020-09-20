import React, { Fragment } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";


const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "active";
  } else {
    return "";
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to="/" className="navbar-brand">
     <p style={{fontFamily:"sans-serif"}}>GroceryBag</p>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-333"
        aria-controls="navbarSupportedContent-333"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
        <ul className="navbar-nav mr-auto">
          <li className={"nav-item" + isActive(history, "/")}>
            <Link className="nav-link" to="/">
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={"nav-item" + isActive(history, "/shop")}>
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
          </li>
          <li className={"nav-item" + isActive(history, "/cart")}>
            <Link className="nav-link" to="/cart">
              <i className="shopping cart icon"></i>
              {itemTotal() !== 0 ? (
                <sup>
                  <small className="ui circular tiny label">
                    {itemTotal()}
                  </small>
                </sup>
              ) : null}
            </Link>
          </li>
          {isAuthenticated() && (
            <Fragment>
              <li className="text-warning mt-2">
                Welcome {isAuthenticated().user.name}
              </li>
            </Fragment>
          )}
        </ul>
        <ul className="navbar-nav ml-auto nav-flex-icons">
          {!isAuthenticated() && (
            <div className="ui two buttons">
              <NavLink style={{ color: "white" }} to="/signin">
                <button className="ui green button">Log In</button>
              </NavLink>
              <NavLink style={{ color: "white" }} to="/signup">
                <button className="ui red button">Sign Up</button>
              </NavLink>
            </div>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Fragment>
              <li
                className={"nav-item" + isActive(history, "/admin/dashboard")}
              >
                <Link className="nav-link" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Fragment>
              <li className={"nav-item" + isActive(history, "/user/dashboard")}>
                <Link className="nav-link" to="/user/dashboard">
                  Dashboard
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="ui red button"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);

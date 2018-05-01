import React, { Component } from "react";
import "./WebsiteTitle.css";
import { NavbarBrand } from "reactstrap";

class WebsiteTitle extends Component {
  render() {
    return (
      <NavbarBrand id="Navbar-brand" href="/">
        <img src={this.props.img} alt="nasdaq-private-market-logo" width="150px" />
      </NavbarBrand>
    );
  }
}

export default WebsiteTitle;

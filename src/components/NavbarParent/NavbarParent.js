import React, { Component } from "react";
import "./NavbarParent.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import WebsiteTitle from "../WebsiteTitle";

class NavbarParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isTop: true,
      navbarBackground: "transparent",
      navTextColor: this.props.settings.primaryBackgroundColor,
      navShadow: "none",
      websiteLogoImage: this.props.settings.logoActive
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getNavLinkList = this.getNavLinkList.bind(this);
  }

  handleStyleChange(condition) {
    if (condition) {
      this.setState({
        navbarBackground: "transparent",
        navTextColor: this.props.settings.primaryBackgroundColor,
        navShadow: "none",
        websiteLogoImage: this.props.settings.logoActive
      });
    } else {
      this.setState({
        navbarBackground: this.props.settings.primaryBackgroundColor,
        navTextColor: this.props.settings.highlightTextColor,
        navShadow: "0 2px 5px 0 grey",
        websiteLogoImage: this.props.settings.logoPassive
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });

    // check that the window isn't at top
    const isTop = window.scrollY < 350;

    // change styles as appropriate
    if (isTop) {
      this.handleStyleChange(this.state.isOpen);
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 350;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });

        // change styles as appropriate
        this.handleStyleChange(this.state.isTop);
      }
    });
  }

  getNavLinkList() {
    return this.props.data.map((navLink, i) => {
      return (
        <NavItem key={"navItem_" + i}>
          <NavLink
            href={navLink.href}
            disabled={navLink.disabled}
            style={{ color: navLink.disabled ? null : this.state.navTextColor }}
          >
            {navLink.label}
          </NavLink>
        </NavItem>
      );
    });
  }

  render() {
    // initialize togglerStatus element to decide color
    let togglerStatus;

    // decide the color of the interior
    if (this.state.isTop) {
      // if we're at the top of the screen AND the toggler is open, make the colors active
      if (this.state.isOpen) {
        togglerStatus = "active";

      // if we're at the top of the screen AND the toggler is closed, make the colors passive
      } else {
        togglerStatus = "passive";
      }

    // if we're NOT at the top, make the colors active
    } else {
      togglerStatus = "active";
    }

    return (
      <Navbar
        fixed="top"
        expand="md"
        style={{
          background: this.state.navbarBackground,
          boxShadow: this.state.navShadow
        }}
      >
        <WebsiteTitle img={this.state.websiteLogoImage} />
        <NavbarToggler
          style={{ borderColor: this.state.navTextColor }}
          onClick={this.toggle}
          className={"NavbarToggler-" + togglerStatus}
        />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.getNavLinkList()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavbarParent;

import React, { Component } from "react";
import "./FooterParent.css";

class FooterParent extends Component {
  render() {
    return (
      <footer
        className="footer"
        style={{ background: this.props.settings.accentBackgroundColor }}
      >
        <div className="container Footer-content">
          <h2 className="Footer-header">
            Nasdaq Private Market
          </h2>
          <p style={{ fontSize: "0.75rem" }}>© 2018 NASDAQ. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default FooterParent;

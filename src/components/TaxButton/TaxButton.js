import React, { Component } from "react";
import "./TaxButton.css";

class TaxButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.data.handleClick(this.props.side);
  }

  render() {
    return (
      <div
        className="TaxButton"
        onClick={this.handleClick}
        style={{
          backgroundColor:
            this.props.data.selectedButton === this.props.side
              ? this.props.settings.accentBackgroundColor
              : this.props.settings.secondaryBackgroundColor,
          color:
            this.props.data.selectedButton === this.props.side
              ? this.props.settings.primaryBackgroundColor
              : this.props.settings.primaryTextColor
        }}
      >
        <div className="TaxButton-content">{this.props.children}</div>
      </div>
    );
  }
}

export default TaxButton;

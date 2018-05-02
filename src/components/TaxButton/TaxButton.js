import React, { Component } from "react";
import "./TaxButton.css";
import { Tooltip } from "reactstrap";

class TaxButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  handleClick() {
    this.props.data.handleClick(this.props.side);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <div>
        <div
          className="TaxButton"
          id={"TaxButton-" + this.props.side}
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
        <Tooltip
          placement="top"
          isOpen={this.state.tooltipOpen}
          target={"TaxButton-" + this.props.side}
          toggle={this.toggle}
        >
          {this.props.data.tooltips[this.props.side]}
        </Tooltip>
      </div>
    );
  }
}

export default TaxButton;

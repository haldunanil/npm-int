import React, { Component } from "react";
import "./TaxButton.css";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Octicon from "react-octicon";

class TaxButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  handleClick() {
    if (!this.props.data.payingTaxes.rsuButtonDisabled) {
      this.props.data.payingTaxes.handleClick(this.props.side);
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <div
          className={
            "TaxButton TaxButton-animations" +
            (this.props.data.payingTaxes.rsuButtonDisabled
              ? "-disabled"
              : "-enabled")
          }
          id={"TaxButton-" + this.props.side}
          onClick={this.handleClick}
          style={{
            backgroundColor:
              this.props.data.payingTaxes.selectedButton === this.props.side
                ? this.props.settings.accentBackgroundColor
                : this.props.settings.secondaryBackgroundColor,
            color:
              this.props.data.payingTaxes.selectedButton === this.props.side
                ? this.props.settings.primaryBackgroundColor
                : this.props.settings.primaryTextColor
          }}
        >
          <div className="TaxButton-content">{this.props.children}</div>
        </div>
        <div id={"Popover-" + this.props.side} onClick={this.toggle}>
          <Octicon name="question" mega />
        </div>
        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.side}
          toggle={this.toggle}
        >
          <PopoverHeader>What does this mean?</PopoverHeader>
          <PopoverBody>
            {this.props.data.payingTaxes.tooltips[this.props.side]}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default TaxButton;

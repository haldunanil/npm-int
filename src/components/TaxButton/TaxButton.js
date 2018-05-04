import React, { Component } from "react";
import "./TaxButton.css";
import { Tooltip, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Octicon from "react-octicon";

class TaxButton extends Component {
  constructor(props) {
    super(props);
    this.checkDisabled = this.checkDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tooltipToggle = this.tooltipToggle.bind(this);
    this.popoverToggle = this.popoverToggle.bind(this);
    this.state = {
      tooltipOpen: false,
      popoverOpen: false
    };
  }

  checkDisabled() {
    return (
      this.props.data.payingTaxes.rsuButtonDisabled &&
      this.props.side === "left"
    );
  }

  handleClick() {
    if (!this.checkDisabled()) {
      this.props.data.payingTaxes.handleClick(this.props.side);
    }
  }

  tooltipToggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  popoverToggle() {
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
            (this.checkDisabled() ? "-disabled" : "-enabled")
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
        {this.checkDisabled() ? (
          <Tooltip
            placement="bottom"
            isOpen={this.state.tooltipOpen}
            target={"TaxButton-" + this.props.side}
            toggle={this.tooltipToggle}
          >
            This option is currently unavailable
          </Tooltip>
        ) : null}

        <div id={"Popover-" + this.props.side} onClick={this.popoverToggle}>
          <Octicon name="question" mega />
        </div>
        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.side}
          popoverToggle={this.popoverToggle}
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

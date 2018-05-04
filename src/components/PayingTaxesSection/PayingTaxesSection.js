import React, { Component } from "react";
import "./PayingTaxesSection.css";
import Section from "../Section";
import TaxButton from "../TaxButton";
import Details from "../Details";
import ButtonSet from "../ButtonSet";
import {
  Row,
  Col,
  Fade,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

class PayingTaxesSection extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <Section
        header={this.props.data.payingTaxes.header}
        backgroundColor={this.props.settings.primaryBackgroundColor}
      >
        <p>
          You have the option to pay taxes either by check or by liquidating a
          portion of your RSUs. Depending on your tax rate and what percentage
          of your RSUs you want to sell, different options might work better.
        </p>
        <Row>
          <Col>
            <TaxButton
              side="left"
              data={this.props.data}
              settings={this.props.settings}
            >
              I want to pay taxes by selling some RSUs.
            </TaxButton>
          </Col>
          <Col>
            <TaxButton
              side="right"
              data={this.props.data}
              settings={this.props.settings}
            >
              I want to pay taxes upfront with a check.
            </TaxButton>
          </Col>
        </Row>
        {!!this.props.data.payingTaxes.selectedButton &&
        !!this.props.data.sellingRsus.numRsusOnSale &&
        !!this.props.data.taxRate.taxRate ? (
          <Fade in={!!this.props.data.payingTaxes.selectedButton}>
            {this.props.data.payingTaxes.selectedButton === "left" ? (
              <Details side={this.props.data.payingTaxes.selectedButton}>
                <p>
                  This is what you will owe in taxes and what your net proceeds
                  from the sale will look like:
                </p>
                <p>
                  <strong>
                    {this.props.calculators.calculateLiquidationShares()} RSUs
                    will be liquidated to pay for taxes.
                  </strong>{" "}
                  <a
                    id="PopoverInfoLeft"
                    onClick={this.toggle}
                    style={{ color: this.props.settings.highlightTextColor }}
                  >
                    Why this amount?
                  </a>
                  <Popover
                    placement="top"
                    isOpen={this.state.popoverOpen}
                    target="PopoverInfoLeft"
                    toggle={this.toggle}
                  >
                    <PopoverHeader>Why this amount?</PopoverHeader>
                    <PopoverBody>
                      Unlike stock options, RSUs are taxed immediately when they
                      vest. As a result, regardless of whether you're
                      liquidating all of your RSUs, you still have to pay the
                      taxes on all{" "}
                      {this.props.calculators.makeNumberMoreReadable(
                        this.props.data.header.numRsusAvail
                      )}.
                    </PopoverBody>
                  </Popover>
                </p>
                <ul style={{ textAlign: "left" }}>
                  <li>
                    After the liquidation, you will have{" "}
                    {this.props.calculators.calculatePosttaxShares()} RSUs.
                  </li>
                  <li>
                    Your net proceeds from this sale will be{" "}
                    {this.props.calculators.calculatePosttaxProceeds()}.
                  </li>
                </ul>
                <ButtonSet
                  backButton={this.props.data.payingTaxes.resetData}
                  nextButton={this.props.data.modal.open}
                />
              </Details>
            ) : (
              <Details side={this.props.data.payingTaxes.selectedButton}>
                <p>
                  This is what you will owe in taxes and what your net proceeds
                  from the sale will look like:
                </p>
                <p>
                  <strong>
                    You will need to submit a check for{" "}
                    {this.props.calculators.calculateCheckAmount()}.
                  </strong>{" "}
                  Details will be provided in "Review" section.{" "}
                  <a
                    id="PopoverInfoRight"
                    onClick={this.toggle}
                    style={{ color: this.props.settings.highlightTextColor }}
                  >
                    Why this amount?
                  </a>
                  <Popover
                    placement="top"
                    isOpen={this.state.popoverOpen}
                    target="PopoverInfoRight"
                    toggle={this.toggle}
                  >
                    <PopoverHeader>Why this amount?</PopoverHeader>
                    <PopoverBody>
                      Unlike stock options, RSUs are taxed immediately when they
                      vest. As a result, regardless of whether you're
                      liquidating all of your RSUs, you still have to write a
                      check to pay the taxes on all{" "}
                      {this.props.calculators.makeNumberMoreReadable(
                        this.props.data.header.numRsusAvail
                      )}.
                    </PopoverBody>
                  </Popover>
                </p>
                <ul style={{ textAlign: "left" }}>
                  <li>
                    After the liquidation, you will have{" "}
                    {this.props.calculators.calculatePosttaxShares()} RSUs.
                  </li>
                  <li>
                    Your net proceeds from this sale (after accounting for the
                    check) will be{" "}
                    {this.props.calculators.calculatePosttaxProceeds()}.
                  </li>
                </ul>
                <ButtonSet
                  backButton={this.props.data.payingTaxes.resetData}
                  nextButton={this.props.data.modal.open}
                />
              </Details>
            )}
          </Fade>
        ) : null}
      </Section>
    );
  }
}

export default PayingTaxesSection;

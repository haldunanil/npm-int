import React, { Component } from "react";
import "./ConfirmationModal.css";
import { Modal, ModalHeader, ModalBody, Container, Row, Col } from "reactstrap";
import ButtonSet from "../ButtonSet/ButtonSet";

class ConfirmationModal extends Component {
  makePretaxSummary() {
    return (
      <div>
        <p>
          <strong>
            You are selling {this.props.data.header.numRsusOnSale} RSUs at a
            price of ${this.props.data.header.shareValue} per share.
          </strong>
        </p>
        <ul>
          <li>
            You are eligible to receive{" "}
            {this.props.calculators.calculatePretaxShares()} shares of stock for
            the {this.props.data.header.companyName}.
          </li>
          <li>
            Your pre-tax proceeds from the sale are{" "}
            {this.props.calculators.calculatePretaxProceeds()}.
          </li>
        </ul>
      </div>
    );
  }

  makeButtonSet() {
    return (
      <div>
        <ButtonSet
          backButton={this.props.data.modal.close}
          nextButton={this.props.data.modal.addStep}
          size={4}
          style={{ paddingTop: 10 }}
          backText="Back"
          nextText="Submit"
        />
        <Row>
          <small style={{ color: this.props.settings.secondaryTextColor }}>
            Your sale will not be processed until you hit "Submit"
          </small>
        </Row>
      </div>
    );
  }

  makeConfirmation() {
    return (
      <div>
        <p>
          <strong>Your order has been processed successfully!</strong>
        </p>
        <ul>
          <li>
            You will receive {this.props.calculators.calculatePosttaxShares()}{" "}
            shares of {this.props.data.header.companyName}.
          </li>
          <li>
            Your net proceeds from the sale are{" "}
            {this.props.calculators.calculatePosttaxProceeds()}.
          </li>
        </ul>
      </div>
    );
  }

  makeCheck() {
    return (
      <div>
        <p>
          <strong>
            You have elected to write a check to pay for the taxes associated
            with this sale.
          </strong>
        </p>
        <ul>
          <li>
            Please write a check payable do:{" "}
            <strong>{this.props.data.header.companyName}</strong>
          </li>
          <li>
            In the amount of:{" "}
            <strong>{this.props.calculators.calculateCheckAmount()}</strong>
          </li>
          <li>
            Memo containing:{" "}
            <strong>{this.props.data.header.memoContents}</strong>
          </li>
          <li>
            Mail to: <strong>{this.props.data.header.companyAddress}</strong>
          </li>
        </ul>
      </div>
    );
  }

  makeInterior() {
    if (
      this.props.data.modal.step === 1 &&
      this.props.data.payingTaxes.selectedButton === "left"
    ) {
      return (
        <div>
          <ModalHeader toggle={this.props.data.modal.toggle}>
            Order Summary
          </ModalHeader>
          <ModalBody>
            {this.makePretaxSummary()}
            <p>
              <strong>
                You have elected to liquidate RSUs to pay for the taxes
                associated with this sale.
              </strong>
            </p>
            <ul>
              <li>
                At your reported tax rate of {this.props.data.taxRate.taxRate}%,{" "}
                {this.props.data.taxRate.taxRate *
                  this.props.data.header.numRsusAvail /
                  100}{" "}
                RSUs will be liquidated to pay the taxes owed.
              </li>
              <li>
                After taking taxes into account, you will receive{" "}
                {this.props.calculators.calculatePosttaxShares()} shares of Acme
                Corp.
              </li>
              <li>
                Your net proceeds from the sale are{" "}
                {this.props.calculators.calculatePosttaxProceeds()}.
              </li>
            </ul>
            {this.makeButtonSet()}
          </ModalBody>
        </div>
      );
    } else if (
      this.props.data.modal.step === 2 &&
      this.props.data.payingTaxes.selectedButton === "left"
    ) {
      return (
        <div>
          <ModalHeader toggle={this.props.data.modal.toggle}>
            Order Confirmation
          </ModalHeader>
          <ModalBody>{this.makeConfirmation()}</ModalBody>
        </div>
      );
    } else if (
      this.props.data.modal.step === 1 &&
      this.props.data.payingTaxes.selectedButton === "right"
    ) {
      return (
        <div>
          <ModalHeader toggle={this.props.data.modal.toggle}>
            Order Summary
          </ModalHeader>
          <ModalBody>
            {this.makePretaxSummary()}
            <p>
              <strong>
                Once we receive and process your check, you will receive the
                following:
              </strong>
            </p>
            <ul>
              <li>
                After taking taxes into account, you will receive{" "}
                {this.props.calculators.calculatePosttaxShares()} shares of{" "}
                {this.props.data.header.companyName}.
              </li>
              <li>
                Your net proceeds (distributions minus check amount) from the
                sale are {this.props.calculators.calculatePosttaxProceeds()}.
              </li>
            </ul>
            {this.makeCheck()}
            {this.makeButtonSet()}
          </ModalBody>
        </div>
      );
    } else if (
      this.props.data.modal.step === 2 &&
      this.props.data.payingTaxes.selectedButton === "right"
    ) {
      return (
        <div>
          <ModalHeader toggle={this.props.data.modal.toggle}>
            Order Confirmation
          </ModalHeader>
          <ModalBody>
            {this.makeConfirmation()}
            {this.makeCheck()}
          </ModalBody>
        </div>
      );
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.data.modal.isOpen}
        toggle={this.props.data.modal.toggle}
        className="ConfirmationModal"
      >
        {this.makeInterior()}
      </Modal>
    );
  }
}

export default ConfirmationModal;

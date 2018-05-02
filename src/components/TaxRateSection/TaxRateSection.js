import React, { Component } from "react";
import "./TaxRateSection.css";
import Section from "../Section";
import {
  Form,
  FormGroup,
  FormText,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";

class TaxRateSection extends Component {
  render() {
    return (
      <Section
        header={this.props.data.taxRate.header}
        backgroundColor={this.props.settings.secondaryBackgroundColor}
      >
        <p>
          You have the option to pay taxes either by check or by liquidating a
          portion of your RSUs. Before we get there, let's start by entering
          your tax rate.
        </p>

        <Form>
          <FormGroup>
            <Row>
              <Col sm={6}>
                <InputGroup>
                  <Input
                    type="number"
                    name="tax-rate"
                    id="taxRate"
                    placeholder="Tax rate"
                    value={this.props.data.taxRate.taxRate}
                    onChange={this.props.data.taxRate.handleChange}
                    min={0}
                    max={99}
                  />
                  <InputGroupAddon addonType="append">%</InputGroupAddon>
                </InputGroup>
                <FormText style={{ textAlign: "left" }}>
                  If you aren't sure what your tax rate is, please check with
                  your lawyer and/or financial planner for an appropriate value.
                  The IRS also has some helpful documentation, which you may
                  find useful to consult.
                </FormText>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Section>
    );
  }
}

export default TaxRateSection;

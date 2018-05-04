import React, { Component } from "react";
import "./SellingRsusSection.css";
import Section from "../Section";
import Details from "../Details";
import {
  Form,
  FormGroup,
  Row,
  Col,
  InputGroup,
  Input,
  Fade,
  Button
} from "reactstrap";

class SellingRsusSection extends Component {
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  render() {
    const displayField = this.props.data.header.numRsusAvail !== 0;

    return (
      <Section
        header={this.props.data.sellingRsus.header}
        id={this.props.data.sellingRsus.id}
        backgroundColor={this.props.settings.primaryBackgroundColor}
      >
        <p>
          Once RSUs vest, they can either be converted to regular company stock
          and kept as investment in the company or sold for cash. Depending on
          your needs, you can opt to keep some all RSUs as stock, sell some RSUs
          for cash and keep the rest, or sell all of them for cash.
        </p>

        {displayField ? (
          <div>
            <p>Please select how much you would prefer to sell below:</p>

            <Form onKeyPress={this.onKeyPress}>
              <FormGroup>
                <Row>
                  <Col lg={6}>
                    <InputGroup>
                      <Input
                        type="number"
                        name="rsu-quantity"
                        id="rsuQuantity"
                        placeholder="RSUs"
                        value={this.props.data.sellingRsus.numRsusOnSale}
                        onChange={this.props.data.sellingRsus.handleChange}
                        min={0}
                        max={this.props.data.header.numRsusAvail}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          @ ${this.props.data.header.shareValue} / share
                        </span>
                      </div>
                    </InputGroup>
                  </Col>
                  <Col lg={2}>
                    <Button
                      color="primary"
                      className="SellAll-button"
                      onClick={this.props.data.sellingRsus.handleSellAll}
                      block
                    >
                      Sell All
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>

            <Fade
              className="SellingRsus-summary"
              in={!!this.props.data.sellingRsus.numRsusOnSale}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Details>
                <p>
                  <strong>
                    You are selling{" "}
                    {this.props.calculators.makeNumberMoreReadable(
                      this.props.data.sellingRsus.numRsusOnSale
                    )}{" "}
                    ({this.props.calculators.calculatePercSharesSold()}% of
                    total vested) RSUs.
                  </strong>
                </p>

                <ul style={{ textAlign: "left" }}>
                  <li>
                    You will retain{" "}
                    {this.props.calculators.calculatePretaxShares()} shares of
                    Acme Corp. after this sale.
                  </li>
                  <li>
                    Your pre-tax proceeds from this sale will be{" "}
                    {this.props.calculators.calculatePretaxProceeds()}.
                  </li>
                </ul>
              </Details>
            </Fade>
          </div>
        ) : (
          <div>
            <Details>
              <p>
                <strong>
                  You have no new RSUs to sell. Please check back later!
                </strong>
              </p>

              <ul style={{ textAlign: "left" }}>
                <li>
                  If you think this is a mistake, please contact your policy administrator.
                </li>
              </ul>
            </Details>
          </div>
        )}
      </Section>
    );
  }
}

export default SellingRsusSection;

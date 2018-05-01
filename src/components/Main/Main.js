import React, { Component } from "react";
import "./Main.css";
import HeaderParent from "../HeaderParent";
import SellingRsusSection from "../SellingRsusSection";
import TaxRateSection from "../TaxRateSection";
import PayingTaxesSection from "../PayingTaxesSection";
import AlertSection from "../AlertSection";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

class Main extends Component {
  render() {
    return (
      <div>
        <HeaderParent
          backgroundImage={this.props.data.header.backgroundImage}
          numRsusAvail={this.props.data.header.numRsusAvail}
          headline={this.props.data.header.headline}
          callToAction={this.props.data.header.callToAction}
          href={this.props.data.header.callToActionHref}
        />
        <AlertSection
          data={this.props.data}
          settings={this.props.settings}
          calculators={this.props.calculators}
        />
        <SellingRsusSection
          data={this.props.data}
          settings={this.props.settings}
          calculators={this.props.calculators}
        />
        <TaxRateSection
          data={this.props.data}
          settings={this.props.settings}
          calculators={this.props.calculators}
        />
        <PayingTaxesSection
          data={this.props.data}
          settings={this.props.settings}
          calculators={this.props.calculators}
        />
        <ConfirmationModal
          data={this.props.data}
          settings={this.props.settings}
          calculators={this.props.calculators}
        />
      </div>
    );
  }
}

export default Main;

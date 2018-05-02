import React, { Component } from "react";
import "./App.css";
import NavbarParent from "../NavbarParent";
import Main from "../Main";
import FooterParent from "../FooterParent";

class App extends Component {
  constructor(props) {
    super(props);
    this.calculatePercSharesSold = this.calculatePercSharesSold.bind(this);
    this.calculatePretaxShares = this.calculatePretaxShares.bind(this);
    this.calculatePretaxProceeds = this.calculatePretaxProceeds.bind(this);
    this.calculateLiquidationShares = this.calculateLiquidationShares.bind(
      this
    );
    this.calculateCheckAmount = this.calculateCheckAmount.bind(this);
    this.calculatePosttaxShares = this.calculatePosttaxShares.bind(this);
    this.calculatePosttaxProceeds = this.calculatePosttaxProceeds.bind(this);
    this.handleRsuChange = this.handleRsuChange.bind(this);
    this.handleTaxRateChange = this.handleTaxRateChange.bind(this);
    this.handleTaxButtonClick = this.handleTaxButtonClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addModalStep = this.addModalStep.bind(this);
    this.removeModalStep = this.removeModalStep.bind(this);
    this.resetData = this.resetData.bind(this);
    this.state = {
      settings: {
        primaryBackgroundColor: "#FFFFFF",
        secondaryBackgroundColor: "#EAEAEB",
        accentBackgroundColor: "#029ec2",
        primaryTextColor: "#1D1E25",
        secondaryTextColor: "#6B6D75",
        highlightTextColor: "#029ec2",
        logoActive: "logo_passive.png",
        logoPassive: "logo_active.png"
      },
      nav: [
        {
          label: "Home",
          href: "/",
          disabled: false,
          hover: false
        },
        {
          label: "About",
          href: "#",
          disabled: true,
          hover: false
        }
      ],
      main: {
        header: {
          backgroundImage: "statistics.png",
          headline: "Restricted Stock Units (RSUs)",
          numRsusAvail: 1000,
          shareValue: 25,
          companyName: "Acme Corp",
          companyAddress: "P.O. Box 1234, New York, NY 10028",
          memoContents: "n/a",
          orderStatus: undefined
        },
        sellingRsus: {
          header: "Step 1: Selling RSUs",
          id: "sellingRsuSection",
          numRsusOnSale: "",
          invalid: false,
          handleChange: this.handleRsuChange
        },
        taxRate: {
          header: "Step 2: Tax Rate",
          taxRate: "",
          invalid: false,
          handleChange: this.handleTaxRateChange
        },
        payingTaxes: {
          header: "Step 3: Paying Taxes",
          tooltips: {
            left:
              "You can pay your taxes using a portion of your RSUs. Note that if you select this option, you will not be able to sell some RSUs as they will be used to cover your taxes.",
            right:
              "You can pay your RSU taxes by writing your company a check. This option may be preferable if you want to keep the maximum amount of your RSUs as company stock."
          },
          selectedButton: undefined,
          handleClick: this.handleTaxButtonClick,
          resetData: this.resetData
        },
        modal: {
          isOpen: false,
          toggle: this.toggleModal,
          open: this.openModal,
          close: this.closeModal,
          step: 1,
          addStep: this.addModalStep,
          removeStep: this.removeModalStep
        }
      },
      calculators: {
        calculatePercSharesSold: this.calculatePercSharesSold,
        calculatePretaxShares: this.calculatePretaxShares,
        calculatePretaxProceeds: this.calculatePretaxProceeds,
        calculateLiquidationShares: this.calculateLiquidationShares,
        calculateCheckAmount: this.calculateCheckAmount,
        calculatePosttaxShares: this.calculatePosttaxShares,
        calculatePosttaxProceeds: this.calculatePosttaxProceeds,
        makeNumberMoreReadable: App.makeNumberMoreReadable
      }
    };
  }

  static makeNumberMoreReadable(num, fractionDigits = 0) {
    return num.toLocaleString(navigator.language, {
      minimumFractionDigits: fractionDigits
    });
  }

  static prettifyCurrency(num, fractionDigits = 0) {
    if (num >= 0) {
      return "$" + App.makeNumberMoreReadable(num, fractionDigits);
    } else {
      return "-$" + App.makeNumberMoreReadable(-1 * num, fractionDigits);
    }
  }

  calculatePercSharesSold() {
    return App.makeNumberMoreReadable(
      this.state.main.sellingRsus.numRsusOnSale /
        this.state.main.header.numRsusAvail *
        100
    );
  }

  calculatePretaxShares() {
    return App.makeNumberMoreReadable(
      this.state.main.header.numRsusAvail -
        this.state.main.sellingRsus.numRsusOnSale
    );
  }

  _calculatePretaxProceeds() {
    return (
      this.state.main.header.shareValue *
      this.state.main.sellingRsus.numRsusOnSale
    );
  }

  calculatePretaxProceeds() {
    return App.prettifyCurrency(this._calculatePretaxProceeds());
  }

  calculateLiquidationShares() {
    return App.makeNumberMoreReadable(
      this.state.main.header.numRsusAvail *
        this.state.main.taxRate.taxRate /
        100
    );
  }

  _calculateCheckAmount() {
    return (
      this.state.main.header.numRsusAvail *
      this.state.main.header.shareValue *
      this.state.main.taxRate.taxRate /
      100
    );
  }

  calculateCheckAmount() {
    return App.prettifyCurrency(this._calculateCheckAmount());
  }

  calculatePosttaxShares() {
    if (this.state.main.payingTaxes.selectedButton === "left") {
      return Math.max(
        this.calculatePretaxShares() - this.calculateLiquidationShares(),
        0
      );
    } else if (this.state.main.payingTaxes.selectedButton === "right") {
      return App.makeNumberMoreReadable(this.calculatePretaxShares());
    } else {
      console.log("Error; selected button needs to be 'left' or 'right'.");
    }
  }

  calculatePosttaxProceeds() {
    if (this.state.main.payingTaxes.selectedButton === "left") {
      return App.prettifyCurrency(
        Math.min(
          this._calculatePretaxProceeds(),
          this.state.main.header.numRsusAvail *
            this.state.main.header.shareValue *
            (100 - this.state.main.taxRate.taxRate) /
            100
        )
      );
    } else if (this.state.main.payingTaxes.selectedButton === "right") {
      return App.prettifyCurrency(
        this._calculatePretaxProceeds() - this._calculateCheckAmount()
      );
    } else {
      console.log("Error; selected button needs to be 'left' or 'right'.");
    }
  }

  handleRsuChange(event) {
    // copy the state object into a new variable
    let newState = this.state.main;
    const value = event.target.value;
    newState.sellingRsus.numRsusOnSale = value;

    // set state if value within desired params
    if (value >= 0 && value <= this.state.main.header.numRsusAvail) {
      this.setState({ main: newState });
    }
  }

  handleTaxRateChange(event) {
    // copy the state object into a new variable
    let newState = this.state.main;
    const value = event.target.value;
    newState.taxRate.taxRate = value;

    // set state if value within desired params
    if (value >= 0 && value <= 100) {
      this.setState({ main: newState });
    }
  }

  handleTaxButtonClick(side) {
    // copy the state object into a new variable
    let newState = this.state.main;

    // determine whether to change the state of the button
    if (
      this.state.main.sellingRsus.numRsusOnSale &&
      this.state.main.taxRate.taxRate &&
      this.state.main.header.numRsusAvail > 0 &&
      this.state.main.header.orderStatus !== 'processing'
    ) {
      newState.payingTaxes.selectedButton = side;
      this.setState({ main: newState });
      return;
    }

    // check if RSUs were entered
    newState.sellingRsus.invalid = !this.state.main.sellingRsus.numRsusOnSale;

    // check if tax rate was entered
    newState.taxRate.invalid = !this.state.main.taxRate.taxRate;

    // set state
    this.setState({ main: newState });
    window.scrollTo(0, 0);
  }

  addModalStep() {
    // copy the state object into a new variable
    let newState = this.state.main;

    // add one number to the step counter
    newState.modal.step++;

    // set state
    this.setState({ main: newState });
  }

  removeModalStep() {
    // copy the state object into a new variable
    let newState = this.state.main;

    // deduct one number from the step counter
    newState.modal.step--;

    // set state
    this.setState({ main: newState });
  }

  resetData(override = false) {
    // verify that this is desired
    if (!override) {
      if (
        !window.confirm(
          "Are you sure you want to reset all data you've entered?"
        )
      ) {
        return;
      }
    }

    // copy the state object into a new variable
    let newState = this.state.main;

    // reset sellingRSUs section
    newState.sellingRsus.numRsusOnSale = "";
    newState.sellingRsus.invalid = false;

    // reset taxRate section
    newState.taxRate.taxRate = "";
    newState.taxRate.invalid = false;

    // reset payingTaxes section
    newState.payingTaxes.selectedButton = null;

    // reset modal
    newState.modal.step = 1;

    // set state
    this.setState({ main: newState });
  }

  openModal() {
    // copy the state object into a new variable
    let newState = this.state.main;
    newState.modal.isOpen = true;
    this.setState({ main: newState });
  }

  closeModal() {
    // copy the state object into a new variable
    let newState = this.state.main;
    newState.modal.isOpen = false;
    this.setState({ main: newState });

    // reset step after to avoid janky animations
    setTimeout(callback => {
      if (newState.modal.step >= 2) {
        // todo: drop this section once there's a backend; this is for demo purposes ONLY
        newState = this.state.main;

        // only processing a check if they went through the check flow
        if (this.state.main.payingTaxes.selectedButton === 'right') {
            newState.header.orderStatus = 'processing';
        }

        newState.header.numRsusAvail = 0;
        // todo: end todo section here

        this.resetData(true);


        this.setState({ main: newState });
      }
    }, 150);
  }

  toggleModal() {
    // close modal if open
    if (this.state.main.modal.isOpen === true) {
      this.closeModal();

      // open modal if closed
    } else if (this.state.main.modal.isOpen === false) {
      this.openModal();
    }
  }

  render() {
    return (
      <div className="App">
        <NavbarParent data={this.state.nav} settings={this.state.settings} />
        <Main
          settings={this.state.settings}
          data={this.state.main}
          calculators={this.state.calculators}
        />
        <FooterParent settings={this.state.settings} />
      </div>
    );
  }
}

export default App;

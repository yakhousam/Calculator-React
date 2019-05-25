import React, { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      formula: "0",
      input: "0"
    };
  }
  calc(formula) {
    formula = formula
      .replace(/(.)([//*+/-])$/, "$1")
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    // eslint-disable-next-line 
    let result = Math.round(10000000000 * eval(formula)) / 10000000000;
    formula = formula.replace(/[*]/g, "×").replace(/[//]/g, "÷");
    return {
      formula: formula + "=" + result,
      input: result
    };
  }
  componentDidMount() {
    document.addEventListener("keypress", e => {
      e.preventDefault();   
      let key = e.key
        .replace("/", "÷")
        .replace("*", "×")
        .replace("Enter", "=")
        .replace("Escape", "AC")
        .replace("Backspace", "⌫");
      if (btn.includes(key)) {
        this.handleClick(key);
      }
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keypress");
  }

  handleClick = btn => {
    let formula = this.state.formula;
    let input = this.state.input;

    if (input.length > 10 && /\d/.test(btn)) {
      return;
    }

    if (btn === "=") {
      if (/=/g.test(formula)) {
        return;
      }
      this.setState(this.calc(formula));
      return;
    }

    if (/=/.test(formula) && /[\d.]/.test(btn)) {
      input = "0";
      formula = "0";
    }
    formula = (formula + btn)
      .replace(/.*AC/, "")
      .replace(/(.*)(.)⌫/, "$1")
      .replace(/(.+=)(.+)/, "$2")
      .replace(/^[0÷×+]+/, "")
      .replace(/^[.]/, "0.")
      .replace(/([÷×+/-])[.]/, "$1".concat("0."))
      .replace(/(\D)(\D)/, "$2")
      .replace(/(\d+[.]\d+)[.]/, "$1")
      .replace(/(.+=)(.+)/, "$2");

    input = (input + btn)
      .replace(/.*AC/, "")
      .replace(/(.*)(.)⌫/, "$1")
      .replace(/^[0]/, "")
      .replace(/^[.]/, "0.")
      .replace(/(.*)([^.\d])/, "$2")
      .replace(/(\D)*(.)/, "$2")
      .replace(/[.]+/g, ".")
      .replace(/(\d+[.]\d+)[.]/, "$1")
      .replace(/^[.]/, "0.");
    this.setState({
      formula: formula === "" ? "0" : formula,
      input: input === "" ? "0" : input
    });
    return;
  };
  render() {
    return (
      <div className="container">
        <div className="about">
          Coded by{" "}
          <a href="https://github.com/yakhousam/Calculator-React">yakhousam</a>
        </div>
        <div id="formula">{this.state.formula}</div>
        <div id="display">{this.state.input}</div>

        {btn.map(btn => (
          <button
            className="btn"
            key={btn}
            id={btn}
            onClick={() => this.handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    );
  }
}
const btn = [
  "AC",
  "⌫",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "="
];

export default App;

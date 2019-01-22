import React, { Component } from "react";
import Buttons from "./component/Buttons";

import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      formula: "0",
      input: "0",
      buffer:''
    };
  }
  calc(formula){
    formula = formula.replace(/(.)([//*+/-])$/,'$1')
    let result = Math.round(10000000000 * eval(formula)) / 10000000000;
    return{
      formula: formula + '=' + result,
      input: result
    }
  }
 
  handleClick = e => {
    const val = e.target.dataset.val;
    let formula = this.state.formula;
    let input = this.state.input;

    if (val === "clear") {
      this.setState({
        formula: '0',
        input: '0'
      });
      return;
    }
    if (val === "back" && !/=/.test(formula)) {
      this.setState({
        formula: formula.length === 1 ? '0' : formula.slice(0,-1),
        input: input.length === 1 ? '0' : input.slice(0,-1)
      });
      return;
    }
    if(val === 'equals'){
      if(/=/g.test(formula)){
        return;
      }
      this.setState(this.calc(formula))
      return 
    }
    if(/[\d//*+./-]/.test(val)){
      if(/=/.test(formula) && /[\d.]/.test(val)){
        input = '0'
        formula = '0'
      }
      formula = (formula + val).replace(/(.+=)(.+)/, '$2').replace(/^[0//*+]+/,'').replace(/^[.]/,'0.').replace(/([//*+/-])[.]/,'$1'+'0.').replace(/(\D)(\D)/,'$2').replace(/(\d+[.]\d+)[.]/,'$1').replace(/(.+=)(.+)/, '$2');  
      input = (input + val).replace(/^[0]/,'').replace(/^[.]/,'0.').replace(/(.*)([^.\d])/,'$2').replace(/(\D)*(.)/,'$2').replace(/[.]+/g,'.').replace(/(\d+[.]\d+)[.]/,'$1').replace(/^[.]/,'0.');
      this.setState({
        formula: formula === '' ? '0' : formula,
        input
      });
      return;
    }
    
   
  };
  render() {
    return (
      <div className="container">
        <div id="formula">{this.state.formula}</div>
        <div id="display">{this.state.input}</div>
        <Buttons onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {StockCard} from '../stockcard/stockcard'
//import {ErrorBox} from '../errorbox/errorbox'

import './dashboard.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCards:['AAPL', 'GOGL'],
      inputField:null,
      didErr:false,
    }
  }

  pushNewCard = (evt) => {
    evt.preventDefault(); 
    //console.log(this.state.currentCards,this.state.inputField)
    
    let currentCards =  [...this.state.currentCards]
        currentCards.push(this.state.inputField)

    this.setState({currentCards, didErr:false})
  }

  killComponent =(comp, msg)=> {
    let currentCards =  this.state.currentCards.filter((val)=>val !== comp)   
    this.setState({currentCards, didErr:msg})
    console.log(msg)
  }

  render() {
   // console.log(this.state.currentCards)
    let cardsToRender = this.state.currentCards.map( (val,ind) => <StockCard key={ind} marketSymbol={val} onDelete={this.killComponent}/>)

   // this.state.didErr

    return (
      <div className="Dashboard">
        <form onSubmit={this.pushNewCard}>
          <h1>Stock Watcher</h1>
          <input className="textField" type="input" placeholder="Enter a stock Symbol..." onChange={(evt)=>this.setState({inputField: evt.target.value})}/>
          <input className="button" type="submit" value="ADD"/>
        </form>
    
        <hr />

        <div className="cardContainer">
         {cardsToRender}
        </div>    
      </div>
    );
  }
}


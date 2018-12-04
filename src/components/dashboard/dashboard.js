import React, { Component } from 'react';
import {StockCard} from '../stockcard/stockcard'
//import {ErrorBox} from '../errorbox/errorbox'

import './dashboard.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //'AAPL', 'GOGL'
      currentCards:[],
      inputField:null,
      didErr:false,
    }
  }

  pushNewCard = async (evt) => {
    evt.preventDefault(); 
    //console.log(this.state.currentCards,this.state.inputField)
    
    await fetch(`https://api.iextrading.com/1.0/stock/${this.state.inputField}/company`)
    .then(async (res)=> {
        if(res.ok){ 
          let currentCards =  [...this.state.currentCards]
            currentCards.push(await res.json())
          this.setState({currentCards, didErr:false})
        } else {
          this.setState({didErr:true})
        }
    })
    .catch((err)=>{console.log(err); this.setState({didErr:true})}) //
  }

  killComponent =(comp, msg)=> {
    let currentCards =  this.state.currentCards.filter((val)=>val !== comp)   
    this.setState({currentCards, didErr:msg})
    // console.log(msg)
  }

  render() {
   // console.log(this.state.currentCards)
    let cardsToRender = this.state.currentCards.map( (val,ind) => <StockCard key={ind} stockInitObj={val} onDelete={this.killComponent}/>)

   // this.state.didErr

    return (
      <div className="Dashboard">
        <form onSubmit={this.pushNewCard}>
          <h1>Stock Watcher</h1>
          <input className="textField" type="input" placeholder="Enter a stock Symbol..." onChange={(evt)=>this.setState({inputField: evt.target.value})}/>
          <input className="button" type="submit" value="ADD"/> 
          {this.state.didErr ? <span>Invalid Symbol!</span> : null}
        </form>
    
        <hr />

        <div className="cardContainer">
         {cardsToRender}
        </div>    
      </div>
    );
  }
}


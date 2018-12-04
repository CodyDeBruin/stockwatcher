import React, { Component, Fragment } from 'react';
import './stockcard.css'



export class StockCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            response: null,
            loading:true
        }
    }

    componentWillMount(){

        Promise.all([
            this.getCompanyBySymbol(),
            this.getPreviousDay()
        ])
        .then(values=>{
            if(values[0] && values[1]) {
                this.setState({
                    response: {...values[0],...values[1]},
                    loading: false
                })
            } else throw Error("Fetch failed");
        })
        .catch((err)=>{this.props.onDelete(this.props.marketSymbol, err)})   

    }
    //to add live updating: 
    // componentWillUnmount() {
    //    if(this.state.refresh.nextRefresh) clearInterval()
    // }

    getCompanyBySymbol = () => {
        return fetch(`https://api.iextrading.com/1.0/stock/${this.props.marketSymbol}/company`)
        .then((res)=>res.json())
        .catch((val)=>{}) //
    }

    getPreviousDay = () => {
        return fetch(`https://api.iextrading.com/1.0/stock/${this.props.marketSymbol}/previous`)
        .then((res)=>res.json())
        .catch((val)=>{console.log(val)}) 
    }
    
    render() {
        let state = this.state
        let torender = state.loading ?  
                <p>Loading...</p>
                : (<Fragment>
                    <h5>{state.response.companyName}</h5>
                    <h6>{state.response.symbol}</h6>
                    <p>{`${state.response.change} - ${state.response.changePercent}`}</p>
                    <p>{state.response.high}</p>
                    <p>{state.response.low}</p>
                </Fragment>)
                
 
        return (   
        <div className="cardBody">
             {torender}
        </div>
        );
    }
}

// change: 6.24
// changePercent: 3.494
// close: 184.82
// date: "2018-12-03"
// high: 184.94
// low: 181.21
// open: 184.46
// symbol: "AAPL"
// unadjustedVolume: 40798002
// volume: 40798002
// vwap: 182.9573
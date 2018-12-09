import React, { Component, Fragment } from 'react';
import './stockcard.css'
import {VertGraph} from './vertGraph/vertgraph'

export class StockCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quote:null,
            refreshTimer:null
        }
    }

    //
    //
    //
    //
    //

    refreshStockQuote = async () => {
       await fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockInitObj.symbol}/quote`)
        .then(async (res)=>{
            if (res.ok) {
                this.setState({quote: await res.json()})
            } else throw Error("Request failed")       
        })
        .catch((err)=>{console.log("Fetch failed: ", err)}) 
    }


    //
    //
    //
    //
    //

    componentWillMount(){
        this.refreshStockQuote()
        let refreshTimer = setInterval( this.refreshStockQuote, 60 * 1000)
        this.setState({refreshTimer})
    }

    componentWillUnmount() {
       if(this.state.refreshTimer) clearInterval(this.state.refreshTimer)
    }
  
    render() {
        let quote = this.state.quote
        let torender = quote ?  
                (<Fragment>
                    <div className="tLeftCorner">
                        <h4>{quote.companyName}</h4>
                        <p>{quote.symbol}</p>
                    </div>

                    <VertGraph className="rightSide" quoteInfo={quote}/>

                    <div className="farRight">
                        <p>{`$${quote.high}`}</p>
                        <p>{`$${quote.low}`}</p>
                    </div>

                    <div className="bLeftCorner">
                        <p>{`${quote.change} (${(quote.changePercent*100).toFixed(2)}%)`}</p>
                        <h4>{`$${quote.latestPrice}`}</h4>
                    </div>

                </Fragment>)
                : <p>Loading...</p>
        //console.log(this.props.stockInitObj)
        return (   
        <div className="cardBody">
             {torender}
        </div>
        );
    }
}

// {
//     "symbol": "AAPL",
//     "companyName": "Apple Inc.",
//     "primaryExchange": "Nasdaq Global Select",
//     "sector": "Technology",
//     "calculationPrice": "tops",
//     "open": 154,
//     "openTime": 1506605400394,
//     "close": 153.28,
//     "closeTime": 1506605400394,
//     "high": 154.80,
//     "low": 153.25,
//     "latestPrice": 158.73,
//     "latestSource": "Previous close",
//     "latestTime": "September 19, 2017",
//     "latestUpdate": 1505779200000,
//     "latestVolume": 20567140,
//     "iexRealtimePrice": 158.71,
//     "iexRealtimeSize": 100,
//     "iexLastUpdated": 1505851198059,
//     "delayedPrice": 158.71,
//     "delayedPriceTime": 1505854782437,
//     "extendedPrice": 159.21,
//     "extendedChange": -1.68,
//     "extendedChangePercent": -0.0125,
//     "extendedPriceTime": 1527082200361,
//     "previousClose": 158.73,
//     "change": -1.67,
//     "changePercent": -0.01158,
//     "iexMarketPercent": 0.00948,
//     "iexVolume": 82451,
//     "avgTotalVolume": 29623234,
//     "iexBidPrice": 153.01,
//     "iexBidSize": 100,
//     "iexAskPrice": 158.66,
//     "iexAskSize": 100,
//     "marketCap": 751627174400,
//     "peRatio": 16.86,
//     "week52High": 159.65,
//     "week52Low": 93.63,
//     "ytdChange": 0.3665,
//   }
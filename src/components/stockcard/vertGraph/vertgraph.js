import React, { Component, Fragment } from 'react';
import './vertgraph.css'

export class VertGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            arrowOffset: this.getArrowOffset(),
        }
    }

    
    

    getArrowOffset = () =>{
        const props = this.props.quoteInfo
        return (((props.high - props.latestPrice) / (props.high - props.low)) * 100).toFixed(2) 

        //.changePercent also provides change
    }


    render() {
         const props = this.props.quoteInfo
         const color = props.change < 0 ? 'red' : 'green'
        const divStyle = {
            transform: `translate(0px, ${this.getArrowOffset()}%)`, 
            // position: 'realative',
            // top: this.getArrowOffset()
            borderRight:`10px solid ${color}`, 
        };

        

        return (
        <Fragment>
            
            <div className={"vertGraph " + this.props.className } > 
                {/* <div className="farRight">{props.high}</div>  */}
                <div className="vertContainer"><div className="arrow-left" style={divStyle}> <p>{`$${props.latestPrice}`}</p> </div></div>
                {/* <p>{props.low}</p> */}
            </div>
            
        </Fragment>
        );
    }
}




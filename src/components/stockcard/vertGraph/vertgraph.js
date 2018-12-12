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
    }


    render() {
        let offset = this.getArrowOffset()
         const color = offset > 50 ? 'red' : 'green'
        return (
        <Fragment>
            <input type="range" min="1" max="100" value={offset} className={color}/>
            <p>{`$${this.props.quoteInfo.latestPrice}`}</p>
        </Fragment>
        );
    }
}




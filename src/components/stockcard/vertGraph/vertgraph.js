import React, { Component } from 'react';
import './vertgraph.css'

export class VertGraph extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         loading: false,
    //         response:null,
    //     }
    // }


    render() {
       // const props = this.props
        return (
        <div className={"vertGraph " + this.props.className } >
            <div className="vertContainer"><div style={divStyle}></div></div>
            {/* <input type="range" className="vertBar" disabled max={props.max} min={props.min} value={props.current}/> */}
        </div>
        );
    }
}

const divStyle = {
    transform: `translate(${0}px, ${50}px)`, 
    height:'10%',
    width:'1em',
    backgroundColor: 'red',
};



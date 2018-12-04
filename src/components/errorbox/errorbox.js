import React, { Component } from 'react';
import './errorbox.css'


export class ErrorBox extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return (
        <div className="errorBox">
            <h4>An error occured!</h4>
            {this.props.errMsg ? <span>{this.props.errMsg}</span> : null }
        </div>
        );
    }
}


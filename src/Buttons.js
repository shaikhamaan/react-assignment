import React from "react";

export default class Buttons extends React.Component {
    constructor(props){
        super(props);
        this.state = "0";
        
    }
    render() {
        return (
            <button>Button {this.props.number}</button>
        );
    }
};
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class PageEmployee extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <form onSubmit={e => { e.persist(); this.props.submitEmployee(e)}}>
                <label><input name="isActive" type="checkbox"></input>Is active: </label>
                <label>Age: <input name="age" type="number"></input></label>
                <label>Name: <input name="name" type="text"></input></label>
                <label>Company: <input name="company" type="text"></input></label>
                <label>Email: <input name="email" type="text"></input></label>
                <Link to="/"><Button variant="success" onClick={this.props.hideForm}>Cancel</Button></Link>
                <Button variant="success" type="submit">Submit</Button>
            </form>
        );
    }
}
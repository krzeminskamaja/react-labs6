import React, { Component } from "react";

class AddForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <form>
                <label>Is active: <input name="isActive" type="checkbox"></input></label>
                <label>Age: <input name="age" type="number"></input></label>
                <label>Name: <input name="name" type="text"></input></label>
                <label>Company: <input name="company" type="text"></input></label>
                <label>Email: <input name="email" type="text"></input></label>
                <input type="submit" name="submit" value="Submit" />
            </form>
        );
    }
}
export default AddForm;
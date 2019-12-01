import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class PageEmployee extends Component{
    constructor(props){
        super(props);
        this.state={};
        this.submitEmployee = this.submitEmployee.bind(this);
    }
    submitEmployee(event) {
      event.preventDefault();
     
      const form = event.target;
      const ia = form.elements['isActive'].value == "on" ? true : false;
      const ag = form.elements['age'].value;
      const n = form.elements['name'].value;
      const comp = form.elements['company'].value;
      const email = form.elements['email'].value;
      const newEmployee = {
      isActive: ia,
      age: ag,
      name: n,
      company: comp,
      email: email
    }
    
    console.log(newEmployee);
    const newEmployeeStringified = JSON.stringify(newEmployee);
    
  
  newEmployee.id = newEmployeeStringified.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  
    fetch('http://localhost:3004/employees', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(resp => {
      if (resp.ok) {
          return resp.json()
      } else {
          throw new Error("Wystąpił błąd połączenia!")
      }
    }).then(
      this.props.history.push('/'))
    .catch(error => console.dir("Błąd: ", error));
  }
    render(){
        return(
            <form onSubmit={e => { e.persist(); this.submitEmployee(e)}}>
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

export default withRouter(PageEmployee)
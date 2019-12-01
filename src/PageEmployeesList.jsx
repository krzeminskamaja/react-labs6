import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import PageEmployee from './PageEmployee';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class PageEmployeesList extends Component {
    constructor(props){
        super(props);
        this.state={
            hasErrors: false,
            isFetched: false,
            employees: {},
            formVisible: false,
            howManyPpl: 0
        };
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);
        this.showEmployees = this.showEmployees.bind(this);
    }
   
    handleDelete(id) {
      this.setState({isnewEmployee: false, isdelete: true});
      let url ="http://localhost:3004/employees"
      fetch(url + "/" + id, {
          method: 'DELETE'
      }).then(() => {
          fetch(url)
              .then(data => data.json())
              .then(employees => {
                  this.setState({employees, isdelete: false});
              });
      });
    }

    showEmployees(){
      return  fetch("http://localhost:3004/employees")
      .then(res => res.json())
      .then(res => this.setState({ employees: res, isFetched: true }))
      .catch(() => this.setState({ hasErrors: true }));
      
    }
    componentDidMount() {
     this.showEmployees();
    }
  
    showForm()
    {
      this.setState({formVisible: true});
    }
    hideForm()
    {
      this.setState({formVisible: false});
    }
     handleClick = e => {
        const newValue = !this.state.formVisible;
        this.setState({formVisible: newValue});
    }
    
    submitEmployee(event) {
      this.setState({isSaving: true,howManyPpl: ppl})
      console.log(event.target);
      event.preventDefault();
      const ppl = this.state.howManyPpl+1;
     
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
      this.props.history.push('/')).then(() => this.props.handleReloadData())
    .catch(error => console.dir("Błąd: ", error));
    this.setState({isSaving: false, isFetched: false})
    this.showEmployees()
  }

    render() {
      if(this.state.hasErrors)
        return <p>Unexpected error in database</p>
      if(!this.state.isFetched)
        return <p>Loading...</p>
      else{
          return(
        <div>
            <div>
            <Button block variant="info" onClick={this.handleClick}>Add Employee (lab6)</Button>
            {this.state.formVisible?this.state.isSaving?<p>Saving ...</p>:<div><PageEmployee submitEmployee={this.submitEmployee} hideForm={this.hideForm}/>
            </div>:null}
            </div>
        {this.state.employees.map((e, ind) => { return (

            <div key={ind}><h4>Employee : {e._id}</h4>
              <p>isActive: {e.isActive.toString()}</p>
              <p>Age: {e.age}</p>
              <p>Name: {e.name}</p>
              <p>Company: {e.company}</p>
              <p>Email: {e.email}</p>   
              <br/>        
            </div>
            
          )
        })
        }
        <Link to="new" ><Button>Create new employee (lab8)</Button></Link>
      </div>
          )
      }

    }
  }
export default withRouter(PageEmployeesList)
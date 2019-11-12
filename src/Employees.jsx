import React, { Component } from "react";

class Employees extends Component {
    constructor(props){
        super(props);
        this.state={
            hasErrors: false,
            isFetched: false,
            employees: {}
        };
    }
  
    componentDidMount() {
      fetch("http://localhost:3004/employees")
        .then(res => res.json())
        .then(res => this.setState({ employees: res, isFetched: true }))
        .catch(() => this.setState({ hasErrors: true }));
    }
  
    render() {
      if(this.state.hasErrors)
        return <p>Unexpected error in database</p>
      if(!this.state.isFetched)
        return <p>Loading...</p>
      else{
          return(
        <div>
        {this.state.employees.map((e, ind) => { return (

            <div key={ind}><h4>Employee : {e._id}</h4>
              <p>isActive: {e.isActive.toString()}</p>
              <p>Age: {e.age}</p>
              <p>Name: {e.name}</p>
              <p>Company: {e.company}</p>
              <p>Email: {e.email}</p>           
            </div>
          )
        })
        }
      </div>
          )
      }

    }
  }

export default Employees;
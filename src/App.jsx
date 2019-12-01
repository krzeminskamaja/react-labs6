import React from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from "react-router-dom"
import { render } from 'react-dom'
import Employees from './Employees'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageEmpoyeesList from './PageEmployeesList'
import PageEmployee from './PageEmployee'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <PageEmpoyeesList></PageEmpoyeesList>
      </Route>
      <Route path="/">
        <PageEmployee></PageEmployee>
      </Route>
    </Switch>
  </Router>
)

export default App
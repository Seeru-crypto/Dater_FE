import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// npm install react-router-dom


import Testing from "./Testing"; 
import BirthdayForm from "./BirthdayForm";
import Dashboard from './Dashboard';

const App = () => {

  console.log("test");

  return (
      <div className="container">
        <Router>
          <Switch>
          <Route exact path="/create" component={ Dashboard } />
          <Route exact path="/" component={ BirthdayForm } />
          </Switch>
          </Router>

      </div>
  )
}
export default App;

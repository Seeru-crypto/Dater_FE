import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// npm install react-router-dom


import BirthdayForm from "./BirthdayForm";
import Dashboard from './Dashboard';
import ReactNavbar from "./ReactNavbar"

const App = () => {

  console.log("test");

  return (        
    
  <Router>

      <div className="App">
      <ReactNavbar />

        <div className="container">

          <Switch>
          <Route exact path="/" component={ Dashboard } />
          <Route exact path="/d" component={ BirthdayForm } />
          </Switch>
                </div>
          </div>          
          </Router>

  )
}
export default App;

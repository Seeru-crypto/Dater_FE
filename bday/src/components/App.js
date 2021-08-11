import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Testing from "./Testing"; 
import BirthdayForm from "./BirthdayForm";

const App = () => {

  console.log("test");

  return (
      <div className="container">
          <p>In App container</p>
          <BirthdayForm />
      </div>
  )
}
export default App;

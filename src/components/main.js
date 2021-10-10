import React from "react";

const Main = () => {
  return (
    <div>
      <h1>Tere Tulemast!</h1>

      <div className="section-div">
        <h3>ToDo:</h3>
        <ul>
          <li className="done">JSON server conteiner korda</li>
          <li>Form tööle koos post päringutega</li>
          <li>Lisa kustutamis võimalus tabelisse</li>
        </ul>
      </div>

      <div className="section-div">
        <h3>Nice to have</h3>
        <ul>
          <li>form filrid</li>
          <li>tabelisse otsimise ja filtreerimise valikud</li>
        </ul>
      </div>

      <div className="section-div">
        <h3>Arhidektuur</h3>
        <ul>
          <li>React App: Port 4000</li>
          <li>
            JSON server/ container: Port 5432{": "}
            <a href="http://localhost:5432/users">link</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Main;

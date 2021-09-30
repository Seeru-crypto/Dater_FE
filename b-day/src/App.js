import './static/App.css';
import "primereact/calendar/calendar.min.css"
import "primereact/dropdown/dropdown.min.css"
import "primereact/inputtext/inputtext.min.css"

import "primeicons/primeicons.css"
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primeflex/primeflex.min.css"
import 'primeflex/primeflex.css'

import Navigationbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPerson from './components/add-person';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";import
  NotFound from './components/not-found';
import Main from "./components/main"

function App() {
  return (
    <Router>
            <Navigationbar />
            <div className="container">
            <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/add" component={AddPerson} />

              <Route exact path="/nf" component={NotFound} />

              <Route path="*" component={NotFound} />

            </Switch>
    </div>
    </Router>
  );
}

export default App;

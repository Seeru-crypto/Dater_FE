import './static/App.css';
import Navigationbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";import NotFound from './components/not-found';
import Main from "./components/main"

function App() {
  return (
    <Router>
            <Navigationbar />

            <div className="container">
            <Switch>
          <Route exact path="/" component={Main} />
          <Route path="*"/> {/* The "*"" symbol is a catch all command, so any other route will be redirected to the not found page!!! */}
            <NotFound />

            </Switch>
    </div>
    </Router>
  );
}

export default App;

import './static/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'primereact/calendar/calendar.min.css'
import 'primereact/dropdown/dropdown.min.css'
import 'primereact/inputtext/inputtext.min.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import PrimeReact from 'primereact/api'
//import 'primereact/resources/themes/md-dark-indigo/theme.css'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Navigationbar from './components/navbar'
import AddEvent from './components/create-event/add-event'
import ViewEvents from './components/event-list/view-events'
import NotFound from './components/not-found'
import Main from './components/main'
import Admin from './components/admin-page/admin'

PrimeReact.ripple = true

const App = () => (
    <div>
        <Navigationbar />
        <div>
            <Router>
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/add" element={<AddEvent />} />
                        <Route
                            exact
                            path="/eventList"
                            element={<ViewEvents />}
                        />
                        <Route exact path="/admin" element={<Admin />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </div>
    </div>
)

export default App

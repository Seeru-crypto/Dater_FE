import './static/App.css'
import 'primereact/calendar/calendar.min.css'
import 'primereact/dropdown/dropdown.min.css'
import 'primereact/inputtext/inputtext.min.css'

import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
// import "primeflex/primeflex.min.css"
import 'primeflex/primeflex.css'

import Navigationbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddPerson from './components//create-entry/add-entry'
import ViewPeople from './components/entry-list/view-people'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/not-found'
import Main from './components/main'
import Admin from './components/admin-page/admin'

function App() {
    return (
        <Router>
            <Navigationbar />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route exact path="/add" element={<AddPerson />} />
                    <Route exact path="/peopleList" element={<ViewPeople />} />
                    <Route exact path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App

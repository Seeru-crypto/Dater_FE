import './static/App.css'
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
import ComponentRoutes from './ComponentRoutes'

PrimeReact.ripple = true

const App = () => (
    <div>
        <Navigationbar />
        <div>
            <ComponentRoutes />
        </div>
    </div>
)

export default App

import './static/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'primereact/calendar/calendar.min.css'
import 'primereact/dropdown/dropdown.min.css'
import 'primereact/inputtext/inputtext.min.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import PrimeReact from 'primereact/api'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import PageHeader from './components/navbar/page-header'
import ComponentRoutes from './ComponentRoutes'

PrimeReact.ripple = true

const App = () => (
    <div>
        <PageHeader />
        {/*<Navigationbar />*/}
        <div>
            <ComponentRoutes />
        </div>
    </div>
)

export default App

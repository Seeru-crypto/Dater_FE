import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/landing-page/landing-page'
import AddEvent from './views/add-event/add-event'
import ViewEvents from './views/event-list/view-events'
import Admin from './views/Admin/admin'
import Calendar from './views/calendar/Calendar'
import NotFound from './views/not-found/not-found'

const ComponentRoutes = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route exact path='/add' element={<AddEvent />} />
                <Route
                    exact
                    path='/eventList'
                    element={<ViewEvents />}
                />
                <Route exact path='/admin' element={<Admin />} />
                <Route
                    exact
                    path='/fullCalendar'
                    element={<Calendar />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default ComponentRoutes
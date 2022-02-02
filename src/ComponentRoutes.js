import { Route, Routes } from 'react-router-dom'
import Main from './components/main'
import AddEvent from './components/create-event/add-event'
import ViewEvents from './components/event-list/view-events'
import Admin from './components/admin-page/admin'
import CalendarIndex from './components/full-calendar/CalendarIndex'
import NotFound from './components/not-found'

const ComponentRoutes = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Main />} />
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
                    element={<CalendarIndex />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default ComponentRoutes
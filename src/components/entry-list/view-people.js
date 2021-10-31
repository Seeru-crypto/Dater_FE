import React, { useState, useEffect } from 'react'
import { InputSwitch } from 'primereact/inputswitch'

import FilterTable from './filter-table'

const ViewPeople = () => {
    const [viewReminder, setViewReminder] = useState(true)

    useEffect(() => {
        return () => {}
    }, [viewReminder])

    return (
        <div>
            <div style={{ padding: '1rem' }} className="p-grid">
                <h5 style={{ paddingRight: '2rem' }}>View reminders: </h5>
                <InputSwitch
                    checked={viewReminder}
                    onChange={(e) => setViewReminder(e.value)}
                />
            </div>

            <FilterTable />
        </div>
    )
}
export default ViewPeople

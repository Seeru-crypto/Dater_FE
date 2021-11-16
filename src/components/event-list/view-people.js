import React from 'react'

import FilterTable from './filter-table'

const ViewPeople = () => {
    return (
        <div>
            <div style={{ padding: '1rem' }} className="p-grid">
                <h5 style={{ paddingRight: '2rem' }}>View reminders: </h5>
            </div>
            <FilterTable />
        </div>
    )
}
export default ViewPeople

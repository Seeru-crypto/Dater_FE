import React, { useState } from 'react'

import FilterTable from './filter-table'
import config from '../../config.json'
import useGetData from '../../API/useGetData'

const ViewPeople = () => {
    const apiPath = 'http://localhost:8080/api/event'

    const { getData: data, isPending } = useGetData(apiPath)

    return (
        <div>
            <div style={{ padding: '1rem' }} className="p-grid">
                <h5 style={{ paddingRight: '2rem' }}>View reminders: </h5>
            </div>
            <FilterTable data={data} isPending={isPending} />
        </div>
    )
}
export default ViewPeople

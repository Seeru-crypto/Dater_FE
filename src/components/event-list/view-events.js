import React, { useState } from 'react'

import FilterTable from './filter-table'
import config from '../../config.json'
import useGetData from '../../API/useGetData'

const ViewEvents = () => {
    //const [isPending, setIsPending] = useState(true)
    const apiPath = 'http://localhost:8080/api/event'

    let { getData: data, isPending } = useGetData(apiPath)

    console.log(data?.data)
    console.log(typeof data?.data)
    const handleUpdate = (newEntry) => {
        const currentData = { ...data.data, newEntry }
        data = currentData
        console.log(currentData)
    }

    return (
        <div>
            <div style={{ padding: '1rem' }} className="p-grid">
                <h5 style={{ paddingRight: '2rem' }}>View reminders: </h5>
            </div>
            <FilterTable data={data?.data} isPending={isPending} />
        </div>
    )
}
export default ViewEvents

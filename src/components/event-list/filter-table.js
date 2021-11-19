import React, { useState, useEffect } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

import { EventDetails } from './event-details'
import { GetData } from '../../API/api-requests'
import config from '../../config.json'

//ToDo
// add loading animation, when the data is fetched
// Add search bar, which searches via description and name
// Add filter, where a dates year is only rendered when the event has take year into account enabled
// Add basic view (name, date, desc, reminder, reminder in days) and all view functionality (user sees ALL the fileds of an event, execpt Id)
// increase mongoDB get limit to 100
const FilterTable = () => {
    const [selectedEvent, setselectedEvent] = useState(null)
    const apiPath = config.apiPath

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const eventData = await GetData(apiPath)
            setData(eventData.data._embedded.event)
        }
        getData()
    }, [apiPath, showModal])

    const paginatorLeft = (
        <Button type="button" icon="pi pi-refresh" className="p-button-text" />
    )
    const paginatorRight = (
        <Button type="button" icon="pi pi-cloud" className="p-button-text" />
    )

    const hideModal = () => {
        setShowModal(false)
    }

    const renderBooleanValues = (rowData, item) => {
        if (typeof rowData[item.field] === 'boolean') {
            return rowData[item.field] ? 'True' : 'False'
        } else {
            return rowData[item.field]
        }
    }

    const rowActions = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-secondary p-mr-2"
                    onClick={() => editProduct(rowData)}
                />
            </React.Fragment>
        )
    }

    const editProduct = (product) => {
        setselectedEvent(product)
        setShowModal(true)
    }

    const renderDateValues = (rowData) => {
        const date = new Date(rowData.date)
        const accountForYear = rowData.accountForYear
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        if (accountForYear) return `${day}-${month}-${year}`
        return `${day}-${month}`
    }

    return (
        <div>
            {data && (
                <div className="card">
                    <DataTable
                        responsiveLayout="scroll"
                        paginator
                        value={data}
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        paginatorLeft={paginatorLeft}
                        paginatorRight={paginatorRight}
                    >
                        <Column
                            field="eventName"
                            sortable
                            header="eventName"
                        ></Column>
                        <Column
                            field="date"
                            sortable
                            header="date"
                            body={renderDateValues}
                        ></Column>
                        <Column
                            sortable
                            field="reminder"
                            body={renderBooleanValues}
                            header="reminder"
                        ></Column>
                        <Column
                            field="reminderDays"
                            sortable
                            header="reminderDays"
                        ></Column>
                        <Column
                            field="description"
                            sortable
                            header="description"
                        ></Column>
                        <Column
                            body={rowActions}
                            header="Edit"
                            headerStyle={{ width: '8em', textAlign: 'center' }}
                            bodyStyle={{
                                textAlign: 'center',
                                overflow: 'visible',
                            }}
                        />
                    </DataTable>
                </div>
            )}
            {selectedEvent && (
                <div>
                    <EventDetails
                        selectedEvent={selectedEvent}
                        hideModal={hideModal}
                        modalState={showModal}
                    />
                </div>
            )}
        </div>
    )
}
export default FilterTable

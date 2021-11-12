import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { EventDetails } from './event-details'
import { GetData } from '../../API/api-requests'
import config from '../../config.json'

const FilterTable = () => {
    const [selectedEvent, setselectedEvent] = useState(null)
    const apiPath = config.apiPath

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const data = await GetData(apiPath)
            setData(data.data._embedded.event)
        }
        getData()
    }, [apiPath, showModal])

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
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => editProduct(rowData)}
                />
            </React.Fragment>
        )
    }

    const editProduct = (product) => {
        setselectedEvent(product)
        setShowModal(true)
    }

    const renderDateValues = (rowData, item) => {
        const data = new Date(rowData.date)
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        return `${day}-${month}-${year}`
    }

    return (
        <div>
            {data && (
                <div className="card">
                    <DataTable value={data}>
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

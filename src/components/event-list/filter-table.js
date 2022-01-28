import React, { memo, useEffect, useState } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'

import { EventDetails } from './event-details'

const FilterTable = (props) => {
    const [data, setData] = useState(props.data)
    const [selectedEvent, setselectedEvent] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const hideModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        setData(props.data)
    }, [props])

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
                    icon='pi pi-pencil'
                    className='p-button-rounded p-button-secondary p-mr-2'
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
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    return (
        <div>
            {data && (
                <div className='card'>
                    <DataTable
                        responsiveLayout='scroll'
                        paginator
                        value={data}
                        paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                        currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
                        rows={10}
                        rowsPerPageOptions={[10, 20, 50]}
                    >
                        <Column
                            field='eventName'
                            sortable
                            header='eventName'
                        />
                        <Column
                            field='date'
                            sortable
                            header='date'
                            body={renderDateValues}
                        />
                        <Column
                            sortable
                            field='reminder'
                            body={renderBooleanValues}
                            header='reminder'
                        />
                        <Column
                            field='reminderDays'
                            sortable
                            header='reminderDays'
                        />
                        <Column
                            field='eventDescription'
                            sortable
                            header='eventDescription'
                        />
                        <Column
                            body={rowActions}
                            header='Edit'
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
export default memo(FilterTable)

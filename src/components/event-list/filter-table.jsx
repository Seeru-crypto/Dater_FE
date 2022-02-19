import React, { memo, useEffect, useRef, useState } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { EventDetails } from './event-details'
import { Toolbar } from 'primereact/toolbar'
import './filter-table.css'
import { confirmDialog } from 'primereact/confirmdialog'
import { useAppDispatch } from '../../store'
import {deleteEvents, getEvents} from '../../slicers/eventSlice'
import {errorNotification, positiveNotification} from "../../custom-hooks/notifications";
import config from "../../config.json"
import {Toast} from "primereact/toast";

const FilterTable = (props) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState(props.data)
    const [selectedEvent, setselectedEvent] = useState(null)
    const [selectedEvents, setSelectedEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const ref = useRef(null)
    const labels = config.LABELS;
    const toast = useRef(null)

    useEffect(() => {
        setData(props.data)
    }, [props])

    const renderBooleanValues = (rowData, item) => rowData[item.field] ? 'True' : 'False'
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

    const deleteConfirmationDialog = () => {
        confirmDialog({
            message: 'Do you want to delete selected events?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteSelectedEvents(),
        })
    }

    const deleteSelectedEvents = async () => {
        const eventIds = selectedEvents.map((e) => e.id);
        const res = await dispatch(deleteEvents(eventIds));
        if (res.meta.requestStatus === 'fulfilled') {
            positiveNotification(toast, labels.TOAST_EVENTS_DELETE_SUCCESS, '')
            dispatch(getEvents())
        } else errorNotification(toast, labels.DEFAULT_ERR_MSG)

    };

    const renderDateValues = (rowData) => {
        const date = new Date(rowData.date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${day}-${month}-${year}`
    }
    // ToDo Add delete functionality
    const leftToolbar = () => {
        return (
            <React.Fragment>
                <Button label='Delete' icon='pi pi-trash' onClick={() => deleteConfirmationDialog()} className='p-button-danger'
                        disabled={selectedEvents.length === 0} />
            </React.Fragment>
        )
    }

    const rightToolbar = () => {
        return (
            <div className='header-search'>
                <Button disabled={data.length===0} className='p-button-outlined p-button-secondary' type='button' label='export'
                        onClick={() => ref.current.exportCSV()} />
                <span className='p-input-icon-left'>
                    <i className='pi pi-search' />
                    <InputText disabled={data.length===0} value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)}
                               placeholder='Keyword Search' />
                </span>
            </div>
        )
    }

    return (
        <div>
            <Toast ref={toast} />
            <Toolbar left={leftToolbar} right={rightToolbar} />
            <DataTable
                sortField="name"
                sortOrder={1}
                responsiveLayout='scroll'
                selection={selectedEvents}
                onSelectionChange={(e) => setSelectedEvents(e.value)}
                paginator
                ref={ref}
                // header={rightToolbar()}
                value={data}
                globalFilter={globalFilter}
                emptyMessage='No events found'
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
            >
                <Column className='table-selector' selectionMode='multiple' exportable={false} />
                <Column
                    field='name'
                    sortable
                    header='Event'
                />
                <Column
                    field='date'
                    sortable
                    header='Date'
                    body={renderDateValues}
                />
                <Column
                    sortable
                    field='reminder'
                    body={renderBooleanValues}
                    header='Reminder'
                />
                <Column
                    field='reminderDays'
                    sortable
                    header='Number of days'
                />
                <Column
                    field='description'
                    sortable
                    header='Description'
                />
                <Column
                    body={rowActions}
                    header='Edit'
                    headerStyle={{ textAlign: 'center' }}
                    bodyStyle={{
                        textAlign: 'center',
                    }}
                />
            </DataTable>
            {selectedEvent && (
                <div>
                    <EventDetails
                        selectedEvent={selectedEvent}
                        hideModal={() => {
                            setShowModal(false)
                            setselectedEvent('')
                        }}
                        modalState={showModal}
                    />
                </div>
            )}
        </div>
    )
}
export default memo(FilterTable)

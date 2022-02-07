import React, { memo, useEffect, useRef, useState } from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { EventDetails } from './event-details'
import styled from 'styled-components'
import { Toolbar } from 'primereact/toolbar'

const FilterTable = (props) => {
    const [data, setData] = useState(props.data)
    const [selectedEvent, setselectedEvent] = useState(null)
    const [selectedEvents, setSelectedEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const ref = useRef(null)

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

    const renderDateValues = (rowData) => {
        const date = new Date(rowData.date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${day}-${month}-${year}`
    }
    const leftToolbar = () => {
        return (
            <React.Fragment>
                <Button label='Delete' icon='pi pi-trash' className='p-button-danger'
                        disabled={selectedEvents.length === 0} />
            </React.Fragment>
        )
    }
    const rightToolbar = () => {
        return (
            <div className='header-search'>
                <Button className='p-button-outlined p-button-secondary' type='button' label='export'
                        onClick={() => ref.current.exportCSV()} />
                <span className='p-input-icon-left'>
                    <i className='pi pi-search' />
                    <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)}
                               placeholder='Keyword Search' />
                </span>
            </div>
        )
    }

    return (
        <EventFilterTableStyle>
            <Toolbar left={leftToolbar} right={rightToolbar} />
            <DataTable
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
                    field='eventName'
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
                    field='eventDescription'
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
        </EventFilterTableStyle>
    )
}
export default memo(FilterTable)

const EventFilterTableStyle = styled.div`
  overflow-y: auto;
  transition: 250ms width;

  .header-search {
    display: flex;
    justify-content: end;
  }

  .p-toolbar {
    background-color: var(--bkg);
    color: var(--text);
  }

  .export-btn {
    margin-right: 1rem;
  }

  .p-datatable .p-datatable-tbody > tr {
    background-color: var(--bkg);
    color: var(--text);
  }

  .p-paginator.p-paginator-bottom {
    background-color: var(--bkg);
    color: var(--text);
  }

  .p-datatable .p-datatable-header, .p-paginator .p-dropdown {
    background-color: var(--bkg);
    color: var(--text);
  }

  .p-datatable .p-datatable-thead > tr > th {
    background-color: var(--bkg);
    color: var(--text);
  }

  .p-button-outlined.p-button-secondary {
    background-color: var(--bkg);
    color: var(--text);
    margin-right: 1rem;
  }

  .table-selector {
    width: 3rem
  }
`

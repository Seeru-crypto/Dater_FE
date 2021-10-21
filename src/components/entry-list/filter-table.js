import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import CalendarComponent from '../create-user/calendar-component'
import { EntryDetails } from './entry-details'
import { DeleteData, GetData } from '../API/api-requests'
import config from '../../config.json'

// Hea tabeli näidis https://www.primefaces.org/primereact/showcase/#/datatable/crud

const FilterTable = () => {
    const [selectedEntry, setSelectedEntry] = useState(null)
    const apiPath = config.apiPath
    const [date, setDate] = useState('')

    const [data, setData] = useState([])
    const [productDialog, setProductDialog] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [itemIsDeleted, setItemIsDeleted] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const data = await GetData(apiPath)
            setData(data.data)
        }
        getData()
    }, [itemIsDeleted])

    /*     const dateHandler = (data) => {
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }
 */
    const hideModal = () => {
        setProductDialog(false)
        setShowModal(false)
    }

    const viewModal = () => {
        setShowModal(true)
        setProductDialog(true)
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
    /*    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    DeleteData(apiPath, selectedEntry.id)
                    setItemIsDeleted(true)
                    hideModal()
                }}
            />

            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideModal}
            />

            {selectedEntry && (
                <Button
                    label="Save"
                    icon="pi pi-check"
                    className="p-button-text"
                    onClick={() => {
                        console.log('entry was saved!')
                    }}
                />
            )}
        </React.Fragment>
    ) */
    const editProduct = (product) => {
        setSelectedEntry(product)
        setProductDialog(true)
        setShowModal(true)
    }

    return (
        <div>
            {data && (
                <div className="card">
                    <DataTable value={data}>
                        <Column
                            field="entry-name"
                            sortable
                            header="entry-name"
                        ></Column>
                        <Column field="date" sortable header="date"></Column>
                        <Column
                            sortable
                            field="reminder"
                            body={renderBooleanValues}
                            header="reminder"
                        ></Column>
                        <Column
                            field="reminder-days"
                            sortable
                            header="reminder-days"
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
            {
                selectedEntry && (
                    <div>
                        {' '}
                        tere
                        <EntryDetails
                            selectedEntry={selectedEntry}
                            viewModal={viewModal}
                            hideModal={hideModal}
                            modalState={showModal}
                        />
                    </div>
                )
                /*   <Dialog
                    visible={productDialog}
                    style={{ width: '450px' }}
                    header="Product Details"
                    modal
                    className="p-fluid"
                    footer={productDialogFooter}
                    onHide={hideModal}
                >
                    <h5>Vertical</h5>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="required">
                                send e-mail notification?
                            </label>
                            <Checkbox
                                checked={selectedEntry.reminder}
                            ></Checkbox>
                        </div>
                        <div className="p-field">
                            <label htmlFor="description">description</label>
                            <InputText
                                value={selectedEntry.description}
                                id="description"
                                type="text"
                            />
                        </div>
                        <CalendarComponent required dateHandler={dateHandler} />
                    </div>

                    <div>product ID is {selectedEntry.id}</div>
                </Dialog> */
            }
        </div>
    )
}
export default FilterTable

import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { EntryDetails } from './entry-details'
import { GetData } from '../API/api-requests'
import config from '../../config.json'

const FilterTable = () => {
    const [selectedEntry, setSelectedEntry] = useState(null)
    const apiPath = config.apiPath

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)

    const [itemIsDeleted, setItemIsDeleted] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const data = await GetData(apiPath)
            setData(data.data)
        }
        getData()
    }, [itemIsDeleted, apiPath])

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
        setSelectedEntry(product)
        setShowModal(true)
    }

    return (
        <div>
            {data && (
                <div className="card">
                    <DataTable value={data}>
                        <Column
                            field="entryName"
                            sortable
                            header="entryName"
                        ></Column>
                        <Column field="date" sortable header="date"></Column>
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
            {selectedEntry && (
                <div>
                    <EntryDetails
                        selectedEntry={selectedEntry}
                        hideModal={hideModal}
                        modalState={showModal}
                    />
                </div>
            )}
        </div>
    )
}
export default FilterTable

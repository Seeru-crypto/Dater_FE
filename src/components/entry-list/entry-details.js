import React, { useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import CalendarComponent from '../create-user/calendar-component'
import { DeleteData } from '../API/api-requests'
import config from '../../config.json'

export const EntryDetails = ({ selectedEntry, hideModal, modalState }) => {
    const apiPath = config.apiPath

    const showHideModal = modalState ? true : false

    console.log('selectedEntry is ', selectedEntry)

    const [date, setDate] = useState('')
    const [itemIsDeleted, setItemIsDeleted] = useState(false)

    const dateHandler = (data) => {
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    DeleteData(apiPath, selectedEntry.id)
                    setItemIsDeleted(true)
                    // hideDialog()
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
    )

    return (
        <Dialog
            visible={showHideModal}
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
                    <label htmlFor="required">send e-mail notification?</label>
                    <Checkbox checked={selectedEntry.reminder}></Checkbox>
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
        </Dialog>
    )
}

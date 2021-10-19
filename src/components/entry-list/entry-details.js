import React from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import CalendarComponent from '../create-user/calendar-component'
import { DeleteData, GetData } from '../API/api-requests'

export const EntryDetails = (props) => {
    const selectedEntry = props
    console.log(selectedEntry)

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
                    hideDialog()
                }}
            />

            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
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
            visible={productDialog}
            style={{ width: '450px' }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
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

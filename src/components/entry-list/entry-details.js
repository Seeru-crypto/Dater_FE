import React, { useState, useEffect } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import CalendarComponent from '../create-user/calendar-component'
import { DeleteData, UpdateData } from '../API/api-requests'

import config from '../../config.json'

export const EntryDetails = ({ selectedEntry, hideModal, modalState }) => {
    console.log(selectedEntry)
    const [description, setDescription] = useState(selectedEntry.description)
    const [entryName, setEntryName] = useState(selectedEntry.entryName)
    const [date, setDate] = useState(selectedEntry.date)
    const [reminder, setReminder] = useState(selectedEntry.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEntry.reminderDays)
    const apiPath = config.apiPath

    let showHideModal = modalState ? true : false

    //const [itemIsDeleted, setItemIsDeleted] = useState(false)

    useEffect(() => {
        setDescription(selectedEntry.description)
        setEntryName(selectedEntry.entryName)
        setDate(selectedEntry.date)
        setReminder(selectedEntry.reminder)
        setReminderDays(selectedEntry.reminderDays)
    }, [selectedEntry])

    const dateHandler = (data) => {
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        const date2 = `${day}/${month}/${year}`
        setDate(date2)
    }

    const deleteEntry = () => {
        //ToDo
        //  Ask for user confirmation, before deleting!
        DeleteData(apiPath, selectedEntry.id)
        alert('Entry deleted')
    }

    const updateEntry = () => {
        const data = {
            description,
            entryName,
            date,
            reminder,
            reminderDays,
        }
        UpdateData(`${apiPath}/${selectedEntry.id}`, data)
        alert('Data has been updated!')
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Delete"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => deleteEntry()}
            />

            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideModal}
            />

            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => updateEntry()}
            />
        </React.Fragment>
    )

    return (
        <Dialog
            visible={showHideModal}
            style={{ width: '450px' }}
            header="Entry Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideModal}
        >
            <h5>{entryName}</h5>
            <div className="p-fluid">
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        //justifyContent: 'center',
                    }}
                    className="p-field"
                >
                    <label>send e-mail notification?</label>
                    <Checkbox
                        style={{ paddingLeft: '1rem' }}
                        checked={reminder}
                        onChange={(e) => setReminder(!reminder)}
                    ></Checkbox>
                </div>
                <div className="p-field">
                    <label htmlFor="description">description</label>
                    <InputText
                        value={description}
                        id="description"
                        type="text"
                        onInput={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <CalendarComponent dateHandler={dateHandler} />
            </div>

            <div>product ID is {selectedEntry.id}</div>
        </Dialog>
    )
}

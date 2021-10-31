import React, { useState, useEffect } from 'react'

import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import CalendarComponent from '../create-entry/calendar-component'
import { DeleteData, UpdateData } from '../API/api-requests'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from 'primereact/inputnumber'

import config from '../../config.json'

export const EntryDetails = ({ selectedEntry, hideModal, modalState }) => {
    const [description, setDescription] = useState(selectedEntry.description)
    const [entryName, setEntryName] = useState(selectedEntry.entryName)
    const [date, setDate] = useState(selectedEntry.date)
    const [reminder, setReminder] = useState(selectedEntry.reminder)
    const [reminderDays, setReminderDays] = useState(selectedEntry.reminderDays)
    const [isoDate, setIsoDate] = useState(
        selectedEntry.date ? selectedEntry.date : null
    )

    const apiPath = config.apiPath

    let showHideModal = modalState ? true : false

    useEffect(() => {
        setDescription(selectedEntry.description)
        setEntryName(selectedEntry.entryName)
        setDate(selectedEntry.date)
        setReminder(selectedEntry.reminder)
        setReminderDays(selectedEntry.reminderDays)
    }, [selectedEntry])

    const dateHandler = (data) => {
        setIsoDate(data.toISOString())
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
        window.location.reload()
    }

    const updateEntry = () => {
        const data = {
            entryName,
            date: isoDate,
            reminder,
            reminderDays,
            description,
        }
        UpdateData(`${apiPath}/${selectedEntry.id}`, data)
        window.location.reload()
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
                <div className="p-field">
                    <label htmlFor="entryName">Entry name:</label>
                    <InputText
                        value={entryName}
                        id="entryName"
                        maxLength="20"
                        type="text"
                        onInput={(e) => {
                            setEntryName(e.target.value)
                        }}
                        onValueChange={(e) => {
                            setEntryName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="selectedDate">Date:</label>
                    <CalendarComponent
                        dateHandler={dateHandler}
                        selectedDate={date}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="description">description</label>
                    <InputTextarea
                        value={description}
                        id="description"
                        maxLength="120"
                        autoResize
                        type="text"
                        onInput={(e) => {
                            setDescription(e.target.value)
                        }}
                        onValueChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        //justifyContent: 'center',
                    }}
                    className="p-field"
                >
                    <label style={{ paddingRight: '1rem' }}>
                        send e-mail notification?
                    </label>
                    <Checkbox
                        checked={reminder}
                        onChange={(e) => {
                            setReminder(!reminder)
                            if (reminder) setReminderDays(0)
                        }}
                    ></Checkbox>
                </div>
                {reminder && (
                    <div className="p-field">
                        <label htmlFor="reminderDays">Reminder in days</label>
                        <InputNumber
                            value={reminderDays}
                            inputId="integeronly"
                            min={0}
                            max={31}
                            id="reminderDays"
                            onInput={(e) => {
                                setReminderDays(e.target.value)
                            }}
                            onValueChange={(e) => {
                                setReminderDays(e.target.value)
                            }}
                        />
                    </div>
                )}
            </div>
        </Dialog>
    )
}

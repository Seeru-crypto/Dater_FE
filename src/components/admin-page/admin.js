import React, { useState, useRef, useEffect } from 'react'
import { Message } from 'primereact/message'
import config from '../../config.json'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'
import useGetData from '../../API/useGetData'
import { PatchSettings } from '../../API/api-requests'
const Admin = () => {
    const [adminEmail, setAdminEmail] = useState('')
    const [emailReminder, setEmailReminder] = useState(true)
    const [smsReminder, setSmsReminder] = useState(false)
    const [checkInterval, setCheckInterval] = useState(0)
    const [settingsID, setSettingsID] = useState('')
    const labels = config.labels;
    const patchApiPath = 'http://localhost:8080/settings'
    const toast = useRef(null)
    // ToDo Replace this query with dispatch
    const { getData, isPending, error } = useGetData(
        'http://localhost:8080/api/settings'
    )
    // ToDo Create a separate reducer for admin settings, which will get settings everytime user comes to this page

    useEffect(() => {
        if (getData) {
            const path = getData?.data[0]
            console.log(path)
            setAdminEmail(path.emailAddress)
            setEmailReminder(path.sendEmails)
            setCheckInterval(path.checkInterval)
            setSmsReminder(path.sendSMS)
            setSettingsID(path.id)
        }
    }, [getData])

    const submitForm = () => {
        const path = patchApiPath + '/' + settingsID
        const data = {
            emailAddress: adminEmail,
            sendEmails: emailReminder,
            sendSMS: smsReminder,
            checkInterval,
        }
        PatchSettings(path, data, toast)
    }

    return (
        <div>
            <Toast ref={toast} />

            <div
                hidden={error ? false : true}
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity="error" text={labels.defaultErrorMessage} />
            </div>
            {isPending && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: '2em' }}
                    ></i>
                </div>
            )}
            <div className="card">
                {!isPending && !error && (
                    <div className="p-field">
                        <div className="p-field p-col">
                            <div className="p-field p-row">
                                <h1>Admin Page!</h1>
                                <p>default email aadress</p>
                                <div>
                                    <AdminEmailAdress
                                        email={adminEmail}
                                        emailHandler={(e) => setAdminEmail(e)}
                                    />
                                </div>
                            </div>
                            <div>
                                <EmailReminders
                                    emailReminder={emailReminder}
                                    emailReminderHandler={(e) =>
                                        setEmailReminder(e)
                                    }
                                    toolTipMessage="message!"
                                />
                            </div>
                        </div>
                        <div>
                            <Button onClick={submitForm}>Btn1</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin

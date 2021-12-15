import React, { useState, useEffect } from 'react'
import { Message } from 'primereact/message'
import config from '../../config.json'
import { Button } from 'primereact/button'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'
import useGetData from '../../API/useGetData'
const Admin = () => {
    const [adminEmail, setAdminEmail] = useState('')
    const [emailReminder, setEmailReminder] = useState(true)
    const [smsReminder, setSmsReminder] = useState(false)
    const [checkInterval, setCheckInterval] = useState(0)

    const defaultErrorMessage = config.labels.defaultErrorMessage

    const { getData, isPending, error } = useGetData(
        'http://localhost:8080/settings'
    )

    useEffect(() => {
        console.log('get data is ', getData?.data._embedded.settings[0])
        if (getData) {
            const path = getData.data._embedded.settings[0]
            setAdminEmail(path.emailAddress)
            setEmailReminder(path.sendEmails)
            setCheckInterval(path.checkInterval)
            setSmsReminder(path.sendSMS)
        }
    }, [getData])

    return (
        <div>
            <div
                hidden={error ? false : true}
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity="error" text={defaultErrorMessage} />
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
                                />
                            </div>
                        </div>
                        <div>
                            <Button>Btn1</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin

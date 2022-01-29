import React, { useState, useRef, useEffect } from 'react'
import { Message } from 'primereact/message'
import config from '../../config.json'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'
import { PatchSettings } from '../../API/api-requests'
import { getEvents } from '../../slicers/eventSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAdminData } from '../../slicers/adminSlice'

const Admin = () => {
    const [adminEmail, setAdminEmail] = useState('')
    const [emailReminder, setEmailReminder] = useState(true)
    const [smsReminder, setSmsReminder] = useState(false)
    const [checkInterval, setCheckInterval] = useState(0)
    const [settingsID, setSettingsID] = useState('')
    const labels = config.labels
    const patchApiPath = 'http://localhost:8080/settings'
    const toast = useRef(null)
    const events = useAppSelector((state) => state.admin.events)
    const loading = useAppSelector((state) => state.admin.loading)
    const error = useAppSelector((state) => state.admin.error)
    const notificationEmailAdress = useAppSelector((state) => state.admin.notificationEmailAdress)
    const enableEmailAdressNotifications = useAppSelector((state) => state.admin.enableEmailAdressNotifications)
    const configID = useAppSelector((state) => state.admin.configID)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error!=="") {
            const timer = setInterval(() => {
                dispatch(getAdminData());
            }, config.IntervalValue)
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);


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
                hidden={!error}
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Message severity='error' text={labels.defaultErrorMessage} />
            </div>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <i
                        className='pi pi-spin pi-spinner'
                        style={{ fontSize: '2em' }}
                    />
                </div>
            )}
            <div className='card'>
                {!loading && !error && (
                    <div className='p-field'>
                        <div className='p-field p-col'>
                            <div className='p-field p-row'>
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
                                    toolTipMessage='message!'
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

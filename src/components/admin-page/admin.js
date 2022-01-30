import React, { useRef, useEffect } from 'react'
import { Message } from 'primereact/message'
import config from '../../config.json'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAdminData, setEmailAdress, setEmailAdressNotifications, updateAdmin } from '../../slicers/adminSlice'

const Admin = () => {
    const labels = config.labels
    const toast = useRef(null)
    const loading = useAppSelector((state) => state.admin.loading)
    const error = useAppSelector((state) => state.admin.error)
    const notificationEmailAdress = useAppSelector((state) => state.admin.notificationEmailAdress)
    const enableEmailAdressNotifications = useAppSelector((state) => state.admin.enableEmailAdressNotifications)
    const configID = useAppSelector((state) => state.admin.configID)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error !== '') {
            const timer = setInterval(() => {
                dispatch(getAdminData())
            }, config.IntervalValue)
            return () => clearTimeout(timer)
        }
        if (configID === '') dispatch(getAdminData())
    }, [error, dispatch, configID])

    const submitForm = () => {
        const data = {
            emailAddress: notificationEmailAdress,
            sendEmails: enableEmailAdressNotifications,
            id: configID,
        }
        dispatch(updateAdmin(data)).then(() => {
            // ToDo add notifcation
            console.log('log')
        })
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
                                        email={notificationEmailAdress}
                                        emailHandler={(e) => {
                                            dispatch(setEmailAdress(e))
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <EmailReminders
                                    emailReminder={enableEmailAdressNotifications}
                                    emailReminderHandler={(e) =>
                                        dispatch(setEmailAdressNotifications(e))
                                    }
                                    toolTipMessage={labels.emailReminderLabel}
                                />
                            </div>
                        </div>
                        <div>
                            <Button onClick={submitForm}>Submit</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin

import React, { useEffect, useRef } from 'react'
import { Message } from 'primereact/message'
import config from '../../config.json'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAdminData, setEmailAdress, setEmailAdressNotifications, updateAdmin } from '../../slicers/adminSlice'
import { errorNotification, positiveNotification } from '../../custom-hooks/notifications'

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

    const submitForm = async () => {
        const data = {
            emailAddress: notificationEmailAdress,
            sendEmails: enableEmailAdressNotifications,
            id: configID,
        }
        const res = await dispatch(updateAdmin(data));
        if (res.meta.requestStatus==='fulfilled') positiveNotification(toast, labels.configUpdatedSuccessfullyMessage, '');
        else errorNotification(toast, labels.defaultErrorMessage);
    }

    return (
        <div style={{padding: '0 2rem 0 2rem'}}>
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

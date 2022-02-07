import React, { useEffect, useRef } from 'react'
import config from '../../config.json'
import { Button } from 'primereact/button'
import styled from 'styled-components'
import { Toast } from 'primereact/toast'
import { useAppDispatch, useAppSelector } from '../../store'
import { getAdminData, setEmailAdress, setEmailAdressNotifications, updateAdmin } from '../../slicers/adminSlice'
import { errorNotification, positiveNotification } from '../../custom-hooks/notifications'
import ErrorBar from '../functional-components/error-bar'
import LoadingBar from '../functional-components/loading-bar'
import { checkEvents } from '../../slicers/eventSlice'
import AdminEmailField from './admin-email-field'
import AdminEmailReminders from './admin-email-reminders'

const Admin = () => {
    const labels = config.LABELS
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
            }, config.HTTP_INTERVAL_VALUE)
            return () => clearTimeout(timer)
        }
        if (configID === '') dispatch(getAdminData())
    }, [error, dispatch, configID])

    const handleEventCheck = () => dispatch(checkEvents())

    const submitForm = async () => {
        const data = {
            emailAddress: notificationEmailAdress,
            sendEmails: enableEmailAdressNotifications,
            id: configID,
        }
        const res = await dispatch(updateAdmin(data))
        if (res.meta.requestStatus === 'fulfilled') positiveNotification(toast, labels.CONF_UPDATED_SUCCESS_MSG, '')
        else errorNotification(toast, labels.DEFAULT_ERR_MSG)
    }

    return (
        <AdminStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <div className='admin-border'>
                <Toast ref={toast} />
                <div>
                    {!loading && !error && (
                        <div className='p-field'>
                            <div className='p-field p-col'>
                                <div className='p-field p-row'>
                                    <h1>Admin Page!</h1>
                                    <p>default email aadress</p>
                                    <div>
                                        <AdminEmailField
                                            email={notificationEmailAdress}
                                            emailHandler={(e) => {
                                                dispatch(setEmailAdress(e))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <AdminEmailReminders
                                        emailReminder={enableEmailAdressNotifications}
                                        emailReminderHandler={(e) =>
                                            dispatch(setEmailAdressNotifications(e))
                                        }
                                        toolTipMessage={labels.EMAIL_REMINDER_LABEL}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button onClick={submitForm}>Submit</Button>
                            </div>
                            <div className='p-col p-col-align-end'>
                                <Button
                                    onClick={() => handleEventCheck()}
                                    className='p-button-outlined p-button-secondary'
                                >
                                    <i className='pi pi-envelope p-px-2' />
                                    <span> Check dates </span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminStyle>
    )
}

const AdminStyle = styled.div`

  background-color: var(--bkg);
  color: var(--text);
  min-height: 100vh;

  input {
    width: 25%
  }

  .admin-border {
    padding: 2rem 4rem;
  }
`

export default Admin

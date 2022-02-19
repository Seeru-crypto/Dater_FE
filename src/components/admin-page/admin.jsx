import React, {useEffect, useRef, useState} from 'react'
import config from '../../config.json'
import {Button} from 'primereact/button'
import styled from 'styled-components'
import {Toast} from 'primereact/toast'
import {useAppDispatch, useAppSelector} from '../../store'
import {getAdminData, setEmailAdress, setEmailAdressNotifications, updateAdmin} from '../../slicers/adminSlice'
import {errorNotification, positiveNotification} from '../../custom-hooks/notifications'
import ErrorBar from '../functional-components/error-bar'
import LoadingBar from '../functional-components/loading-bar'
import {checkEvents} from '../../slicers/eventSlice'
import AdminEmailField from './admin-email-field'
import AdminEmailRemindersCb from './admin-email-reminders-cb'
import AdminSmsField from './admin-sms-field'
import AdminSmsCb from './admin-sms-cb'
import FieldInvalidMsg from "../form-fields/field-invalid-msg";

const Admin = () => {
    const [isChanged, setIsChanged] = useState(false);
    const [timer, setTimer] = useState(null);
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

    const handleEventCheck = () => {
        if (timer) clearTimeout(timer);
        const timeOut = setTimeout(() => dispatch(checkEvents()), config.HTTP_INTERVAL_VALUE);
        setTimer(timeOut);
    }

    const validateData = () => {
        if (notificationEmailAdress.length > config.MAX_EMAIL_LENGTH || !document.getElementById("adminEmailInput").validity.valid) {
            errorNotification(toast, labels.SETTING_INVALID_EMAIL_ERROR);
            return;
        }
        submitForm()
    }

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
    // ToDo add stats section, interval time,
    return (
        <AdminStyle>
            <ErrorBar error={error} />
            <LoadingBar loading={loading} />
            <div className='admin-border'>
                <Toast ref={toast} />
                    {!loading && !error && (
                        <div className='general-admin-page'>
                            <h1>Admin Page</h1>
                            <div className='email-group'>
                                <div className='admin-email-reminder'>
                                    <AdminEmailRemindersCb
                                        emailReminder={enableEmailAdressNotifications}
                                        emailReminderHandler={(e) => {
                                            dispatch(setEmailAdressNotifications(e));
                                            setIsChanged(true);
                                        }
                                        }
                                        toolTipMessage={labels.EMAIL_REMINDER_LABEL}
                                    />
                                </div>
                                <div className={`admin-email-field`}>
                                    <AdminEmailField
                                        isDisabled={!enableEmailAdressNotifications}
                                        email={notificationEmailAdress}
                                        emailHandler={(e) => {
                                            dispatch(setEmailAdress(e))
                                            setIsChanged(true);
                                        }}
                                    />
                                    <FieldInvalidMsg errorMessage={`${notificationEmailAdress?.length}/${config.MAX_EMAIL_LENGTH}`} />
                                </div>
                            </div>
                            <div className="WIP-div">
                                <p className="WIP">The sms functionality is WIP</p>
                                <div className='sms-group'>

                                    <div className='admin-sms-cb'>
                                        <AdminSmsCb isSmsActive={false}
                                                    handleSmsActive={() => console.log("togge sms")}/>
                                    </div>
                                    <div className='admin-sms-field'>
                                        <AdminSmsField
                                            value={''}
                                            handleValue={() => console.log("toggle sms")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='admin-btn-grp'>
                                <div>
                                    <Button disabled={!isChanged} onClick={validateData}>Submit</Button>
                                </div>
                                <div className=''>
                                    <Button
                                        onClick={() => handleEventCheck()}
                                        className='p-button-outlined p-button-secondary custom-butt'
                                    >
                                        <i className='pi pi-envelope p-px-2' />
                                        <span> Check dates </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </AdminStyle>
    )
}

const AdminStyle = styled.div`
  background-color: var(--bkg);
  color: var(--text);
  min-height: 100vh;
  transition: all 0.4s ease;

  .admin-border{
    display: flex;
    justify-content: space-around;
  }
  .admin-btn-grp {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
  }

  .sms-group {
    width: 100%;
    border-bottom: solid 1px gray;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .email-group {
    border-bottom: solid 1px gray;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .admin-sms-field {
    padding: 2rem;
  }

  .admin-sms-cb {
    padding: 2rem 2rem;
  }

  .admin-email-field {
    padding: 2rem;
  }

  .admin-email-reminder {
    padding: 2rem 2rem;
  }

  .general-admin-page {
    min-height: 100vh;
    border-radius: 0.75rem;
    padding: 2rem;
    margin: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .custom-butt:hover{
    border: #3da9fc solid 1px !important;
  }

  input {
    width: 100%;
  }

  .admin-border {
    padding: 2rem 4rem;
  }

  .WIP-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .WIP{
    margin-bottom: -10px;
  }
  
`

export default Admin

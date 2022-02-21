import styled from "styled-components";
import AdminEmailRemindersCb from "./admin-email-reminders-cb";
import {setEmailAdress, setEmailAdressNotifications, updateAdmin} from "../../slicers/adminSlice";
import AdminEmailField from "./admin-email-field";
import FieldInvalidMsg from "../form-fields/field-invalid-msg";
import config from "../../config.json";
import AdminSmsCb from "./admin-sms-cb";
import AdminSmsField from "./admin-sms-field";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {errorNotification, positiveNotification} from "../../custom-hooks/notifications";


const AdminSettings = ({pin, toast}) => {
    const enableEmailAddressNotifications = useAppSelector((state) => state.admin.enableEmailAdressNotifications)
    const notificationEmailAdress = useAppSelector((state) => state.admin.notificationEmailAdress)
    const configID = useAppSelector((state) => state.admin.configID)
    const dispatch = useAppDispatch()
    const [isChanged, setIsChanged] = useState(false);
    const labels = config.LABELS
    const [isCharCounterVisible, setCharCounterVisible] = useState(false);

    const validateData = () => {
        if (notificationEmailAdress.length > config.MAX_EMAIL_LENGTH) {
            errorNotification(toast, labels.TOAST_SETTINGS_EMAIL_LONG_ERROR);
            setCharCounterVisible(true)
            return;
        }
        if (!document.getElementById("adminEmailInput").validity.valid) {
            errorNotification(toast, labels.SETTING_INVALID_EMAIL_ERROR);
            return;
        }
        setCharCounterVisible(false)
        submitForm()
    }

    const submitForm = async () => {
        const data = {
            emailAddress: notificationEmailAdress,
            sendEmails: enableEmailAddressNotifications,
            id: configID,
        }

        const dto = {data, pin}
        const res = await dispatch(updateAdmin(dto))
        if (res.meta.requestStatus === 'fulfilled') positiveNotification(toast, labels.CONF_UPDATED_SUCCESS_MSG, '')
        else errorNotification(toast, labels.DEFAULT_ERR_MSG)
    }

    return (
        <AdminSettingsStyle>
            <div className='email-group'>
                <div className='admin-email-reminder'>
                    <AdminEmailRemindersCb
                        emailReminder={enableEmailAddressNotifications}
                        emailReminderHandler={(e) => {
                            dispatch(setEmailAdressNotifications(e));
                            setIsChanged(true);
                        }
                        }
                        toolTipMessage={labels.EMAIL_REMINDER_LABEL}
                    />
                </div>
                <div className="admin-email-field">
                    <AdminEmailField
                        isDisabled={!enableEmailAddressNotifications}
                        email={notificationEmailAdress}
                        emailHandler={(e) => {
                            dispatch(setEmailAdress(e))
                            setIsChanged(true);
                        }}
                    />
                    {isCharCounterVisible &&
                    <FieldInvalidMsg
                        messageContent={`${notificationEmailAdress?.length}/${config.MAX_EMAIL_LENGTH}`}/>
                    }
                </div>
            </div>
            <div className="WIP-div">
                <p className="WIP">The sms functionality is WIP</p>
                <div className='sms-group'>

                    <div className='admin-sms-cb'>
                        <AdminSmsCb isSmsActive={false}
                                    handleSmsActive={() => console.log("toggle sms")}/>
                    </div>
                    <div className='admin-sms-field'>
                        <AdminSmsField
                            value={''}
                            handleValue={() => console.log("toggle sms")}
                        />
                    </div>
                </div>
            </div>
            <div className="admin-settings-footer">
                <button disabled={!isChanged} onClick={validateData}>submit</button>
            </div>
        </AdminSettingsStyle>
    );

}

const AdminSettingsStyle = styled.div`
  background-color: var(--bkg);
  width: 70%;
  color: var(--text);
  border: solid 1px var(--text);
  padding: 1rem;
  border-radius: 2rem 1rem;
  transition: all 0.4s ease;
  .admin-email-field {
    padding: 2rem;
  }

  .admin-settings-footer > button {
    padding: .5rem;
    border-radius: .5rem;
    border: black 1px solid;
    background-color: transparent;
    color: var(--git-icon);
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
  }

  .admin-settings-footer > button:hover {
    transition: all 0.5s;
    cursor: pointer;
    background-color: var(--add-border);
    color: white;
  }
  
  .email-group {
    border-bottom: solid 1px gray;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .admin-email-reminder {
    padding: 2rem 2rem;
  }

  .sms-group {
    width: 100%;
    border-bottom: solid 1px gray;
    margin-bottom: 2rem;
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


  .WIP-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .WIP{
    margin-bottom: -10px;
  }
  
  .admin-settings-footer{
    display: flex;
    justify-content: center;
  }


`
export default AdminSettings
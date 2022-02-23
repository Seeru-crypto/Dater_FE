import React, {useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../store";
import config from "../../config.json";
import {adminButtonTransition} from "../../static/animations/motion";

import {setEmailAdress, setEmailAdressNotifications, updateAdmin} from "../../slicers/adminSlice";

import FieldInvalidMsg from "../../components/event/field-invalid-msg";
import {errorNotification, positiveNotification} from "../../utils/notifications";
import {AdminEmailRemindersCb, AdminSmsCb, AdminSmsField, PinModal, AdminEmailField} from "../../components/admin/admin-index";
import {adminDataValidation} from "../../utils/dataValidation";

const AdminSettings = ({toast}) => {
    const {
        isEmailEnabled,
        userMailAddress,
        pin,
        configId
    } = useAppSelector((state) => state.admin)
    const dispatch = useAppDispatch()
    const labels = config.LABELS
    const [isChanged, setIsChanged] = useState(false);
    const [isCharCounterVisible, setCharCounterVisible] = useState(false);
    const [isPinModalVisible, setPinModal] = useState(false);

    // ToDo export validate function to utils!
    const validateData = () => {
        const validate = adminDataValidation(userMailAddress);

        if (validate.result){
            setCharCounterVisible(false)
            setPinModal(true)
            return;
        }
        if (validate.property === 'userMailAddressLength'){
            errorNotification(toast, labels.TOAST_SETTINGS_EMAIL_LONG_ERROR);
            setCharCounterVisible(true)
            return;
        }
        if (validate.property === 'userMailAddressInvalid'){
            errorNotification(toast, labels.SETTING_INVALID_EMAIL_ERROR);
            return;
        }
    }

    const submitForm = async () => {
        setPinModal(false);
        const data = {
            emailAddress: userMailAddress,
            sendEmails: isEmailEnabled,
            id: configId,
        }
        const dto = {data, pin}
        const res = await dispatch(updateAdmin(dto))
        if (res.meta.requestStatus === 'fulfilled') positiveNotification(toast, labels.CONF_UPDATED_SUCCESS_MSG, '')
        else errorNotification(toast, labels.DEFAULT_ERR_MSG)
    }

    return (
        <AdminSettingsStyle
        >
            <PinModal isVisible={isPinModalVisible} setVisibility={() => setPinModal(false)}
                      clickHandler={() => submitForm()}/>
            <div className='email-group'>
                <div className='admin-email-reminder'>
                    <AdminEmailRemindersCb
                        emailReminder={isEmailEnabled}
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
                        isDisabled={!isEmailEnabled}
                        email={userMailAddress}
                        emailHandler={(e) => {
                            dispatch(setEmailAdress(e))
                            setIsChanged(true);
                        }}
                    />
                    {isCharCounterVisible &&
                    <FieldInvalidMsg
                        messageContent={`${userMailAddress?.length}/${config.MAX_EMAIL_LENGTH}`}/>
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
                {isChanged &&
                <motion.button
                    className="admin-submit-btn"
                    initial={adminButtonTransition.initial}
                    animate={adminButtonTransition.animate}
                    onClick={() => validateData()}>submit</motion.button>

                ||
                <div className="placeholder"/>
                }
            </div>
        </AdminSettingsStyle>
    );
}

const AdminSettingsStyle = styled(motion.div)`
  width: 70%;
  height: 100%;
  border: solid 1px var(--text);
  padding: 1rem;
  border-radius: 2rem 1rem;
  transition: all 0.4s ease;
  
  .admin-settings-footer {
    display: flex;
    justify-content: center;

    .admin-submit-btn {
      padding: .5rem;
      border-radius: .5rem;
      border: black 1px solid;
      background-color: transparent;
      color: var(--git-icon);
      display: flex;
      align-items: center;
      transition: all 0.5s ease;
    }

    .admin-submit-btn:hover {
      transition: all 0.5s;
      cursor: pointer;
      background-color: var(--add-border);
      color: white;
    }
  }
  
  .email-group {
    border-bottom: solid 1px gray;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .admin-email-reminder {
    padding: 2rem;
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

  .WIP {
    margin-bottom: -10px;
  }
  
  .placeholder {
    height: 42px;
  }
`
export default AdminSettings
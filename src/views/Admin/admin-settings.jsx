import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store';
import config from '../../config.json';
import { adminButtonTransition } from '../../static/animations/motion';
import { getAdminData, setEmailAdressNotifications, setSmsTo, setIsSmsActive, updateAdmin } from '../../slicers/adminSlice';

import FieldInvalidMsg from '../../components/event/field-invalid-msg';
import { errorNotification, positiveNotification } from '../../utils/notifications';
import { AdminEmailField, AdminEmailRemindersCb, AdminSmsCb, AdminSmsField, PinModal } from '../../components/admin/admin-index';
import { adminDataValidation } from '../../utils/dataValidation';
import AdminSettingButton from '../../components/admin/admin-setting-button';

function AdminSettings(props) {
  const { toast, isEmailEnabled, isSmsActive, userMailAddress, pin, configId } = props;
  const dispatch = useAppDispatch();
  const labels = config.LABELS;
  const [isChanged, setIsChanged] = useState(false);
  const [isCharCounterVisible, setCharCounterVisible] = useState(false);
  const [isPinModalVisible, setPinModal] = useState(false);
  const [newMailValue, setMailValue] = useState('');
  const [newSmsValue, setNewSmsValue] = useState('');

  const validateData = () => {
    const validate = adminDataValidation(newMailValue, newSmsValue);

    if (validate.result) {
      setCharCounterVisible(false);
      setPinModal(true);
      return;
    }
    if (validate.property === 'userMailAddressLength') {
      errorNotification(toast, labels.TOAST_SETTINGS_EMAIL_LONG_ERROR);
      setCharCounterVisible(true);
      return;
    }
    if (validate.property === 'userSmsToInvalid') {
      errorNotification(toast, labels.TOAST_SETTINGS_SMS_INCORRECT_FORMAT, labels.TOAST_SETTINGS_SMS_INCORRECT_FORMAT_BODY);
      return;
    }
    if (validate.property === 'userMailAddressInvalid') {
      errorNotification(toast, labels.SETTING_INVALID_EMAIL_ERROR);
    }
  };

  const submitForm = async () => {
    setPinModal(false);
    const data = {
      emailAddress: newMailValue,
      isEmailActive: isEmailEnabled,
      id: configId,
      isSmsActive,
      smsTo: newSmsValue,
    };
    const dto = { data, pin };
    const res = await dispatch(updateAdmin(dto));
    if (res.meta.requestStatus === 'fulfilled') {
      positiveNotification(toast, labels.CONF_UPDATED_SUCCESS_MSG, '');
      dispatch(getAdminData());
    } else errorNotification(toast, labels.DEFAULT_ERR_MSG);
  };

  return (
    <AdminSettingsStyle>
      <PinModal isVisible={isPinModalVisible} setVisibility={() => setPinModal(false)} clickHandler={() => submitForm()} />
      <div className="email-group">
        <div className="admin-email-reminder">
          <AdminEmailRemindersCb
            emailReminder={isEmailEnabled}
            emailReminderHandler={(e) => {
              dispatch(setEmailAdressNotifications(e));
              setIsChanged(true);
            }}
            toolTipMessage={labels.EMAIL_REMINDER_TOOLTIP}
          />
        </div>
        <div className="admin-email-field">
          <AdminEmailField
            isDisabled={!isEmailEnabled}
            email={newMailValue}
            emailHandler={(e) => {
              setMailValue(e);
              setIsChanged(true);
            }}
          />
          {isCharCounterVisible && <FieldInvalidMsg messageContent={`${userMailAddress?.length}/${config.MAX_EMAIL_LENGTH}`} />}
        </div>
      </div>
      <div className="sms-group">
        <div className="admin-sms-cb">
          <AdminSmsCb
            toolTipMessage={labels.SMS_REMINDER_TOOLTIP}
            isSmsActive={isSmsActive}
            handleSmsActive={(e) => {
              dispatch(setIsSmsActive(e));
              setIsChanged(true);
            }}
          />
        </div>
        <div className="admin-sms-field">
          <AdminSmsField
            isDisabled={!isSmsActive}
            value={newSmsValue}
            smsHandler={(e) => {
              setNewSmsValue(e);
              setIsChanged(true);
            }}
          />
        </div>
      </div>
      <div className="admin-settings-footer">
        {(isChanged && (
          <motion.div initial={adminButtonTransition.initial} animate={adminButtonTransition.animate}>
            <AdminSettingButton text="submit" submitHandle={() => validateData()} />
          </motion.div>
        )) || <div className="placeholder" />}
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
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .admin-email-reminder,
  .admin-email-field {
    padding: 2rem;
    width: auto;
  }

  .admin-sms-field,
  .admin-sms-cb {
    padding: 2rem;
    width: auto;
  }

  .sms-group,
  .email-group {
    width: 100%;
    border-bottom: solid 1px gray;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  .placeholder {
    height: 42px;
  }

  .p-inputtext,
  .p-float-label label {
    color: var(--text);
  }

  .p-float-label input {
    background-color: var(--bkg);
    border: var(--text) 1px solid;
  }

  span .disabled {
    background: var(--disabled-btn-bkg);
  }

  span .invalid {
    border: var(--err) 1px solid;
  }
`;
export default AdminSettings;

import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Tooltip } from 'primereact/tooltip'
import { InputNumber } from 'primereact/inputnumber'

import config from '../../config.json'

const nameMaxLength = config.nameMaxLength
const descMaxLength = config.descMaxLength
const daysNoticeMaxValue = config.daysNoticeMaxValue
const daysNoticeMinValue = config.daysNoticeMinValue
const reminderLabel = config.labels.reminderLabel
const accountForYearLabel = config.labels.accountForYearLabel
const accountForYearTooltip = config.labels.accountForYearTooltip

export const EventName = ({ name, nameHandler }) => {
    return (
        <div className="p-d-flex">
            <InputText
                className="p-inputtext-lg p-d-block"
                maxLength={nameMaxLength}
                placeholder="* name"
                required={true}
                value={name}
                onChange={(e) => nameHandler(e.target.value)}
            />
        </div>
    )
}

export const EventDescription = ({ desc, descHandler }) => {
    return (
        <div>
            <InputTextarea
                maxLength={descMaxLength}
                value={desc}
                placeholder="Description"
                onChange={(e) => descHandler(e.target.value)}
            />
        </div>
    )
}

export const EventReminder = ({ reminder, reminderHandler }) => {
    return (
        <div>
            <Checkbox
                inputId="reminderCheckbox"
                value="Do you want reminders?"
                onChange={() => reminderHandler(!reminder)}
                checked={reminder}
            />
            <label style={{ paddingLeft: '.5rem' }} htmlFor="reminderCheckbox">
                {reminderLabel}
            </label>
        </div>
    )
}

export const EventAccountForYear = ({ eventAccountForYear, changeHandler }) => {
    return (
        <div className="p-field-checkbox">
            <Checkbox
                className="p-d-block"
                inputId="accountForYear"
                value="Account for year?"
                onChange={() => changeHandler(!eventAccountForYear)}
                checked={eventAccountForYear}
            />
            <label className="p-d-block" htmlFor="accountForYear">
                {accountForYearLabel}
            </label>
            <Tooltip target=".pi-info-circle" />
            <i
                className="pi pi-info-circle"
                data-pr-tooltip={accountForYearTooltip}
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                style={{
                    fontSize: '1rem',
                    paddingLeft: '.5rem',
                    color: 'darkblue',
                }}
            />
        </div>
    )
}

export const EventReminderInDays = ({ eventReminderDays, changeHandler }) => {
    return (
        <div className="p-field p-col">
            <label htmlFor="integeronly">How many days notice?</label>
            <InputNumber
                inputId="integeronly"
                min={daysNoticeMinValue}
                max={daysNoticeMaxValue}
                value={eventReminderDays}
                onValueChange={(e) => changeHandler(e.target.value)}
            />
        </div>
    )
}

export const AdminEmailAdress = ({ email, emailHandler }) => {
    return (
        <div className="p-d-flex">
            <InputText
                className="p-inputtext-lg p-d-block"
                placeholder="* email"
                required={true}
                value={email}
                onChange={(e) => emailHandler(e.target.value)}
            />
        </div>
    )
}

export const EmailReminders = ({ emailReminder, emailReminderHandler }) => {
    return (
        <div className="p-field-checkbox">
            <Checkbox
                className="p-d-block"
                inputId="accountForYear"
                value={emailReminder}
                onChange={() => emailReminderHandler(!emailReminder)}
                checked={emailReminder}
            />
            <label className="p-d-block" htmlFor="accountForYear">
                Enable emails?
            </label>
            <Tooltip target=".pi-info-circle" />
            <i
                className="pi pi-info-circle"
                data-pr-tooltip="enable email reminders"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                style={{
                    fontSize: '1rem',
                    paddingLeft: '.5rem',
                    color: 'darkblue',
                }}
            />
        </div>
    )
}

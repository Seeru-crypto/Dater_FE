import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'

import config from '../../config.json'

const nameMaxLength = config.nameMaxLength
const descMaxLength = config.descMaxLength

export const EventName = ({ name, nameHandler }) => {
    return (
        <div>
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
                Do you want reminders?
            </label>
        </div>
    )
}

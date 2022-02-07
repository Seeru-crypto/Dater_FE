import styled from 'styled-components'
import { Checkbox } from 'primereact/checkbox'
import { Tooltip } from 'primereact/tooltip'

const AdminEmailReminders = ({
                                 emailReminder,
                                 emailReminderHandler,
                                 toolTipMessage,
                             }) => {
    return (
        <AdminEmailReminderStyle>
            <div className='p-field-checkbox'>
                <Checkbox
                    className='p-d-block'
                    inputId='accountForYear'
                    value={emailReminder}
                    onChange={() => emailReminderHandler(!emailReminder)}
                    checked={emailReminder}
                />
                <label className='p-d-block' htmlFor='accountForYear'>
                    Enable email reminders?
                </label>
                <Tooltip target='.pi-info-circle' />
                <i
                    className='pi pi-info-circle'
                    data-pr-tooltip={toolTipMessage}
                    data-pr-position='right'
                    data-pr-at='right+5 top'
                    data-pr-my='left center-2'
                    style={{
                        fontSize: '1rem',
                        paddingLeft: '.5rem',
                        color: 'darkblue',
                    }}
                />
            </div>
        </AdminEmailReminderStyle>
    )
}

export default AdminEmailReminders

const AdminEmailReminderStyle = styled.div``
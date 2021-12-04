import React from 'react'
import { Button } from 'primereact/button'

import { PostSendEmailReminders } from '../../API/api-requests'

const Admin = () => {
    const sendEmailReminder = () => {
        PostSendEmailReminders()
        console.log('emails sent!')
    }

    return (
        <div>
            <h1>Admin Page!</h1>
            <ul>
                <li>change email template</li>
                <li>default email aadress</li>
            </ul>
            <Button
                style={{ margin: '2rem' }}
                className="p-button-raised"
                onClick={sendEmailReminder}
            >
                Send email reminders!
            </Button>
        </div>
    )
}
export default Admin

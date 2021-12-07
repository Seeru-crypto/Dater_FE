import React, { useState } from 'react'

import { AdminEmailAdress, EmailReminders } from '../form-components/fields'

const Admin = () => {
    const [adminEmail, setadminEmail] = useState(null)
    const [emailReminder, setEmailReminder] = useState(null)

    return (
        <div className="card">
            <div className="p-field">
                <div className="p-field p-col">
                    <div className="p-field p-row">
                        <h1>Admin Page!</h1>
                        <p>default email aadress</p>
                        <div>
                            <AdminEmailAdress
                                email={adminEmail}
                                emailHandler={(e) => setadminEmail(e)}
                            />
                        </div>
                    </div>

                    <div>
                        <EmailReminders
                            emailReminder={emailReminder}
                            emailReminderHandler={(e) => setEmailReminder(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin

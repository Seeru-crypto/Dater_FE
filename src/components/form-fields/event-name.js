import React, { useState } from 'react'
import './form-styles.css'
import FieldInvalidMsg from './field-invalid-msg'
import config from '../../config.json'

const EventName = ({ name, nameHandler, missing }) => {
    // ToDo Add continues check, so that user can enter invalid chars but cannot submit them
    const [invalidMsg, setInvalidMsg] = useState('')

    const inputValidation = (userInput) => {
        (userInput.length > config.nameMaxLength) ? setInvalidMsg('Name too long!') : setInvalidMsg('');
        nameHandler(userInput)
    }

    return (
        <div className='floating-group'>
            <input type='text' value={name} onChange={(e) => inputValidation(e.target.value)}
                   id='eventName' className={`text ${missing ? 'missing' : ''}`} required />
            <label className='floating-label' htmlFor='eventName'>event name</label>
            <FieldInvalidMsg errorMessage={invalidMsg} />
        </div>
    )
}

export default EventName

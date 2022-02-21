import React, { memo, useState } from 'react'
import './form-styles.css'
import FieldInvalidMsg from './field-invalid-msg'
import config from '../../config.json'

const EventName = ({ name, nameHandler, missing }) => {
    const [invalidMsg, setInvalidMsg] = useState('')

    const inputValidation = (userInput) => {
        if (userInput.length > config.NAME_MAX_LEN - 10) setInvalidMsg(`${userInput.length}\/${config.NAME_MAX_LEN}`)
        else setInvalidMsg('')
        nameHandler(userInput)
    }

    return (
        <div className='floating-group'>
            <input type='text' autoComplete='off' value={name} onChange={(e) => inputValidation(e.target.value)}
                   id='eventName' className={`text ${missing ? 'missing' : ''}`} required />
            <label className='floating-label' htmlFor='eventName'>event name</label>
            <FieldInvalidMsg messageContent={invalidMsg} />
        </div>
    )
}

export default memo(EventName)

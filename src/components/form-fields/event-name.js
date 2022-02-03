import React from 'react'
import './form-styles.css'

const EventName = ({ name, nameHandler, missing }) => {
    return (
        <div className='floating-group'>
            <input type='text' value={name} onChange={(e) => nameHandler(e.target.value)}
                   id='eventName' className={`text ${missing ? 'missing' : ''}`} required />
            <label className='floating-label' htmlFor='eventName'>event name</label>
        </div>
    )
}

export default EventName
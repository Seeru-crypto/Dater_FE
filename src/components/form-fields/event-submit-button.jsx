import React from 'react'
import './form-styles.css'

const EventSubmitButton = ({ onClickHandler }) => {
    return (
        <input formNoValidate={true} type='submit' onClick={(e) => onClickHandler(e)} value='save' />
    )
}
export default EventSubmitButton
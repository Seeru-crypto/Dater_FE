import React, {memo,  useEffect, useState } from 'react'
import config from '../../config.json'
import './form-styles.css'
import styled from 'styled-components'
import FieldInvalidMsg from './field-invalid-msg'

const EventDescription = ({ desc, descHandler, missing }) => {
    const [invalidMsg, setInvalidMsg] = useState('')

    useEffect(() => {
        if (desc.trim().length === 0) document.getElementById('eventDesc').setCustomValidity('Input cannot be empty')
    }, [])

    const inputValidation = (userInput) => {
        const input = document.getElementById('eventDesc')
        if (userInput.length > config.DESC_MAX_LEN - 10) setInvalidMsg(`${userInput.length}\/${config.DESC_MAX_LEN}`)
        else setInvalidMsg("");
        userInput === '' ? input.setCustomValidity('Input cannot be empty') : input.setCustomValidity('')
        descHandler(userInput)
    }

    return (
        <DescBoxStyle>
            <div className='floating-group desc'>
                <textarea aria-invalid={false} rows={4} value={desc}
                          className={`desc ${missing ? 'missing' : ''}`}
                          onChange={(e) => inputValidation(e.target.value)}
                          id='eventDesc' />
                <label className='floating-label' htmlFor='eventDesc'>event description</label>
                <FieldInvalidMsg messageContent={invalidMsg} />
            </div>
        </DescBoxStyle>
    )
}

export default memo(EventDescription)

const DescBoxStyle = styled.div`

  textarea {
    resize: vertical;
    overflow: hidden;
  }
`

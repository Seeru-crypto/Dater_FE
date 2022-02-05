import config from '../../config.json'
import './form-styles.css'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import FieldInvalidMsg from './field-invalid-msg'

const EventDescription = ({ desc, descHandler }) => {
    // ToDo Add continues check, so that uuser can enter invalid chars but cannot submit them
    const [invalidMsg, setInvalidMsg] = useState('')

    useEffect(() => {
        if (desc.trim().length === 0) document.getElementById('eventDesc').setCustomValidity('Input cannot be empty');
    }, []);

    const inputValidation = (userInput) => {
        const input = document.getElementById('eventDesc')
        userInput.length > config.descMaxLength ? setInvalidMsg("Description too long!") : setInvalidMsg("");
        userInput === '' ?  input.setCustomValidity('Input cannot be empty') : input.setCustomValidity('');
        descHandler(userInput);
    }

    return (
        <DescBoxStyle>
            <div className='floating-group desc'>
                <textarea aria-invalid={false} rows={4} value={desc}
                          onChange={(e) => inputValidation(e.target.value)}
                          id='eventDesc' />
                <label className='floating-label' htmlFor='eventDesc'>event description</label>
                <FieldInvalidMsg errorMessage={invalidMsg} />
            </div>
        </DescBoxStyle>
    )
};

export default EventDescription

const DescBoxStyle = styled.div`

  textarea {
    resize: vertical;
    overflow: hidden;
  }
`

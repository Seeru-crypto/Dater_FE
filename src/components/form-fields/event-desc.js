import config from '../../config.json'
import './form-styles.css'
import styled from 'styled-components'
import { useEffect } from 'react'

const EventDescription = ({ desc, descHandler }) => {

    useEffect(() => {
        document.getElementById('eventDesc').setCustomValidity('Input cannot be empty')
    }, [])
    const inputValidation = (userInput) => {
        const input = document.getElementById('eventDesc')
        if (userInput.length <= 100) descHandler(userInput)
        if (userInput === '') input.setCustomValidity('Input cannot be empty')
        else input.setCustomValidity('')
    }


    return (
        <DescBoxStyle>
            <div className='floating-group desc'>
                <textarea rows={3} maxLength={config.descMaxLength} value={desc}
                          onChange={(e) => inputValidation(e.target.value)}
                          id='eventDesc' />
                <label className='floating-label' htmlFor='eventDesc'>event description</label>
            </div>
        </DescBoxStyle>
    )
}
export default EventDescription

const DescBoxStyle = styled.div`
  textarea {
    resize: none;
  }
`

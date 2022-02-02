import { Checkbox } from 'primereact/checkbox'
import React from 'react'
import config from '../../config.json'
import styled from 'styled-components'
import './form-styles.css'
import { Tooltip } from 'primereact/tooltip'

const EventYearlyCb = ({ eventAccountForYear, changeHandler }) => {
    const labels = config.labels

    return (
        <CheckBoxStyle>
            <div className='p-field-checkbox'>
                <Checkbox
                    className='p-d-block'
                    inputId='accountForYear'
                    value='Account for year?'
                    onChange={() => changeHandler(!eventAccountForYear)}
                    checked={eventAccountForYear}
                />
                <label className='p-d-block' htmlFor='accountForYear'>
                    {labels.accountForYearLabel}
                </label>
                <Tooltip target='.pi-info-circle' />
                <i
                    className='pi pi-info-circle'
                    data-pr-tooltip={labels.accountForYearTooltip}
                    data-pr-position='right'
                    data-pr-at='right+5 top'
                    data-pr-my='left center-2'
                />
            </div>
        </CheckBoxStyle>
    )
}
export default EventYearlyCb

const CheckBoxStyle = styled.div`
  margin-top: -1.5rem;
  display: flex;

  label {
    padding-left: 0.5rem;
    color: var(--text);
  }

  i {
    font-size: 1rem;
    padding-left: .5rem;
    color: var(--text);
  }
`
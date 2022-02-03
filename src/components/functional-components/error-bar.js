import React from 'react'
import { Message } from 'primereact/message'
import styled from 'styled-components'
import config from '../../config.json'

const ErrorBar = ({ error }) => {

    return (
        <ErrorBarStyle hidden={!error}>
            <Message className='error-msg' severity='error' text={config.labels.defaultErrorMessage} />
        </ErrorBarStyle>
    )
}
export default ErrorBar

const ErrorBarStyle = styled.div`
  .error-msg {
    display: flex;
    width: 100%;
    align-items: center;
  }

`

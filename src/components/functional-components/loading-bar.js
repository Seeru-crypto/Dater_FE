import React from 'react'
import styled from 'styled-components'
import { ProgressBar } from 'primereact/progressbar';

const LoadingBar = ({ loading }) => {

    return (
        <LoadingBarStyle hidden={!loading}>
            <ProgressBar className="loading-bar" mode="indeterminate"/>
        </LoadingBarStyle>
    )

}
export default LoadingBar

const LoadingBarStyle = styled.div`

  .loading-bar {
    height: 3px;
  }

`

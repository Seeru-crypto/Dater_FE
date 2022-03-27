import React from 'react';
import styled from 'styled-components';
import { ProgressBar } from 'primereact/progressbar';

function LoadingBar({ loading }) {
  return (
    <LoadingBarStyle hidden={!loading}>
      <ProgressBar className="loading-bar" mode="indeterminate" />
    </LoadingBarStyle>
  );
}
export default React.memo(LoadingBar);

const LoadingBarStyle = styled.div`
  .loading-bar {
    height: 5px;
  }
`;

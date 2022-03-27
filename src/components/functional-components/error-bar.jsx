import React from 'react';
import { Message } from 'primereact/message';
import styled from 'styled-components';
import config from '../../config.json';

function ErrorBar({ error }) {
  return (
    <ErrorBarStyle hidden={!error}>
      <Message className="error-msg" severity="error" text={config.LABELS.DEFAULT_ERR_MSG} />
    </ErrorBarStyle>
  );
}
export default React.memo(ErrorBar);

const ErrorBarStyle = styled.div`
  .error-msg {
    display: flex;
    width: 100%;
    align-items: center;
  }
`;

import React from 'react';
import '../../static/css-files/form-styles.css';
import styled from 'styled-components';

function FieldInvalidMsg({ messageContent }) {
  return <ErrorMessageStyle>{messageContent && <em>{messageContent}</em>}</ErrorMessageStyle>;
}

export default FieldInvalidMsg;

const ErrorMessageStyle = styled.div`
  font-size: 0.7rem;
  margin-right: 0.8rem;
  padding-top: 0.2rem;
  margin-bottom: -1.1rem;
  color: var(--paragraph);
  display: flex;
  justify-content: flex-end;
`;

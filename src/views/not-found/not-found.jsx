import React from 'react';
import styled from 'styled-components';

function NotFound() {
  return <NotFoundStyle>Page not found!</NotFoundStyle>;
}
export default NotFound;

const NotFoundStyle = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: xxx-large;
  padding-bottom: 30rem;
`;

import React from 'react';
import Register from './Register';
import styled from 'styled-components';

function AppWrapper({ className, children }) {
  return <div className={className}>{children}</div>;
}

const StyledAppWrapper = styled(AppWrapper)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4a4e69;
`;

function App() {
  return (
    <StyledAppWrapper>
      <Register />
    </StyledAppWrapper>
  );
}

export default App;

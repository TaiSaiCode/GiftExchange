import React from "react";
import styled from "styled-components";
import SigninLoginCard from "../RegisterAndLogin/SigninLoginCard";

export default function LoginPage({ sessionHandler }) {
  return (
    <FlexContainer>
      <SigninLoginCard sessionHandler={sessionHandler} />
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

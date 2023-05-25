import React from "react";
import styled from "styled-components";
import RegisterCard from "../RegisterAndLogin/RegisterCard";

export default function RegisterPage({ sessionHandler }) {
  return (
    <FlexContainer>
      <RegisterCard sessionHandler={sessionHandler} />
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

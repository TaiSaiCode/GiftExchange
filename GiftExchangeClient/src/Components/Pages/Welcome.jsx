import React from "react";
import styled from "styled-components";
import StyledCard from "../Styled/StyledCard";
import { Link } from "react-router-dom";

const Welcome = ({ sessionHandler }) => {
  return (<>
    <StyledCard margin="10px" padding="15px" width="100%">
      <h2>Bienvenue au gift-exchange</h2>
      {sessionHandler.getActiveSession() ? (
        <Link to="/groupes">Consulte tes groupes !</Link>
      ) : (
        <p>
          Clique <Link to="/register">ici</Link> pour t'enregister!
        </p>
      )}
      
    </StyledCard>
    <p />
    </>
  );
};

const TextLeft = styled.p`
  text-align: left;
`;
export default Welcome;

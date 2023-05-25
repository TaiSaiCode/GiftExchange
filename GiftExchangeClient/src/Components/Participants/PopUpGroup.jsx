import React from "react";
import styled from "styled-components";
import ButtonSample from "../Styled/ButtonSample";
import BlueBorder from "../Styled/BlueBorder";
export default function PopUpGroup({ group, closing }) {
  return (
    <PaddedBorder>
      <div>
        <div style={{ display: "inline-block" }}>
          <h2>{group.name} </h2>
          <b>Administré par : </b> {group.AdminsNames}
          <br />
          <p>Description : {group.description}</p>
          <br></br>
          <b>Date de tirage : </b>
          {group.DrawDate == null ? "Indefini" : group.DrawDate}
          <br />
          <b>Budget des cadeaux : </b>
          {group.Budget}
          <br />
        </div>
      </div>
      <ButtonSample onClick={() => closing()}>Fermer</ButtonSample>
    </PaddedBorder>
  );
}

const PaddedBorder = styled.div`
  padding: 2vmin;
`;

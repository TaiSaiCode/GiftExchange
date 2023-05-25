import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function ListGroupItem({ group }) {
  const navigate = useNavigate();
  return (
    <StyledCardWithHover onClick={(e) => navigate("/group/" + group.id)}>
      <GridLayout>
        {/* Photo */}
        <GridItem rs="1" re="4">
          {group.imageUrl ? (
            <Image type="image/jpg" src={group.imageUrl} height="50px" />
          ) : (
            <></>
          )}
        </GridItem>

        {/*Nom  */}
        <GridItem cs="2" ce="2">
          <span>Nom : {group.name}</span>
        </GridItem>

        {/* Description */}
        <GridItem cs="2" ce="2">
          <span>Description: {group.description}</span>
        </GridItem>

        {/* Admin */}
        <GridItem cs="3" ce="3" rs="1" re="2">
          <span>
            Admins:{" "}
            {group.admins.map(
              (element) => element.firstname + " " + element.lastname + ", "
            )}
          </span>
        </GridItem>
      </GridLayout>
    </StyledCardWithHover>
  );
}

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
`;

const StyledCardWithHover = styled(Card)`
  padding: 2vh;
  transition: all 0.2s;
  &:hover {
    box-shadow: 1px 1px 10px #7fff00;
    cursor: pointer;
  }
`;

const GridItem = styled.div`
  text-align: left;
  grid-column-start: ${(props) => (props.cs ? props.cs : "")};
  grid-column-end: ${(props) => (props.ce ? props.ce : "")};
  grid-row-start: ${(props) => (props.rs ? props.rs : "")};
  grid-row-end: ${(props) => (props.re ? props.re : "")};
`;

const Image = styled.embed`
  border-radius: 5px;
  border: 1px solid black;
`;

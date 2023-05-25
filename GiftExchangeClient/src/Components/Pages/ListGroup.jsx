import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import StyledCard from "../Styled/StyledCard";
import ListGroupItem from "../ListGroup/ListGroupItem";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function ListGroup({ sessionHandler }) {
  const [listGroup, setListGroup] = useState();
  const [loading, setLoading] = useState(true);
  const [dateUpdate, setDateUpdate] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //ComponentMount, update and unmount right there
  useEffect(() => {
    const update = updateList();
    return () => clearTimeout(update);
  }, []);

  //Future request handling
  function updateList() {
    return setTimeout(() => {
      axios
        .get("https://localhost:7160" + "/get-groups")
        .then((response) => {
          setListGroup(response.data);
          if (loading == true) setLoading(false);
          setDateUpdate(new Date().toUTCString());
          setError("");
        })
        .catch((error) => {
          if (error.request && error.request.status == 0) {
            if (import.meta.env.VITE_OFFLINE != "true")
              navigate("/network-problem");
          } else if (error.request && error.request.status == 401) {
            sessionHandler.deleteSession();
            navigate("/login");
          }
          setError(error.message);
        });
    }, 1000);
  }

  return (
    <StyledCard width={"100%"}>
      <h3>Liste de groupes</h3>
      <FlexGapLayout>
        {loading ? (
          <LoadingCentered>
            <ReactLoading type="bubbles" color="black" />
          </LoadingCentered>
        ) : (
          <>
            {!error ? mapListGroupToListGroupItem(listGroup) : <p>{error}</p>}
          </>
        )}

        <DateLayout>
          <Button variant="light" onClick={(e) => navigate(-1)}>
            <BiArrowBack size={"3vmin"} />
          </Button>
          <span>Dernière mise a jours: {dateUpdate}</span>
        </DateLayout>
      </FlexGapLayout>
    </StyledCard>
  );
}

function mapListGroupToListGroupItem(listGroup) {
  let display = [];
  Object.keys(listGroup).forEach((key) => {
    display.push(<ListGroupItem key={key + "lgi"} group={listGroup[key]} />);
  });
  return display;
}

const LoadingCentered = styled.div`
  display: flex;
  justify-content: center;
`;

const DateLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexGapLayout = styled.div`
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  gap: 1vmin;
`;

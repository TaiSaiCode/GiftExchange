import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { IoAlertCircle } from "react-icons/io5";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
const NavbarUser = ({ sessionHandler, reload }) => {
  const user = sessionHandler.getActiveSession();
  const [nbInvite, setNbInvite] = useState();
  const [refresh, setRefresh] = useState();
  const location = useLocation();
  async function getInvite() {
    await axios
      .get("https://localhost:7160" + "/nbInvite")
      .then((response) => {
        if (response && response.data) setNbInvite(parseInt(response.data));
      })
      .catch((error) => {
        setNbInvite(0);
      });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((refresh) => !refresh);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getInvite();
  }, [reload, location.pathname, refresh]);
  return (
    <CardPaddedAndMarged>
      <NavLeft>
        <NavLinkLeft>
          <Link to="/groupes">Mes groupes</Link>
        </NavLinkLeft>
        <NavLinkLeft>
          <Link to="/invitations">
            <InlineDiv>
              {" "}
              Invitations en cours{" "}
              {nbInvite ? (
                <div style={{ paddingLeft: "2vmin", paddingTop: "1vmin" }}>
                  <IoAlertCircle
                    color="deepskyblue"
                    size={"2vmin"}
                    id="alert-circle"
                    style={{
                      boxShadow: "1px 1px 10px deepskyblue",
                      borderRadius: "100%",
                    }}
                  />
                  <Tooltip
                    anchorId="alert-circle"
                    content={"Vous avez " + nbInvite + " nouvelle invitations!"}
                    variant="info"
                    style={{ zIndex: 100 }}
                  />
                </div>
              ) : (
                <></>
              )}
            </InlineDiv>
          </Link>
        </NavLinkLeft>
        <NavLinkLeft>
          <Link to="/create-group"> Créer un Groupe</Link>
        </NavLinkLeft>
      </NavLeft>
    </CardPaddedAndMarged>
  );
};

const CardPaddedAndMarged = styled(Card)`
  border-color: deepskyblue;
  width: 100%;
  max-width: max-content;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-right: 1vw;
  margin: 1vmin;
  @media screen and (max-width: 1000px) {
    max-width: 100%;
  }
`;

const NavLeft = styled(Nav)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;
const NavLinkLeft = styled(Nav.Link)`
  text-align: left;
`;
const InlineDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default NavbarUser;

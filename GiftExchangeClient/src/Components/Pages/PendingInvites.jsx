import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ParticipantJoinCard from "../Participants/ParticipantJoinCard";
import axios from "axios";

export default function PendingInvites({
  sessionHandler,
  reloadUserNav,
  setReloadUserNav,
}) {
  const [listInvite, setListInvite] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7160/listInvite")
      .then((res) => {
        console.log(res.data);
        setListInvite(res.data);
      })
      .catch((err) => {
        if (err.request && err.request.status == 0) {
          if (import.meta.env.VITE_OFFLINE != "true")
            navigate("/network-problem");
        } else if (err.request && err.request.status == 401) {
          sessionHandler.deleteSession();
          navigate("/login");
        }
        console.error(err);
        setListInvite([]);
      })
      .finally(() => {
        setReloadUserNav(!reloadUserNav);
      });
  }, [reload]);
  return (
    <>
      <div>
        {listInvite.map((element, index) => (
          <ParticipantJoinCard
            key={element.id}
            group={element}
            reload={reload}
            setReload={setReload}
            sessionHandler={sessionHandler}
          />
        ))}
      </div>
    </>
  );
}

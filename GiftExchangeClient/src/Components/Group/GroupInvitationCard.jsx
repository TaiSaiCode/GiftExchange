import React, { useState } from "react";
import { LabelTextbox } from "../Styled/LabelTextbox";
import ButtonSample from "../Styled/ButtonSample";
import axios from "axios";
import CustomPopUp, { Alert } from "../Styled/Customs";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
export default function GroupInvitationCard({ IdGroup, closing }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [popUp, setPopUp] = useState();

  function sendInvite() {
    const user = {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
    };
    axios
      .post(`https://localhost:7160/group?groupId=${IdGroup}`, user)
      .then((res) => {
        closing(
          <>
            <Alert text="Courriel envoyé" closing={closing} />
          </>
        );
      })
      .catch((err) => {
        setPopUp(<Alert text={err.response.data} closing={setPopUp} />);
      });
  }
  return (
    <>
      <CustomPopUp render_state={[popUp, setPopUp]} />
      <h3 style={{ marginTop: 10, marginBottom: 30 }}>Inviter</h3>
      <LabelTextbox
        required={true}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        placeholder="Prénom"
        labelText="Entrer prénom"
        value={firstname}
        setValue={setFirstName}
      />
      <LabelTextbox
        required={true}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        placeholder="Nom de famille"
        labelText="Entrer nom de famille"
        value={lastname}
        setValue={setLastName}
      />
      <LabelTextbox
        required={true}
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Courriel"
        labelText="Entrer courriel"
        value={email}
        setValue={setEmail}
      />
      <ButtonSample
        onClick={() => {
          sendInvite();
        }}
        innerText="Envoyer invitation"
        style={{ marginBottom: 80, marginTop: 30 }}
      />
    </>
  );
}

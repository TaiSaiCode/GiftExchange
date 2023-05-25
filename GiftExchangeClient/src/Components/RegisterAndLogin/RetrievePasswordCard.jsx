import React, { useState } from "react";
import styled from "styled-components";
import StyledCard from "../Styled/StyledCard";
import { LabelTextbox } from "../Styled/LabelTextbox";
import Form from "react-bootstrap/Form";
import ButtonSample from "../Styled/ButtonSample";
import axios from "axios";
import CustomPopUp, {Alert} from "../Styled/Customs";

function RetrievePassword() {
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [popUpContent, setPopUpContent] = useState("");

  function sendPassword(e) {
    e.preventDefault()
    console.log("Yes!")

    axios.post("https://localhost:7160" + "/retrievepassword", { email: email})
      .then((res) => {
        console.log(res);
        setPopUpContent(
          <Alert
            header={"Un email avec un nouveau mot de passe vous a été envoyé."}
            closing={setPopUpContent}
          />
        );
        setEmail("")
        // Check if the response indicates an invalid email
      }).catch((err) => {
        setPopUpContent(
          <Alert
            header={"Le courriel n'existe pas!"}
            closing={setPopUpContent}
          />
        )
        console.log(err);
        // Handle error
      });
  }

  return (
    <>
      <CustomPopUp render_state={[popUpContent, setPopUpContent]}
      show_dialog={true}
       />
      <CenteredLayout>
        <StyledCard width={"20vw"} minWidth={"300px"}>
          <p size={"25px"}>Recuperer votre mot de passe</p>
          {/* Email */}
          <LabelTextbox
                required={true}
                type="email"
                value={email}
                setValue={setEmail}
                setValidity={setEmailValidity}
                placeholder="courriel"
                labelText="Courriel"
                id="email"
              />
          <br></br>
          <ButtonSample onClick={sendPassword}>Envoyer mot de passe</ButtonSample>

        </StyledCard>
      </CenteredLayout></>
  );
}

const CenteredLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1vmin;
`;


export default RetrievePassword
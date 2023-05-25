import React, { useState } from "react";
import styled from "styled-components";
import StyledCard from "../Styled/StyledCard";
import { LabelTextbox } from "../Styled/LabelTextbox";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BiPencil, BiCheck, BiX } from "react-icons/bi";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomPopUp, { Confirm, Alert } from "../Styled/Customs";
export default function Profil({ sessionHandler }) {
  //Logic state
  const profil = sessionHandler.getActiveSession();
  const navigate = useNavigate();

  //Error block
  const [error, setError] = useState();

  //Modal state
  const [popUpContent, setPopUpContent] = useState();

  //BLOCK BOUTON
  const [modify_info, setModifyInfo] = useState(false);
  const [modify_password, setModifyPassword] = useState(false);

  //BLOCK INPUT INFO
  const [username, setUsername] = useState("");
  const [usernameValidity, setUsernameValidity] = useState();
  const [firstname, setFirstname] = useState("");
  const [firstNameValidity, setFirstNameValidity] = useState();
  const [lastname, setlastname] = useState("");
  const [lastnameValidity, setlastnameValidity] = useState();
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState();

  //BLOCK INPUT PASSWORD
  const [new_password, setNewpassword] = useState("");
  const [new_password_validity, setNewpasswordValidity] = useState("");
  const [confirm_password, setConfirmpassword] = useState("");
  const [confirm_password_validity, setConfirmPasswordValidity] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [old_password_validity, setOldPasswordValidity] = useState();

  //RELOAD STATE
  const [reload, setReload] = useState(false);

  useEffect(
    (e) => {
      //Update request
      axios
        .get("https://localhost:7160" + "/profil")
        .then((response) => {
          let data = response.data;
          setFirstNameValidity(true);
          setlastnameValidity(true);
          setEmailValidity(true);
          setUsernameValidity(true);
          setUsername(data.username);
          setFirstname(data.firstname);
          setEmail(data.email);
          setlastname(data.lastname);
        })
        .catch((error) => {
          //Token error
          if (
            error.request &&
            error.request.status &&
            error.request.status == 401
          )
            sessionHandler.deleteSession();

          //Network error
          if (error.request && error.request.status == 0)
            if (import.meta.env.VITE_OFFLINE != "true")
              navigate("/network-problem"); //TODO : REMOVE IF STATEMENT IN PROD
        });

      //Reset state on reload
      setModifyInfo(false);
      setModifyPassword(false);

      setConfirmPasswordValidity(false);
      setNewpasswordValidity(false);
      setOldPasswordValidity(false);
      setOldPassword("");
      setNewpassword("");
      setConfirmpassword("");
    },
    [reload]
  );

  function sendNewProfilInfo(e) {
    e.preventDefault();

    if (!validateInfoInput()) {
      setError("Les champs doivent être valide !");
      setReload(!reload);
      return;
    }
    let popupMessage = "";

    if (username != sessionHandler.getActiveSession().username)
      popupMessage +=
        "Vous vous appretez, entre autre, a modifier votre nom d'utilisateur. Êtes vous sur ? Cette action vous emmenera a la page de connexion.";
    else {
      popupMessage += "Confirmer les modifications apporté";
    }

    //Double prompt
    setPopUpContent(
      <Confirm
        text={popupMessage}
        header={"Confirmation"}
        onNo={() => {
          setReload(!reload);
          setPopUpContent();
        }}
        onClosing={setPopUpContent}
        onYes={() => {
          setPopUpContent();
          axios
            .post("https://localhost:7160/" + "profil", {
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
            })
            .then((response) => {
              setError("");
              setPopUpContent(
                <Alert
                  text={"Les modifications ont bien été exécuté."}
                  header={"Confirmation"}
                  closing={() => {
                    if (
                      sessionHandler.getActiveSession().username == username
                    ) {
                      sessionHandler.startSession(response.data);
                    } else {
                      sessionHandler.deleteSession();
                      navigate("/login");
                    }
                    setReload(!reload);
                    setPopUpContent();
                  }}
                />
              );
            })
            .catch((error) => {
              //Costum error message
              if (error.response && error.response.data)
                setError(error.response.data);
              //Base axios messaeg
              else setError(error.message);
              setReload(!reload);
            });
        }}
      />
    );
  }

  function sendNewPassword(e) {
    e.preventDefault();
    if (!validatePasswordInput()) {
      setError("Tous les champs doivent être valide !");
      setReload(!reload);
      return;
    }
    //Modal to confirm
    setPopUpContent(
      <Confirm
        text={"Voulez-vous modifier votre mot de passe ?"}
        header="Confirmation"
        //If you dont want to modify
        onNo={() => {
          setPopUpContent();
          setReload(!reload);
        }}
        //If you want to modify
        onYes={(e) => {
          setPopUpContent();

          //Request to back-end
          axios
            .post("https://localhost:7160" + "/modifiyPassword", {
              oldpassword: old_password,
              newpassword: new_password,
            })

            //If success
            .then((response) => {
              setPopUpContent(
                //
                //Alert when success
                <Alert
                  text={response.data}
                  closing={(e) => {
                    setPopUpContent();
                    sessionHandler.deleteSession();
                  }}
                />
              );
            })
            //IF not success
            .catch((error) => {
              //Costum error message
              if (error.response && error.response.data)
                setError(error.response.data);
              //Base axios messaeg
              else setError(error.message);
              setReload(!reload);
            });
        }}
      />
    );
  }
  function validateInfoInput() {
    if (!firstNameValidity) return false;
    if (!lastnameValidity) return false;
    if (!usernameValidity) return false;
    if (!emailValidity) return false;
    return true;
  }

  function validatePasswordInput() {
    if (!old_password_validity) return false;
    if (!new_password_validity) return false;
    if (!confirm_password_validity) return false;
    return true;
  }

  return (
    <>
      <CustomPopUp
        render_state={[popUpContent, setPopUpContent]}
        show_dialog={true}
      />
      <CenteredLayout>
        {/* Error label */}
        {error && (
          <MargedDiv
            className="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded"
            role="alert"
          >
            <span className="tw-block tw-sm:inline">{error}</span>
          </MargedDiv>
        )}

        <StyledCard width={"30vw"} minWidth={"300px"}>
          <Form>
            <Text size={"30px"}>Info</Text>

            {/* Username */}
            <Form.Group>
              <LabelTextbox
                required={true}
                type={"restrictedText"}
                value={username}
                setValue={setUsername}
                setValidity={setUsernameValidity}
                placeholder="nom d'utilisateur"
                labelText="Nom d'utilisateur"
                id="username"
                disabled={modify_info ? false : true}
              />
            </Form.Group>
            {/* Prénom */}
            <Form.Group>
              <LabelTextbox
                required={true}
                type={"name"}
                value={firstname}
                setValue={setFirstname}
                setValidity={setFirstNameValidity}
                placeholder="prénom"
                labelText="Prénom"
                id="firstname"
                disabled={modify_info ? false : true}
              />
            </Form.Group>
            {/* Nom */}
            <Form.Group>
              <LabelTextbox
                required={true}
                type={"name"}
                value={lastname}
                setValue={setlastname}
                setValidity={setlastnameValidity}
                placeholder="nom"
                labelText="Nom"
                id="lastname"
                disabled={modify_info ? false : true}
              />
            </Form.Group>
            {/* Email */}
            <Form.Group>
              <LabelTextbox
                required={true}
                type="email"
                value={email}
                setValue={setEmail}
                setValidity={setEmailValidity}
                placeholder="courriel"
                labelText="Courriel"
                id="email"
                disabled={modify_info ? false : true}
              />
            </Form.Group>
            <Form.Group>
              <FlexLayout>
                {modify_info ? (
                  <>
                    <Button
                      className="mx-2"
                      variant="outline-danger"
                      onClick={(e) => setReload(!reload)}
                    >
                      <BiX size={"30px"} />
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-success"
                      onClick={sendNewProfilInfo}
                    >
                      <BiCheck size={"30px"} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="light"
                    onClick={(e) => {
                      setModifyInfo(true);
                      setError("");
                    }}
                  >
                    <BiPencil size={"30px"}></BiPencil>
                  </Button>
                )}
              </FlexLayout>
            </Form.Group>
          </Form>
        </StyledCard>
        {/* //TODO : ADD Old password */}
        <StyledCard width={"30vw"} minWidth={"300px"} marginTop="1vh">
          <Form>
            <Text size={"30px"}>Mot de passe</Text>
            <Form.Group>
              {/* New password */}
              <LabelTextbox
                required={true}
                type="password"
                value={old_password}
                setValue={setOldPassword}
                setValidity={setOldPasswordValidity}
                placeholder="mot de passe"
                labelText="Ancien mot de passe"
                id="password"
                disabled={modify_password ? false : true}
              />
            </Form.Group>
            <Form.Group>
              {/* New password */}
              <LabelTextbox
                required={true}
                type="password"
                value={new_password}
                setValue={setNewpassword}
                setValidity={setNewpasswordValidity}
                placeholder="mot de passe"
                labelText="Nouveau mot de passe"
                id="password"
                disabled={modify_password ? false : true}
              />
            </Form.Group>
            {/* Comfirmed password */}
            <Form.Group>
              <LabelTextbox
                required={true}
                type="confirmPassword"
                value={confirm_password}
                setValue={setConfirmpassword}
                setValidity={setConfirmPasswordValidity}
                valueToConfirm={new_password}
                placeholder="répéter mot de passe"
                labelText="Confirmer mot de passe"
                id="repassword"
                disabled={modify_password ? false : true}
              />
            </Form.Group>
            <Form.Group>
              <FlexLayout>
                {modify_password ? (
                  <>
                    <Button
                      className="mx-2"
                      variant="outline-danger"
                      onClick={(e) => setReload(!reload)}
                    >
                      <BiX size={"30px"} />
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-success"
                      onClick={sendNewPassword}
                    >
                      <BiCheck size={"30px"} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="light"
                    onClick={(e) => setModifyPassword(true)}
                  >
                    <BiPencil size={"30px"}></BiPencil>
                  </Button>
                )}
              </FlexLayout>
            </Form.Group>
          </Form>
        </StyledCard>
      </CenteredLayout>
    </>
  );
}

const Text = styled.p`
  font-size: ${(props) => (props.size ? props.size : "")};
`;

const CenteredLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1vmin;
`;

const FlexLayout = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: 1vmin;
`;

const MargedDiv = styled.div`
  margin: 2vh 2vw;
  padding: 2vh 2vw;
`;

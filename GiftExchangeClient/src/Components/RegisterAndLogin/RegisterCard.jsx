import React, { useEffect } from "react";
import { useState } from "react";
import { LabelTextbox, MandatoryLegend } from "../Styled/LabelTextbox";
import axios from "axios";
import ButtonSample from "../Styled/ButtonSample";
import CustomPopup, { Alert, Confirm } from "../Styled/Customs";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BlueBorder from "../Styled/BlueBorder";

const RegisterCard = () => {
    
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("invite");
    const urlEmail = urlParams.get("email");
    const urlFirstname = urlParams.get("firstname");
    const urlLastname = urlParams.get("lastname");
    // Imput block
    const [firstName, setFirstName] = useState("");
    const [firstNameValidity, setFirstNameValidity] = useState();

    const [error, setError] = useState();

    const [LastName, setLastName] = useState("");
    const [LastNameValidity, setLastNameValidity] = useState();

    const [userName, setUserName] = useState("");
    const [usernameValidity, setUsernameValidity] = useState();

    const [email, setEmail] = useState("");
    const [emailValidity, setEmailValidity] = useState();

    const [password, setPassword] = useState("");
    const [passwordValidity, setPasswordValidity] = useState();

    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordValidity, setConfirmPasswordValidity] = useState();

    //Alert state popup
    const [popUpContent, setPopUpContent] = useState();
    const [dialogContent, setDialogContent] = useState();

    const Navigate = useNavigate();

    useEffect(() => {
            if(urlEmail){
                setEmail(urlEmail)
                setEmailValidity(true)
            }
            if(urlFirstname){
                setFirstName(urlFirstname)
                setFirstNameValidity(true)
            }
            if(urlLastname){
                setLastName(urlLastname)
                setLastNameValidity(true)
            }
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateInput()) {
            setError("Tout les champs doivent être valide !");
            return;
        }
        let user = {
            username: userName,
            firstName: firstName,
            lastName: LastName,
            email: email,
            password: password,
        };

        let response = await sendNewUserToAPI(user);
        console.log(response.status);
        if (response.status == 0) {
            if (import.meta.env.VITE_OFFLINE != "true") Navigate("/network-problem");
        } else if (response.status >= 400) {
            console.log("executed");
            setError(response.data);
        } else
            setDialogContent(
                <Alert
                    text="L'utilisateur a bien été créer!"
                    header="Confirmation"
                    closing={() => {
                        setError("");
                        setDialogContent(null);
                        Navigate("/login");
                    }}
                />
            );
        console.log(response);
    }

    function validateInput() {
        if (!firstNameValidity) return false;
        if (!LastNameValidity) return false;
        if (!usernameValidity) return false;
        if (!emailValidity) return false;
        if (!passwordValidity) return false;
        if (!confirmPasswordValidity) return false;

        return true;
    }

    async function sendNewUserToAPI(user) {
        let result;
        try {
            result = await axios.post("https://localhost:7160" + "/createUser", user);
            return result;
        } catch (error) {
            if (error.response) return error.response;
            else return error.request;
        }
    }

    return (
        <>
            <CustomPopup render_state={[popUpContent, setPopUpContent]} />
            <CustomPopup
                render_state={[dialogContent, setDialogContent]}
                show_dialog={true}
            />
            <BlueBorder className="tw-w-full tw-max-w-sm tw-p-4 tw-bg-white tw-border tw-rounded-lg tw-shadow tw-sm:p-6 tw-md:p-8 tw-dark:bg-gray-800 tw-dark:border-gray-700">
                <form className="tw-space-y-6">
                    {/* Error label */}
                    {error && (
                        <div
                            className="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded"
                            role="alert"
                        >
                            <span className="tw-block tw-sm:inline">{error}</span>
                        </div>
                    )}
                    <h5 className="tw-text-xl tw-font-medium tw-text-gray-900 tw-dark:text-white">
                        Inscription
                    </h5>
                    <div>
                        <LabelTextbox
                            required={true}
                            type={"name"}
                            value={firstName}
                            setValue={setFirstName}
                            setValidity={setFirstNameValidity}
                            placeholder="prénom"
                            labelText="Entrer votre prénom"
                            id="firstname"
                        />
                    </div>
                    <div>
                        <LabelTextbox
                            required={true}
                            type={"name"}
                            value={LastName}
                            setValue={setLastName}
                            setValidity={setLastNameValidity}
                            placeholder="nom"
                            labelText="Entrer votre nom"
                            id="lastname"
                        />
                    </div>

                    <div>
                        <LabelTextbox
                            required={true}
                            type="email"
                            value={email}
                            setValue={setEmail}
                            setValidity={setEmailValidity}
                            placeholder="courriel"
                            labelText="Entrer votre courriel"
                            id="email"
                        />
                    </div>

                    <div>
                        <LabelTextbox
                            required={true}
                            type={"restrictedText"}
                            value={userName}
                            setValue={setUserName}
                            setValidity={setUsernameValidity}
                            placeholder="nom d'utilisateur"
                            labelText="Entrer votre nom d'utilisateur"
                            id="username"
                        />
                    </div>

                    <div>
                        <LabelTextbox
                            required={true}
                            type="password"
                            value={password}
                            setValue={setPassword}
                            setValidity={setPasswordValidity}
                            placeholder="mot de passe"
                            labelText="Entrer votre mot de passe"
                            id="password"
                        />
                    </div>
                    <div>
                        <LabelTextbox
                            required={true}
                            type="confirmPassword"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            setValidity={setConfirmPasswordValidity}
                            valueToConfirm={password}
                            placeholder="répéter mot de passe"
                            labelText="Confirmer votre mot de passe"
                            id="repassword"
                        />
                    </div>
                    <ButtonSample onClick={handleSubmit}>S'enregistrer</ButtonSample>
                    <MandatoryLegend />
                </form>
            </BlueBorder>
        </>
    );
};
export default RegisterCard;

const BlueBorderDiv = styled.div`
  border-color: deepskyblue;
`;

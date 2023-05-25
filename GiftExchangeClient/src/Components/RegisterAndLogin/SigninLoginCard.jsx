import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { LabelTextbox } from "../Styled/LabelTextbox";
import CustomPopUp, { Alert } from "../Styled/Customs";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlueBorder from "../Styled/BlueBorder";
import handleAxiosError from "./handleAxiosError";

const SigninLoginCard = ({ sessionHandler }) => {
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const [checked, setChecked] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState();

  const [popUpContent, setPopUpContent] = useState();

  useEffect((e) => {
    if (cookies["rememberMe"]) {
      setUsername(cookies["rememberMe"].username);
      setPassword(cookies["rememberMe"].password);
      setUsernameValid(true);
      setPasswordValid(true);
      setChecked(true);
    }
  }, []);
  function sendLoginRequest(e) {
    e.preventDefault();

    if (!validateInput()) {
      setError("Les champs ne sont pas valide !");
      return;
    }

    axios
      .post("https://localhost:7160/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setError(null);

        setPopUpContent(
          <Alert
            header={"Bienvenue " + res.data.username}
            closing={(e) => {
              setPopUpContent();
              if (checked)
                setCookie("rememberMe", {
                  username: username,
                  password: password,
                });
              else if (cookies["rememberMe"]) removeCookie("rememberMe");
              sessionHandler.startSession(res.data);
            }}
          />
        );
      })
      .catch((err) => {
        handleAxiosError(err.request, navigate, sessionHandler);

        try {
          setError(err.response.data);
        } catch (e) {
          setError(err.message);
        }
        setPassword("");
      });
  }

  function validateInput() {
    if (!usernameValid) return false;
    if (!passwordValid) return false;
    return true;
  }

  return (
    <>
      {/* Pop up on Sucessful Login */}
      <CustomPopUp
        render_state={[popUpContent, setPopUpContent]}
        show_dialog={true}
      />
      <BlueBorder className="tw-w-full tw-max-w-sm tw-p-4 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow tw-sm:p-6 tw-md:p-8 tw-dark:bg-gray-800 tw-dark:border-gray-700">
        <form className="tw-space-y-6" action="#">
          <h5 className="tw-text-xl tw-font-medium tw-text-gray-900 tw-dark:text-white">
            Connection
          </h5>

          {/* Error label */}
          {error && (
            <div
              className="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded"
              role="alert"
            >
              <span className="tw-block tw-sm:inline">{error}</span>
            </div>
          )}

          {/* Username */}
          <div>
            <LabelTextbox
              setValidity={setUsernameValid}
              typeInput={"restrictedText"}
              placeHolder="Username"
              labelText={"Nom d'utilisateur"}
              className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 tw-dark:bg-gray-600 tw-dark:border-gray-500 tw-dark:placeholder-gray-400 tw-dark:text-white"
              value={username}
              setValue={setUsername}
              name="username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <LabelTextbox
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block w-full tw-p-2.5 tw-dark:bg-gray-600 tw-dark:border-gray-500 tw-dark:placeholder-gray-400 tw-dark:text-white"
              setValidity={setPasswordValid}
              setValue={setPassword}
              value={password}
              labelText={"Mot de passe"}
              required
            />
          </div>

          {/* Remember me */}
          <div className="tw-flex tw-items-start">
            <div className="tw-flex tw-items-start">
              <div className="tw-flex tw-items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="tw-w-4 tw-h-4 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 tw-focus:ring-3 tw-focus:ring-blue-300 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:focus:ring-blue-600 tw-dark:ring-offset-gray-800 tw-dark:focus:ring-offset-gray-800"
                  checked={checked}
                  onClick={(e) => setChecked(!checked)}
                />
              </div>
              <label
                htmlFor="remember"
                className="tw-ml-2 tw-text-sm tw-font-medium tw-text-gray-900 tw-dark:text-gray-300"
              >
                Se rappeler de moi
              </label>
            </div>
            <Link
              to="/lostPassword"
              className="tw-text-blue-700 tw-hover:underline tw-dark:text-blue-500"
              style={{ paddingLeft: "50px" }}
            >
              Mot de passe perdu?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="tw-w-full tw-text-white tw-bg-blue-700 tw-hover:bg-tw-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 tw-font-medium tw-rounded-lg text-sm tw-px-5 py-2.5 tw-text-center tw-dark:bg-blue-600 tw-dark:hover:bg-blue-700 tw-dark:focus:ring-blue-800"
            onClick={sendLoginRequest}
          >
            Se connecter
          </button>

          {/* Not registered yet */}
          <div className="tw-text-sm tw-font-medium tw-text-gray-500 tw-dark:text-gray-300">
            Pas enregistré?{" "}
            <Link
              to="/register"
              className="tw-text-blue-700 tw-hover:underline tw-dark:text-blue-500"
            >
              Créer mon compte
            </Link>
          </div>
        </form>
      </BlueBorder>
    </>
  );
};

export default SigninLoginCard;

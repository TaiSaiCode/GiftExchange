import { useState, useEffect } from "react";
import "./App.css";
import "./CustomStyles.css";
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavbarTop from "./Components/Layouts/NavbarTop";
import NavbarUser from "./Components/Layouts/NavbarUser";
import Welcome from "./Components/Pages/Welcome";
import About from "./Components/Pages/About";
import Help from "./Components/Pages/Help";
import axios from "axios";
import CreateGroupCard from "./Components/Create-group/CreateGroupCard";
import Profil from "./Components/Pages/Profil";
import Wishlist from "./Components/Wishlist/Wishlist";
import NetworkErrorPage from "./Components/Pages/NetworkError";
import styled from "styled-components";
import ListGroup from "./Components/Pages/ListGroup";
import NetworkErrorRedirect from "./Components/Pages/NetworkErrorRedirect";
import RegisterPage from "./Components/Pages/Register";
import LoginPage from "./Components/Pages/Login";
import GroupTabsPage from "./Components/Pages/GroupTabsPage";
import PendingInvites from "./Components/Pages/PendingInvites";
import RetrievePassword from "./Components/RegisterAndLogin/RetrievePasswordCard";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [connectionStatus, setConnectionStatus] = useState();
  const [user, setUser] = useState(null);
  const [networkCheckCall, setNetworkCheckCall] = useState();
  const [reloadUserNav, setReloadUserNav] = useState(false);
  //Setup when loading page
  useEffect(() => {
    setupUserCookiesOnLoading(cookies, user, setUser);
  }, []);

  //Check for connection -> server
  useEffect(() => {
    if (import.meta.env.VITE_OFFLINE == "true")
      setConnectionStatus(true); //TODO : REMOVE IF STATEMENT IN PROD
    else
      axios
        .get("https://localhost:7160" + "/")
        .then((response) => setConnectionStatus(true))
        .catch((error) => setConnectionStatus(false));
  }, [networkCheckCall]);

  //Object to handle sessions
  const sessionHandler = {
    startSession: function (User) {
      setCookie("User", User);
      axios.defaults.headers.common["Authorization"] = "Bearer " + User.token;
      setUser(User);
    },
    deleteSession: function () {
      if (user == null) return;
      removeCookie("User");
      axios.defaults.headers.common["Authorization"] = "Bearer ";
      setUser(null);
    },
    getActiveSession: function () {
      return user;
    },
  };

  return (
    <BrowserRouter>
      {connectionStatus ? (
        <div className="container">
          <div className="row">
            <NavbarTop sessionHandler={sessionHandler} />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-2 pt-5">
              {user ? <NavbarUser sessionHandler={sessionHandler} /> : <></>}
            </div>
            <div
              className={
                user
                  ? "col-sm-12 col-md-12 col-lg-10"
                  : "col-sm-12 col-md-12 col-lg-12"
              }
            >
              <h1 className="tw-text-2xl tw-text-sky-400 tw-font-extrabold">
                Gift-Xchange
              </h1>
              <Routes>
                <Route
                  path="/"
                  element={<Welcome sessionHandler={sessionHandler} />}
                />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />
                {/* // TODO "REMOVE AFTER TEST"*/}
                <Route
                  path="/invitations"
                  element={
                    <PendingInvites
                      sessionHandler={sessionHandler}
                      setReloadUserNav={setReloadUserNav}
                      reloadUserNav={reloadUserNav}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<RegisterPage sessionHandler={sessionHandler} />}
                />
                {/*TEMPORARY TODO:remove the route after */}
                <Route
                  path="/group/:IdGroup"
                  element={<GroupTabsPage sessionHandler={sessionHandler} />}
                />
                {/*End of temp */}
                <Route
                  path="/create-group"
                  element={<CreateGroupCard sessionHandler={sessionHandler} />}
                />
                <Route
                  path="/login"
                  element={
                    user ? (
                      <Navigate to="/" />
                    ) : (
                      <LoginPage sessionHandler={sessionHandler} />
                    )
                  }
                />
                <Route
                  path="/wishlist/:IdGroup"
                  element={<Wishlist sessionHandler={sessionHandler} />}
                />
                <Route
                  path="/profil"
                  element={
                    user ? (
                      <Profil sessionHandler={sessionHandler} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/groupes"
                  element={<ListGroup sessionHandler={sessionHandler} />}
                />
                <Route
                  path="/network-problem"
                  element={
                    <NetworkErrorRedirect
                      networkCheck={networkCheckCall}
                      setNetworkCheck={setNetworkCheckCall}
                    />
                  }
                />
                <Route
                  path="/lostPassword"
                  element={<RetrievePassword sessionHandler={sessionHandler} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <NetworkErrorPage />
      )}
    </BrowserRouter>
  );
}

function setupUserCookiesOnLoading(cookies, user, setUser) {
  //Exception handling
  if (user != null && user != undefined) return;
  if (cookies.User == undefined || cookies.User == null) {
    axios.defaults.headers.common["Authorization"] = "Bearer ";
    if (user != null) setUser(null);
    return;
  }

  //Nominal case
  setUser(cookies.User);
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + cookies.User.token;
}

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const FlexRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export default App;

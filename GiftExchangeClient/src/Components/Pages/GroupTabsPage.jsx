import React, { useState, useEffect } from "react";
import TabsMenu, { TabItem } from "../Styled/CustomTabMenu";
import { BsFillPersonLinesFill } from "react-icons/bs";
import CustomPopUp, { Alert, Confirm } from "../Styled/Customs";
import Wishlist from "../Wishlist/Wishlist";
import GroupMemberCard from "../Group/GroupMemberCard";
import GroupMembersList from "../Group/GroupMembersList";
import { useParams } from "react-router-dom";
import { BiPencil, BiDoorOpen, BiRefresh, BiX } from "react-icons/bi";
import { Button } from "react-bootstrap";
import axios from "axios";
import GroupEdit from "../Group/GroupEdit";
import GroupRecipientCard from "../Group/GroupRecipientCard";
import GroupMatches from "../Group/GroupMatches";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
function CountDown({ date }) {
  const [countdown, setCountDown] = useState("");

  function updatedCountDown() {
    let sec = (new Date(date).getTime() - new Date().getTime()) / 1000;
    let mins = sec / 60,
      hours = mins / 60,
      days = hours / 24;
    let nb_d = parseInt(days),
      nb_h = parseInt(hours % 24),
      nb_m = parseInt(mins % 60);

    if (nb_d + nb_h + nb_m <= 0) return parseInt(sec) + "s";
    return (
      (nb_d == 0 ? "" : nb_d + "j") +
      " " +
      (nb_h + nb_d == 0 ? "" : nb_h + "h") +
      " " +
      nb_m +
      "m " +
      parseInt(sec % 60) +
      "s"
    );
  }

  useEffect(() => {
    if (countdown != "0s" && !countdown.startsWith("-"))
      setTimeout(() => {
        setCountDown(updatedCountDown());
      }, 1000);

    return clearTimeout();
  }, [countdown]);

  return (
    <>
      <h2>Temps restant avant la pige</h2>
      {countdown.startsWith("-") ? "" : countdown}
    </>
  );
}

export default function GroupTabsPage({ sessionHandler }) {
  const Navigate = useNavigate();
  const [popup, setPopUp] = useState();
  const [reload, setReload] = useState(true);
  const { IdGroup } = useParams();
  const [waiter, setWaiter] = useState(new Date().getTime());
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState({
    Name: "",
    Description: "",
    ImageUrl: "",
    Budget: "",
    DrawDate: "",
    EventDate: "",
    IsAdmin: false,
    Members: [],
    adminsNames: [],
    DrawDateEnded: false,
  });

  const MemberListPopUp = (
    <>
      <h4>Participants</h4>

      <div style={{ overflowY: "auto", maxHeight: "40vmin", height: "auto" }}>
        {group.Members.map((o, i) => (
          <div key={i}>{o.firstname + " " + o.lastname}</div>
        ))}
      </div>
    </>
  );

  useEffect(() => {
    const getGroupInfo = async () => {
      await setLoading(true);
      await axios
        .get(`https://localhost:7160/group?groupId=${IdGroup}`)
        .then((response) => {
          let groupV = response.data;
          setGroup({
            Id: groupV.id,
            Name: groupV.name,
            Description: groupV.description,
            ImageUrl: groupV.imageUrl,
            Budget: groupV.budget,
            DrawDate: groupV.drawDate,
            EventDate: groupV.eventDate,
            IsAdmin: groupV.isAdmin ? true : false,
            IsSuperAdmin: groupV.isSuperAdmin ? true : false,
            Members: groupV.members,
            AdminsNames: groupV.adminsNames.join(", "),
            hasBeenDrawn: groupV.hasBeenDrawn, //TODO Needs to be in database.
          });
        })
        .catch((error) => {
          console.log(error);
          if (
            error.request &&
            error.request.status &&
            error.request.status == 404
          )
            //TODO : SHOULD REDIRECT TO UNAUTHORIZE GROUP PAGE
            Navigate("/groupes");
          if (
            error.request &&
            error.request.status &&
            error.request.status == 401
          )
            sessionHandler.deleteSession();

          //Network error
          if (error.request && error.request.status == 0) {
            if (import.meta.env.VITE_OFFLINE != "true")
              Navigate("/network-problem"); //TODO : REMOVE IF STATEMENT IN PROD
          }
        });
      setLoading(false);
    };
    getGroupInfo();
  }, [reload]);

  async function sendQuitterGroupe() {
    try {
      await axios.delete("https://localhost:7160/" + "quitGroupe/" + IdGroup);

      setPopUp(
        <Alert
          header="Quitter le groupe"
          text={"Vous avez bien quitté le groupe " + group.Name}
          closing={() => {
            setPopUp();
            Navigate("/groupes");
          }}
        />
      );
    } catch (err) {
      console.log(err);
      setPopUp(
        <Alert
          header="Une erreur est survenu"
          text={
            err.response && err.response.data
              ? err.response.data
              : "Oops... Une erreur est survenu..."
          }
          closing={() => {
            setPopUp();
            setReload(!reload);
          }}
        />
      );
    }
  }
  return (
    <>
      <CustomPopUp render_state={[popup, setPopUp]} />
      {loading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ReactLoading type="bubbles" color="black" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1min",
            }}
          >
            <h1>
              <i>{group.Name}</i>
            </h1>
            {group.IsAdmin ? (
              <div style={{ padding: "1.5vmin" }}>
                <Button
                  id="btn-modifier"
                  onClick={() => {
                    setPopUp(
                      <GroupEdit
                        setPopUp={setPopUp}
                        name={group.Name}
                        description={group.Description}
                        image={group.ImageUrl}
                        drawDate={group.DrawDate}
                        eventDate={group.EventDate}
                        budget={group.Budget}
                        id={IdGroup}
                        reload={reload}
                        setReload={setReload}
                        closing={setPopUp}
                        IsSuperAdmin={group.IsSuperAdmin}
                      />
                    );
                  }}
                >
                  <BiPencil> </BiPencil>
                </Button>
                <ReactTooltip
                  anchorId="btn-modifier"
                  variant="info"
                  content={
                    group.IsSuperAdmin
                      ? "Modifier ou supprimer le groupe"
                      : "Modifier le groupe"
                  }
                  place="right"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1vmin",
            }}
          >
            <embed
              src={group.ImageUrl}
              type="image/jpg"
              style={{ width: "40%" }}
            />
          </div>
          <div>
            <div style={{ float: "right" }} id="btn-participants">
              <span style={{ fontFamily: "Lucida handwriting" }}>
                {group.Members.length}{" "}
              </span>
              <button
                className="btn btn-outline-info"
                onClick={() => {
                  setPopUp(MemberListPopUp);
                }}
              >
                <BsFillPersonLinesFill />
              </button>
              <ReactTooltip
                anchorId="btn-participants"
                variant="info"
                content="Afficher la liste des participants"
              />
            </div>
            <div
              style={{ float: "right", paddingRight: "2vmin" }}
              id="btn-getout"
            >
              <button
                className="btn btn-danger"
                onClick={() => {
                  setPopUp(
                    <Confirm
                      header="Quitter le groupe"
                      text="Voulez-vous vraiment quitter ce groupe ?"
                      onYes={() => {
                        sendQuitterGroupe();
                      }}
                      closing={setPopUp}
                    />
                  );
                }}
              >
                <BiDoorOpen />
              </button>
              <ReactTooltip
                anchorId="btn-getout"
                variant="error"
                content="Quitter le groupe"
              />
            </div>
            <div
              style={{ float: "right", paddingRight: "2vmin" }}
              id="btn-refresh"
            >
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  if (new Date().getTime() - waiter > 5000) {
                    setReload(!reload);
                    setWaiter(new Date().getTime());
                  }
                }}
              >
                <BiRefresh />
              </button>
              <ReactTooltip
                anchorId="btn-refresh"
                variant="dark"
                content="Mettre a jours les informations."
                z-index="100"
              />
            </div>
          </div>

          <TabsMenu>
            <TabItem tabtitle="Info" tabdefaultindex="true">
              <GroupMemberCard group={group} />
              {group.IsAdmin ? (
                <GroupMatches
                  id_group={IdGroup}
                  setReload={setReload}
                  reload={reload}
                  group={group}
                />
              ) : (
                <></>
              )}
              <GroupMembersList
                hasBeenDrawn={group.hasBeenDrawn}
                reload={reload}
                setReload={setReload}
                sessionHandler={sessionHandler}
                list={group.Members}
                is_admin={group.IsAdmin}
                IdGroup={IdGroup}
              />
            </TabItem>
            {/* */}
            <TabItem tabtitle="Ma liste de souhaits">
              <Wishlist view={"list"} />
            </TabItem>
            {/* */}
            {group.hasBeenDrawn ? (
              <TabItem tabtitle="Chouchou">
                <GroupRecipientCard idGroup={IdGroup} />
              </TabItem>
            ) : (
              <></>
            )}

            <></>
          </TabsMenu>
        </>
      )}
    </>
  );
}

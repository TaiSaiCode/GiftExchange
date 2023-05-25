import React, { useEffect, useState } from "react";
import { GrUserAdmin } from "react-icons/Gr";
import { RiVipCrown2Fill } from "react-icons/Ri";
import CustomPopUp, { Alert, Confirm } from "../Styled/Customs";
import ButtonSample from "../Styled/ButtonSample";
import GroupInvitationCard from "./GroupInvitationCard";
import ExpandablePanel, {
  ExpandablePanelButton,
} from "../Styled/ExpandablePanel";
import styled from "styled-components";
import axios from "axios";
import { Tooltip } from "react-tooltip";
export default function MembersList({
  list,
  is_admin,
  IdGroup,
  sessionHandler,
  reload,
  setReload,
  hasBeenDrawn,
}) {
  const [listvisible, setListVisible] = useState(true);
  const [selected_person, setSelectedPerson] = useState(null);
  const [popup, setPopUp] = useState(null);
  useEffect(() => {
    if (!listvisible) setSelectedPerson(null);
  }, [listvisible]);
  useEffect(() => {});
  async function removeMember() {
    console.log(selected_person);
    console.log(IdGroup);
    await axios
      .delete(
        `https://localhost:7160/deleteMember/${IdGroup}/${selected_person.id}`
      )
      .then((res) => {
        setPopUp(
          <Alert
            header="Utilisateur retiré"
            text="L'utilisateur a bien été retiré"
            closing={() => {
              setReload(!reload);
              setPopUp();
            }}
          />
        );
      })
      .catch((err) => {
        setPopUp(
          <Alert
            header="Une erreur est survenu"
            text={
              err.response && err.response.data
                ? err.response.data
                : "Oops... Une erreur est survenu..."
            }
            closing={() => {
              setReload(!reload);
              setPopUp();
            }}
          />
        );
      });
  }

  return (
    <>
      <CustomPopUp render_state={[popup, setPopUp]} />

      <div>
        <br />
        <h3>Membres</h3>

        <div style={{ overflowY: "auto", height: 200 }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                }}
              >
                <th style={{ width: 30 }}>
                  <ExpandablePanelButton
                    expanding_state={[listvisible, setListVisible]}
                    button_style={{
                      borderColor: "powderblue",
                      borderRadius: 5,
                    }}
                  />
                </th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Courriel</th>
                <th></th>
              </tr>
              <ExpandablePanel expanded={listvisible}>
                {list.map((o, i) => (
                  <tr
                    key={i}
                    style={{
                      border: selected_person == o ? "1px solid blue" : "",
                    }}
                  >
                    <td>
                      {is_admin ? (
                        <input
                          onClick={() => {
                            setSelectedPerson(o);
                          }}
                          name="radselect"
                          title="Sélectionner rangée"
                          style={{ marginLeft: 30 }}
                          type="radio"
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{o.firstname}</td>
                    <td>{o.lastname}</td>
                    <td>{o.email}</td>
                    <td>
                      {o.isAdmin ? (
                        o.isSuperAdmin ? (
                          <>
                            <RiVipCrown2Fill id={"admin_" + o.firstname} />
                            <Tooltip
                              anchorId={"admin_" + o.firstname}
                              variant="dark"
                              content="Est le créateur !"
                              place="right"
                            />
                          </>
                        ) : (
                          <>
                            <GrUserAdmin id={"admin_" + o.firstname} />
                            <Tooltip
                              anchorId={"admin_" + o.firstname}
                              variant="dark"
                              content="Est un administrateur."
                              place="right"
                            />
                          </>
                        )
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </ExpandablePanel>
            </tbody>
          </table>
        </div>
        <InlineFlex>
          {selected_person != null &&
          !selected_person.isSuperAdmin &&
          is_admin &&
          selected_person.email != sessionHandler.getActiveSession().email ? (
            <>
              <ButtonSample
                backgroundColor={"red"}
                color={"white"}
                hoverColor={"white"}
                hoverBackgroundColor={"darkred"}
                onClick={() => {
                  setPopUp(
                    <Confirm
                      header="Avertissement"
                      text={
                        "Voulez-vous vraiment retirer cette personne?" +
                        (hasBeenDrawn &&
                          " Cela entrainera l'annulation de la pige.")
                      }
                      closing={setPopUp}
                      onYes={() => {
                        removeMember();
                      }}
                    />
                  );
                }}
                innerText="Supprimer"
              />
              <ButtonSample
                backgroundColor={
                  selected_person.isAdmin ? "lightgray" : "forestgreen"
                }
                color={"white"}
                hoverColor={"white"}
                hoverBackgroundColor={
                  selected_person.isAdmin ? "silver" : "darkgreen"
                }
                onClick={() => {
                  console.log(IdGroup);
                  console.log(selected_person);
                  axios
                    .put(
                      "https://localhost:7160" +
                        "/toggleAdmin/" +
                        IdGroup +
                        "/" +
                        selected_person.id
                    )
                    .then(() => {})
                    .catch((error) => {
                      console.log(error);
                    })
                    .finally(() => {
                      setReload(!reload);
                    });
                }}
                innerText={
                  selected_person.isAdmin
                    ? "Enlever les droits"
                    : "Rendre admin"
                }
              />
            </>
          ) : (
            <div></div>
          )}

          {is_admin && !hasBeenDrawn ? (
            <ButtonSample
              innerText="Inviter membres"
              onClick={() => {
                setPopUp(
                  <GroupInvitationCard IdGroup={IdGroup} closing={setPopUp} />
                );
              }}
            />
          ) : (
            <></>
          )}
        </InlineFlex>
      </div>
    </>
  );
}
const InlineFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1vmin;
`;

import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import axios from "axios";
import ExpandablePanel, {
  ExpandablePanelButton,
} from "../Styled/ExpandablePanel";

export default function GroupRecipientCard({ idGroup }) {
  const [listvisible, setListVisible] = useState(true);
  const [user, setUser] = useState({ firstname: "", lastname: "", gifts: [] });
  useEffect(() => {
    axios
      .get(`https://localhost:7160/recipient?groupId=${idGroup}`)
      .then((response) => {
        console.log(response);
        setUser({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          gifts: response.data.gifts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function GiftBox() {
    return (
      <div style={{ overflowY: "auto", height: 200 }}>
        <h3>Liste de Souhaits</h3>
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
                  button_style={{ borderColor: "powderblue", borderRadius: 5 }}
                />
              </th>

              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Lien du souhaits</th>
            </tr>
            <ExpandablePanel expanded={listvisible}>
              {user.gifts.map((o, i) => (
                <tr key={i}>
                  <td></td>
                  <td>{o.name}</td>
                  <td>{o.description}</td>
                  <td>{o.price}</td>
                  <td>
                    {o.url.length == 0 ? (
                      <></>
                    ) : (
                      <a href={o.url}>lien de souhaits</a>
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
            </ExpandablePanel>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      Votre{" "}
      <span
        id={"span-chouchou"}
        style={{ textDecoration: "underline", fontWeight: "bold" }}
      >
        chouchou
      </span>{" "}
      : {user.firstname + " " + user.lastname}
      <br></br>
      <ReactTooltip
        anchorId="span-chouchou"
        variant="dark"
        content="Le chouchou est votre personne pigée."
      />
      <GiftBox />
    </>
  );
}

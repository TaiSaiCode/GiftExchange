import React from "react";
import CustomPopUp, { Alert } from "../Styled/Customs";
import { useState } from "react";

export default function GroupMemberCard({ group }) {
  const [popUp, setPopUp] = useState();

  return (
    <>
      <CustomPopUp render_state={[popUp, setPopUp]} />
      <div className="App">
        <div>
          <div style={{ display: "inline-block" }}>
            <b>Administré par : </b> {group.AdminsNames}
            <br />
            <label
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setPopUp(
                  <Alert
                    text={
                      group.Description
                        ? group.Description
                        : "Aucune description"
                    }
                    closing={setPopUp}
                  />
                );
              }}
            >
              Afficher description
            </label>
            <br></br>
            {!group.hasBeenDrawn ? (
              <>
                {" "}
                <b>Date de tirage : </b>{" "}
                <span>
                  {group.DrawDate == null ? "Indefini" : group.DrawDate}
                </span>
              </>
            ) : (
              <b>Le tirage a été effectué</b>
            )}
            <br />
            <b>Date de l'Echange: </b>
            {group.EventDate == null ? "Indefini" : group.EventDate}
            <br></br>
            <b>Budget des cadeaux : </b>
            {group.Budget}
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

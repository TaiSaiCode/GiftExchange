import CustomPopUp, { Alert, Confirm } from "../Styled/Customs";
import { useState } from "react";
import axios from "axios";
import ButtonSample from "../Styled/ButtonSample";

export default function GroupMatches({ id_group, setReload, reload, group }) {
  const [popUp, setPopUp] = useState();

  function makeMatches() {
    axios
      .put(`https://localhost:7160/matches?groupId=${id_group}`)
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
        setPopUp(
          <Alert
            closing={() => {
              setReload(!reload);
              setPopUp();
            }}
            header="Une erreur est survenu"
            text={
              err.response && err.response.data
                ? err.response.data
                : "Oops... Une erreur est survenu..."
            }
          />
        );
      });
  }
  return (
    <>
      <CustomPopUp render_state={[popUp, setPopUp]} />

      {!group.hasBeenDrawn ? (
        <ButtonSample
          style={{
            background: "yellow",
            color: "black",
            border: "0.01px solid lightgray",
            boxShadow: "1px 1px 10px #8B8000",
          }}
          backgroundColor={"yellow"}
          hoverBackgroundColor="lightyellow"
          //disabled={hasBeenDrawn}
          onClick={() => {
            setPopUp(
              <Confirm
                text="Cette action est irréversible.\n Cela empechera l'ajout de membre et déclenchera la distribution des chouchous.\n Voulez-vous vraiment procéder?"
                closing={setPopUp}
                header="Avertissement"
                onYes={() => {
                  makeMatches();
                }}
              />
            );
          }}
        >
          Distribuer les chouchous
        </ButtonSample>
      ) : (
        <></>
      )}
    </>
  );
}

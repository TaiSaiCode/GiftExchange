import React, { useState } from "react";
import axios from "axios";
import { LabelTextbox } from "../Styled/LabelTextbox";
import ButtonSample from "../Styled/ButtonSample";
import styled from "styled-components";
import { Confirm, Alert } from "../Styled/Customs";
import { useNavigate } from "react-router-dom";
function GroupEdit({
  name,
  description,
  image,
  drawDate,
  eventDate,
  budget,
  id,
  reload,
  setReload,
  closing,
  setPopUp,
  IsSuperAdmin,
}) {
  const [new_name, setNewName] = useState(name);
  const [new_description, setNewDescription] = useState(description);
  const [new_image, setNewImage] = useState(image);
  const [new_draw_date, setNewDrawDate] = useState(drawDate);
  const [new_event_date, setNewEventDate] = useState(eventDate);
  const [new_budget, setNewBudget] = useState(budget);
  const navigate = useNavigate();
  function confirmer() {
    axios
      .put(`https://localhost:7160/group`, {
        id: id,
        name: new_name,
        description: new_description,
        imageUrl: new_image,
        drawDate: new_draw_date,
        eventDate: new_event_date,
        budget: new_budget,
      })
      .then((res) => {
        console.log("group?groupId res.data: ", res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setReload(!reload);
        closing();
        // window.location.reload(false);
      });
  }
  let today = new Date().toLocaleDateString("en-CA");
  console.log("eventDate: ", new_event_date);

  return (
    <PaddedDiv>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Modification du Groupe
      </h5>
      <div>
        <LabelTextbox
          required={true}
          value={new_name}
          setValue={setNewName}
          placeholder="Nom du groupe"
          labelText="Entrer le nom de votre groupe"
          id="name"
          type="name"
        />
      </div>
      <div style={{ paddingTop: "1vmin" }}>
        <textarea
          style={{ width: "100%" }}
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          id="description"
          placeholder="Description du groupe"
        ></textarea>
      </div>

      <div>
        <LabelTextbox
          novalidation={true}
          type="date"
          min={today}
          value={new_draw_date}
          setValue={setNewDrawDate}
          labelText="Entrer la date de pige"
          id="name"
        />
      </div>

      <div>
        <LabelTextbox
          novalidation={true}
          type="date"
          value={new_event_date}
          min={new_draw_date}
          setValue={setNewEventDate}
          labelText="Entrer la date de l'Echange"
          id="eventDate"
        />
      </div>

      <div>
        <label style={{ marginTop: 30 }}>Budget</label>
        <br />
        <div style={{ marginBottom: 30 }}>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            style={{ accentColor: "deepskyblue" }}
            onChange={(e) => setNewBudget(parseInt(e.target.value))}
          />
          <output>{new_budget}</output>
        </div>
      </div>

      <div>
        <LabelTextbox
          type="imageUrl"
          value={new_image}
          setValue={setNewImage}
          labelText="Url de l'image"
          id="name"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "1vmin",
        }}
      >
        <embed
          style={{ border: "1px solid black" }}
          type="image/jpg"
          src={new_image}
          width="300"
          height="200"
        />
      </div>
      <FlexDiv>
        <ButtonSample
          style={{ width: "auto", height: "auto" }}
          onClick={confirmer}
        >
          Modifier
        </ButtonSample>
        {IsSuperAdmin ? (
          <button
            className="btn btn-danger"
            id="btn-supprimer"
            onClick={() => {
              setPopUp(
                <Confirm
                  header={"Attention !"}
                  text="Êtes vous sur de vouloir supprimer le groupe ?"
                  onYes={async () => {
                    axios
                      .delete("https://localhost:7160" + "/group/" + id)
                      .then(() => {
                        navigate("/groupes");
                      })
                      .catch((error) => {
                        console.log(error);
                        setPopUp(
                          <Alert
                            header="Une erreur est survenu"
                            text={
                              error.response && error.response.data
                                ? error.response.data
                                : "Oops... une erreur est survenu"
                            }
                            closing={setPopUp}
                          />
                        );
                      });
                  }}
                  closing={setPopUp}
                />
              );
            }}
          >
            Supprimer le groupe
          </button>
        ) : (
          <></>
        )}
      </FlexDiv>
    </PaddedDiv>
  );
}

const PaddedDiv = styled.div`
  padding: 2vmin;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 1vmin;
`;
export default GroupEdit;

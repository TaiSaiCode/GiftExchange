import { useState, React } from "react";
import { LabelTextbox, MandatoryLegend } from "../Styled/LabelTextbox";
import ButtonSample from "../Styled/ButtonSample";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomPopUp, { Alert } from "../Styled/Customs";
import BlueBorder from "../Styled/BlueBorder";

function CreateGroupCard() {
  const Navigate = useNavigate();
  const [name, setName] = useState();
  const [nameValidity, setNameValidity] = useState();
  const [drawDate, setDrawDate] = useState();
  const [eventDate, setEventDate] = useState();
  const [image, setImage] = useState();
  const [imageValidity, setImageValidity] = useState();
  const [description, setDescription] = useState();
  const [budget, setBudget] = useState(50);
  const [error, setError] = useState();
  const [popUpContent, setPopUpContent] = useState();
  const [dialogContent, setDialogContent] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    let group = {
      name: name,
      drawdate: drawDate,
      eventDate: eventDate,
      budget: budget,
      image: image,
      description: description,
    };
    let response = await sendNewGroupToAPI(group);
    console.log(response.status);
    if (response.status == 0) {
      if (import.meta.env.VITE_OFFLINE != "true") Navigate("/network-problem");
    } else if (response.status >= 400) {
      console.log("executed");
      setError(response.data);
    } else
      setDialogContent(
        <Alert
          text="Le groupe a bien été créer!"
          header="Confirmation"
          closing={async () => {
            setError("");
            Navigate("/group/" + response.data);
          }}
        />
      );
    console.log(response);
  }
  //todo validateInput
  //***err possible */
  async function sendNewGroupToAPI(group) {
    let result;
    try {
      result = await axios.post(
        "https://localhost:7160" + "/createGroup",
        group
      );
      return result;
    } catch (error) {
      if (error.response) return error.response;
      else return error.request;
    }
  }

  return (
    <>
      <CustomPopUp
        render_state={[dialogContent, setDialogContent]}
        show_dialog={true}
      />
      <BlueBorder className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Création d'un groupe
          </h5>
          <div>
            <LabelTextbox
              required={true}
              value={name}
              setValue={setName}
              setValidity={setNameValidity}
              placeholder="Nom du groupe"
              labelText="Entrer le nom de votre groupe"
              id="name"
              type="name"
            />
          </div>
          <div>
            <textarea
              style={{
                border: "1px solid black",
                width: "100%",
                marginTop: "1vmin",
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
              placeholder="Description du groupe"
            ></textarea>
          </div>

          <div>
            <LabelTextbox
              novalidation={true}
              type="date"
              value={drawDate}
              setValue={setDrawDate}
              labelText="Entrer la date de pige"
              id="name"
            />
          </div>
          <div>
            <LabelTextbox
              novalidation={true}
              type="date"
              value={eventDate}
              setValue={setEventDate}
              labelText="Entrer la date l'Echange"
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
                style={{ accentColor: "deepskyblue" }}
                onChange={(e) => setBudget(parseInt(e.target.value))}
              />
              <output>{budget}</output>
            </div>
          </div>

          <div>
            <LabelTextbox
              type="imageUrl"
              value={image}
              setValue={setImage}
              setValidity={setImageValidity}
              labelText="Url de l'image"
              id="name"
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <embed
              style={{ border: "1px solid black" }}
              type="image/jpg"
              src={image}
              width="300"
              height="200"
            />
          </div>
          <br />
          <ButtonSample onClick={handleSubmit}>Créer le groupe</ButtonSample>
          <MandatoryLegend />
        </form>
      </BlueBorder>
    </>
  );
}
export default CreateGroupCard;

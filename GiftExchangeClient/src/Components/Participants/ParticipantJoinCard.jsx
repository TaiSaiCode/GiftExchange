import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomPopUp, { Alert } from "../Styled/Customs";
import { useEffect, useState } from "react";
import PopUpGroup from "./PopUpGroup";

export default function ParticipantJoinCard({
  group,
  sessionHandler,
}) {
  const [popUpContent, setPopUpContent] = useState(null);
  const navigate = useNavigate();

  function handleInvitation(status){
    axios
    .post("https://localhost:7160/pendingstatus/" + group.id + "/" + status)
    .then((res)=>{
      setPopUpContent(
        <Alert
        text={res.data}
        closing={() =>{
          if(status)
          navigate("/group/" + group.id);
          else 
          window.location.reload(false)
        }}
        />
      )
    })
  }
 
  const seeDetails = () => {
    setPopUpContent(
      <PopUpGroup
        group={group}
        closing={() => {
          setPopUpContent(null);
        }}
      />
    );
  };
  return (
    <>
      <CustomPopUp render_state={[popUpContent, setPopUpContent]} />

      <div
        style={{
          border: "2px solid black",
          boxShadow: "10px 10px 5px #a3a3a3",
          transform: "rotateZ(-1deg)",
          marginTop: 30,
        }}
      >
        <h4>INVITATION</h4>

        <div style={{ textAlign: "left", marginLeft: 50 }}>
          <p>
            Bonjour <b>{sessionHandler.getActiveSession().firstname}</b>,
          </p>
          <p>
            Vous etes invité(e)s à joindre le groupe : <b>"{group.name}" </b>
            administré par{" "}
            {group.adminsNames.map((fullname, index, array) => (
              <span key={index + fullname}>
                <b>{fullname}</b>
                {index + 1 < array.length ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
        <Buttons text="Accepter" color="green" event={()=>handleInvitation(true)} />
        <Buttons text="Refuser" color="red" event={()=>handleInvitation(false)} />
        <Buttons text="Voir les détails" color="gray" event={seeDetails} />
      </div>
    </>
  );
}
function Buttons({ text, color, event }) {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          event();
        }}
        style={{
          backgroundColor: color,
          color: "white",
          margin: 5,
          padding: "1px 10px",
          borderRadius: 5,
        }}
      >
        {text}
      </button>
    </>
  );
}

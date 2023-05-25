import React, { useState } from "react";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
const STYLEDIV = {
    boxShadow: "0px 0px 50px black",
    position: "fixed",
    margin: "10vh 10vw",
    top: "2%",
    minWidth: 500,
    minHeight: 200,
    maxWidth: 500,
    zIndex: 100,
    borderRadius: 10,
    backgroundColor: "white",
    maxHeight: "80%",
    overflowY: "auto",
    paddingInline: "2vmin",
  },
  STYLEBTN = { zIndex: 5, borderRadius: 5, padding: 10 },
  STYLEBLURING = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 50,
    backgroundColor: "whitesmoke",
    opacity: 0.8,
  };

function CustomPopUpButton({ style = {}, innerText = "", onClick = () => {} }) {
  return (
    <>
      <button
        className="custom_popup_btn"
        style={{ ...style, ...STYLEBTN, marginBottom: 30 }}
        onClick={() => {
          onClick();
        }}
      >
        {innerText}
      </button>
    </>
  );
}

function DivBlurrable({
  children,
  closing,
  text = "",
  header = "",
  classname = "",
  show_dialog,
}) {
  return (
    <>
      <div className={classname} style={STYLEDIV}>
        {header.length > 0 ? <h3>{header}</h3> : <></>}
        <div>{text}</div> <br />
        {!show_dialog && (
          <FlexDivToRight>
            <ButtontToRight
              onClick={() => {
                closing();
              }}
              className={"btn btn-outline-dark"}
            >
              <BiX />
            </ButtontToRight>
          </FlexDivToRight>
        )}
        {children}
      </div>
      <div
        style={STYLEBLURING}
        onClick={() => {
          closing();
        }}
      ></div>
    </>
  );
}

export function Prompt({
  text = "",
  default_input = "",
  func = () => {},
  closing = () => {},
}) {
  const [txt, setTxt] = useState(default_input);

  return (
    <>
      {text} <p />
      <input
        type="text"
        style={{
          zIndex: -10,
          width: 400,
          border: "1px solid #a3a3a3",
          borderRadius: 5,
        }}
        onChange={(e) => setTxt(e.target.value)}
      />
      <p />
      <p />
      <CustomPopUpButton
        innerText="Confirmer"
        onClick={() => {
          func(txt);
          closing();
        }}
      />
    </>
  );
}
export function Confirm({
  text = "",
  header = "",
  closing = () => {},
  onYes = () => {},
  onNo = () => {},
}) {
  return (
    <>
      <h3>{header}</h3>
      <TextAsManyLines text={text} /> <p />
      <CustomPopUpButton
        innerText="Confirmer"
        style={{ marginRight: 30 }}
        onClick={() => {
          closing();
          onYes();
        }}
      />
      <CustomPopUpButton
        innerText="Annuler"
        onClick={() => {
          closing();
          onNo();
        }}
      />
    </>
  );
}

export function Alert({ text = "", header = "", closing = () => {} }) {
  return (
    <>
      <h3>{header}</h3>
      <TextAsManyLines text={text} /> <p />
      <CustomPopUpButton
        innerText="Ok"
        onClick={() => {
          closing();
        }}
      />
    </>
  );
}
function TextAsManyLines({ text = "" }) {
  return (
    <>{text ? text.split("\\n").map((o, i) => <p key={i}>{o} </p>) : ""}</>
  );
}

export default function CustomPopUp({
  render_state = [null, () => {}],
  show_dialog = false,
}) {
  const closing = () => {
    render_state[1](null);
  };
  return render_state[0] ? (
    <>
      <DivBlurrable
        classname={render_state[0] ? "custom_popup_panning" : ""}
        closing={() => {
          if (!show_dialog) closing();
        }}
        show_dialog={show_dialog}
      >
        {render_state[0]}
      </DivBlurrable>
    </>
  ) : (
    <></>
  );
}
const ButtontToRight = styled.button``;
const FlexDivToRight = styled.div`
  display: flex;
  justify-content: end;
`;

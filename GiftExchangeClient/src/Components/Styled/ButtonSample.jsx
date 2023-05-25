import React, { useState } from "react";

function ButtonSample({
  innerText = "",
  onClick = () => {},
  backgroundColor = "#38BDF8",
  hoverBackgroundColor = "#ABC7F8",
  color = "black",
  hoverColor = "black",
  style = {},
  children,
  disabled = false,
  title = "",
}) {
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <button
        disabled={disabled}
        title={title}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
        onClick={onClick}
        style={{
          borderRadius: 5,
          padding: "2px 10px",
          ...style,
          backgroundColor: hovering ? hoverBackgroundColor : backgroundColor,
          color: hovering ? hoverColor : color,
        }}
      >
        {innerText}
        {children}
      </button>
    </>
  );
}

export default ButtonSample;

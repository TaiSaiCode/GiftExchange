import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

export default function StyledCard({
  children,
  padding,
  margin,
  width,
  minWidth,
  marginTop,
}) {
  return (
    <StyledWidthMargedPadding
      padding={padding}
      margin={margin}
      width={width}
      minWidth={minWidth}
      marginTop={marginTop}
      
    >
      {children}
    </StyledWidthMargedPadding>
  );
}

const StyledWidthMargedPadding = styled(Card)`
  border-color: deepskyblue;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "")};
  min-width: ${(props) => (props.minWidth ? props.minWidth : "max-content")};
  width: ${(props) => (props.width ? props.width : "")};
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  margin: ${(props) => (props.margin ? props.margin : "")};
`;

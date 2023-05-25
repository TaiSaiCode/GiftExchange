import React, { useState, useEffect } from "react";
import styled from "styled-components";
/**
 * A menu made of tabs. Just provide the react components or tags (ex: div, section, etc) you want as the innerHTML of this function and give a "tabtitle" attribute to each one of them.
 *
 * @returns
 */
export default function TabsMenu({ children }) {
  const [content, setContent] = useState(<></>);
  const [index, setIndex] = useState(-1);
  const [defaultTabIndex, setDefaultTabIndex] = useState(-1);

  useEffect(() => {
    if (defaultTabIndex >= 0) {
      setIndex(defaultTabIndex);
      setContent(children[defaultTabIndex]);
    }
  }, [defaultTabIndex, children]);

  return (
    <>
      <div style={{}}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            {React.Children.map(children, (child, i) => (
              <div key={i}>
                <TabMenuOption
                  index={i}
                  styleclass={`custom_tab_raise${
                    i === index ? "_selected" : ""
                  }`}
                  setIndex={setIndex}
                  children={child}
                  renderFunction={setContent}
                  setDefaultTabIndex={setDefaultTabIndex}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "0px 15px 15px 15px",
          }}
        >
          {content}
        </div>
      </div>
    </>
  );
}

function TabMenuOption({
  index,
  renderFunction,
  styleclass,
  setIndex,
  children,
  setDefaultTabIndex,
}) {
  useEffect(() => {
    if (children.props.tabdefaultindex) setDefaultTabIndex(index);
  }, []);
  const header = children.props.tabtitle;

  return (
    <>
      {children.props.children ? (
        <button
          className={styleclass}
          onClick={() => {
            renderFunction(children);
            setIndex(index);
          }}
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            minWidth: 100,
            float: "left",
            boxShadow: "1px 0px 2px black",
            padding: 10,
          }}
        >
          {header ? (
            <b>{header}</b>
          ) : (
            <span style={{ backgroundColor: "red" }}>TAB TITLE UNDEFINED</span>
          )}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
export function TabItem({ tabtitle, tabdefaultindex, children }) {
  return <PaddedDiv>{children}</PaddedDiv>;
}
const PaddedDiv = styled.div`
  padding: 2vmin;
`;

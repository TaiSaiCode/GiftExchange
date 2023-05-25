import React, { useState } from "react";

/**
 * A menu made of tabs. Just provide the react components or tags (ex: div, section, etc) you want as the innerHTML of this function and give a "tabtitle" attribute to each one of them.
 *
 * @returns
 */
export default function TabsMenu({ children }) {
  const [content, setContent] = useState(<></>);
  const [index, setIndex] = useState(-1);
  const [rendered_once, setRenderedOnce] = useState(false);

  function firstRender() {
    document
      .getElementById(
        "487h3r7fg423b87hfef1379hfe932h9rh3494h7f987hfty8o474t78y94378"
      )
      .click();
  }

  function TabMenuOption({ index, renderFunction, styleclass, children }) {
    let header = Object.values(children)[4].tabtitle;
    if (
      !rendered_once &&
      Object.values(children)[4].tabdefaultindex == "true"
    ) {
      setRenderedOnce(true);
      setTimeout(firstRender, 200);
    }
    return (
      <>
        <button
          id={
            Object.values(children)[4].tabdefaultindex == "true"
              ? "487h3r7fg423b87hfef1379hfe932h9rh3494h7f987hfty8o474t78y94378"
              : ""
          }
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
      </>
    );
  }

  return (
    <>
      <div style={{}}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            {children.map((o, i) => (
              <div key={i}>
                <TabMenuOption
                  index={i}
                  styleclass={
                    "custom_tab_raise" + (i == index ? "_selected" : "")
                  }
                  children={o}
                  renderFunction={setContent}
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

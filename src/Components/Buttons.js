import React from "react";

export default function Buttons(props) {

  // click handler to update the frames component of respective id
  const handleClick = (e) => {
    e.preventDefault();
    props.updateApi(props["props"].id);
  };

  return <button onClick={handleClick}>Button {props["api"].id}</button>;
}

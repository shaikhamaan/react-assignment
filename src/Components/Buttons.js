import React from "react";

export default function Buttons(props) {

  // click handler to update the frames component of respective id
  const handleClick = (e) => {
    props.updateApi(props["props"].id);
    e.preventDefault();
  };

  return <button onClick={handleClick}>Button {props["props"].id}</button>;
}

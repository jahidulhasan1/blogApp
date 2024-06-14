import React, { useState } from "react";
import Modal from "../../../../utils/Modal";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "../../../../utils/DropDown";
function Action({ post }) {
  const [showDrop, setShowDrop] = useState(false);

  const handleDrop = () => {
    setShowDrop(!showDrop);
  };

  return (
    <div className="relative ">
      <button onClick={handleDrop}>
        <BsThreeDots className="text-2xl " />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop}>
        <Button click="" name="edit story" />
        <Button click="" name="delete story" />
      </DropDown>
      {/* <Modal modal={modal} setModal={setModal}/> */}
    </div>
  );
}

export default Action;

const Button = ({ click, name }) => {
  return (
    <button
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left 
        ${name === "delete story" && "text-red-600"}
        `}
    >
      {name}
    </button>
  );
};

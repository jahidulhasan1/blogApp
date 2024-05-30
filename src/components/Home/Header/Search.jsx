// Search.jsx
import React, { useState } from "react";
import Modal from "../../../utils/Modal";
import { CiSearch } from "react-icons/ci";

function Search({modal,setModal}) {



  return (
    <>
      <Modal modal={modal}  setModal={setModal}>
        <div className={`absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0 ${modal ? "visible opacity-100" : "invisible sm:visible sm:opacity-100 opacity-0"} transition-all duration-200`}>
         <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative z-10">
      <span className="text-2xl text-gray-400"> <CiSearch/> </span>
<input className="bg-transparent outline-none py-[0.7rem] w-full"
type="text" placeholder="Search. . ."/>
         </div>
        </div>
      </Modal>
    </>
  );
}

export default Search;

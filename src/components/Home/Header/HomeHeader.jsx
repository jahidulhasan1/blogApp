import React, { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Search from "./Search";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";

function HomeHeader() {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  return (
    <header className="border-b border-gray-200">
      <div className="size h-[60px] flex items-center justify-between ">
        <div className="flex items-center gap-3 ">
          <Link to={"/"}>
            <span className="text-5xl">
              <BsMedium />
            </span>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>
        <div className="flex items-center gap-3 sm:gap-7 ">
        <span
        onClick={()=> setSearchModal(true)}
        className= "flex   text-3xl text-gray-300 cursor-pointer sm:hidden ">
            <CiSearch />
          </span>
          <Link
            to={"/write"}
            className="hidden md:flex items-center gap-1 text-gray-500"
          >
            <span className="text-3xl">
              <LiaEditSolid />
            </span>
            <span className="text-sm mt-2"> write</span>
          </Link>
        
          <span className="text-3xl text-gray-500 cursor-pointer  ">
            <IoMdNotificationsOutline />
          </span>
          <div className="flex items-center relative cursor-pointer">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] rounded-full cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              alt="profile"
            />
            <span>
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100%" : "invisible opacity-0"
                } transition-all duration-100 `}
              >
                <UserModal />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;

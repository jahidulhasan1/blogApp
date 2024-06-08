import React, { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdAllInbox, MdKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import Modal from "../../../utils/Modal";
import UserModal from "./UserModal";
import { useBlogContext } from "../../../context/Context";
import Loading from "../../loading/Loading";

function HomeHeader() {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const { pathname, hash, search } = useLocation();

  const { allUser, currentUser, userLoading, publish, setPublish } =
    useBlogContext();

  const getuser = allUser.find((x) => x.userId === currentUser?.uid);

  return (
    <header className="border-b border-gray-200">
      {userLoading && <Loading />}
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
            onClick={() => setSearchModal(true)}
            className="flex   text-3xl text-gray-300 cursor-pointer sm:hidden "
          >
            <CiSearch />
          </span>
          {pathname === "/write" ? (
            <button
              className=" text-xl  rounded-full
           text-black-500 px-3 py-1 bg-green-400"
              onClick={() => setPublish(true)}
            >
              publish
            </button>
          ) : (
            <Link
              to={"/write"}
              className="hidden md:flex items-center gap-1 text-gray-500"
            >
              <span className="text-2xl">
                <LiaEditSolid />
              </span>
              <span className="text-xl mt-1"> Write</span>
            </Link>
          )}

          <span className="text-3xl text-gray-500 cursor-pointer  ">
            <IoMdNotificationsOutline />
          </span>
          <div className="flex items-center relative cursor-pointer">
            <img
              onClick={() => setModal(true)}
              className="w-[2.3rem] h-[2.3rem] rounded-full cursor-pointer"
              src={
                getuser?.imgUrl
                  ? getuser?.imgUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
              alt="profile"
            />
            {/* */}
            {/*  */}
            <span>
              <MdKeyboardArrowDown />
            </span>
            <Modal modal={modal} setModal={setModal}>
              <div
                className={`${
                  modal ? "visible opacity-100%" : "invisible opacity-0"
                } transition-all duration-100 `}
              >
                <UserModal setModal={setModal} />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;

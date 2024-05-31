import React, { useState } from "react";
import ProfileHome from "./Activities/ProfileHome";
import ProfileList from "./ProfileList";
import ProfileAbout from "./ProfileAbout";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { discoverActions } from "../../../data";
import { IoSettingsSharp } from "react-icons/io5";

function Profile() {
  const activities = [
    {
      title: "Home",
      comp: ProfileHome,
    },
    {
      title: "Lists",
      comp: ProfileList,
    },
    {
      title: "About",
      comp: ProfileAbout,
    },
  ];
  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);
  return (
    <section className="size flex gap-[4rem] relative">
      {/* user activity */}
      <div className="mt-[9rem] flex-[2] ">
        <div className="flex flex-col sm:flex-row sm:items-end items-start gap-4 ">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            Rafi roh
          </h2>
          <div className="flex gap-3">
            <p className="text-gray-500 text-xs sm:text-sm">Follower(2)</p>
            <p className="text-gray-500 text-xs sm:text-sm">Following(5)</p>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-[01rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((active, i) => (
            <div
              key={i}
              className={`py-[0.5rem] ${
                active.title == currentActive.title
                  ? "border-b  border-gray-500 "
                  : ""
              }`}
            >
              <button
                onClick={() => setCurrentActive(active)}
                className="text-gray-500 text-sm sm:text-base font-bold capitalize"
              >
                {active.title}{" "}
              </button>
            </div>
          ))}
        </div>
        <currentActive.comp />
        <button
          onClick={() => setModal(true)}
          className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white
        grid place-items-center md:hidden"
        >
          <IoSettingsSharp />
        </button>
      </div>
      {/* sidebar or  */}
      <Modal modal={modal} setModal={setModal}>
        <div
          className={`flex-[1] border-l border-gray-500 p-[2rem] z-10 bg-white fixed w-[18rem] right-0 bottom-0 top-[3.9rem] md:relative $
    ${
      modal ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"
    } transition-all duration-500`}
        >
          <div className="pb-4 text-right">
            <button
              onClick={() => setModal(false)}
              className="inline-block md:hidden"
            >
              <LiaTimesSolid />
            </button>
          </div>
          {/* profile details */}
          <div className="sticky top-7 flex flex-col justify-between">
            <img
              className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="user image"
            />
            <h2 className="py-2 font-bold capitalize">
              {"getUserData?.username"}
            </h2>
            <p className="text-gray-500 first-letter:uppercase text-sm">
              {"getUserData?.bio"}
            </p>
            <button className="text-green-700 pt-6 text-sm w-fit">
              Edit Profile
            </button>
            {/* nav */}

            <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
              {discoverActions.map((act, i) => (
                <button key={i}>{act}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Profile;

import React from "react";
import { useBlogContext } from "../../../context/Context";

function ProfileAbout({ getData, setEditModal }) {
  const { currentUser } = useBlogContext();
  return (
    <div className="w-full">
      <p className="text-2xl first-letter:uppercase">
        {" "}
        {getData?.bio || getData?.name + " has no bio"}
      </p>
      <div className="text-right">
        {currentUser.uid === getData.userId && (
          <button
            onClick={() => setEditModal(true)}
            className="border border-black px-5 py-2 rounded-full text-black mt-4"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileAbout;

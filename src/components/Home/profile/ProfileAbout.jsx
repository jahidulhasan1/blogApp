import React from "react";

function ProfileAbout({ getData, setEditModal }) {
  return (
    <div className="w-full">
      <p className="text-2xl first-letter:uppercase">
        {" "}
        {getData?.bio || getData?.name + " has no bio"}
      </p>
      <div className="text-right">
        <button
          onClick={() => setEditModal(true)}
          className="border border-black px-5 py-2 rounded-full text-black mt-4"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ProfileAbout;

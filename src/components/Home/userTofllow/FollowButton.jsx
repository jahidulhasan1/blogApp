import React, { useEffect, useState } from "react";
import { useBlogContext } from "../../../context/Context";
import { useLocation } from "react-router-dom";
import { ref } from "firebase/storage";
import { db } from "../../../firebase/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useSingleFetch from "../../Hooks/useSingleFetch";

function FollowButton({ userId }) {
  const { currentUser } = useBlogContext();
  const [isFollowed, setIsFollowed] = useState(false);
  const { data } = useSingleFetch("users", currentUser?.uid, "follows");
  console.log(data);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setIsFollowed(data.findIndex((x) => x?.id === userId) !== -1);
    }
  }, [data, currentUser.uid, userId]);

  const handleFollow = async () => {
    try {
      if (currentUser) {
        const followRef = doc(db, "users", currentUser?.uid, "follows", userId);
        const followersRef = doc(
          db,
          "users",
          userId,
          "followers",
          currentUser?.uid
        );

        if (isFollowed) {
          await deleteDoc(followRef);

          await deleteDoc(followersRef);
          toast.success("user has been unFollowed");
        } else {
          await setDoc(followRef, {
            userId: userId,
          });
          await setDoc(followersRef, {
            userId: userId,
          });
          toast.success("user has been Followed");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const { pathname } = useLocation();

  return (
    <>
      <button
        onClick={handleFollow}
        className={`${
          pathname === "/" ? "border border-black" : ""
        } px-3 py-[0.2rem] rounded-full
        ${isFollowed ? "text-gray-500 border-none" : ""}`}
      >
        {isFollowed ? "Following" : "Follow"}
      </button>
    </>
  );
}

export default FollowButton;

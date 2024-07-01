import React, { useEffect, useState } from "react";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { useBlogContext } from "../../../../context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../Hooks/useSingleFetch";
import { formateNum } from "../../../../utils/Helper";

function Like({ postId }) {
  console.log(postId);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser,modal, setModal } = useBlogContext();
  const { data } = useSingleFetch("posts", postId, "likes");
  useEffect(() => {
    setIsLiked(data && data.findIndex((x) => x.id === currentUser?.uid) !== -1);
    console.log(isLiked);
  }, [data]);

  const likeHandler = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);

        if (isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, {
            userId: currentUser?.uid,
          });
        }
      }else{
        setModal(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <button onClick={likeHandler} className="flex items-center gap-1 text-sm">
      <PiHandsClappingDuotone
        className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`}
      />
      <span>{formateNum(data.length)}</span>
    </button>
  );
}

export default Like;

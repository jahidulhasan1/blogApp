import { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { useBlogContext } from "../../../context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../Hooks/useSingleFetch";

function SavePost({ post }) {
  const { currentUser,modal, setModal } = useBlogContext();
  const isUser = currentUser ? currentUser?.uid : post?.id;
  const [isSave, setIsSave] = useState(false);
  const { data } = useSingleFetch("users", isUser, "savePost");

  useEffect(() => {
    if (data) {
      setIsSave(data.some((x) => x.id === post?.id));
    }
  }, [data, post?.id, currentUser]);

  const handelSavePost = async () => {
    try {
      if (currentUser) {
        // create a collection
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if (isSave) {
          await deleteDoc(saveRef);
          setIsSave(false);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          setIsSave(true);
          toast.success("Post saved");
        }
      } else {
        console.log("User not logged in");
        setModal(true)
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Save post firebase", error);
    }
  };

  return (
    <>
      <button onClick={handelSavePost} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-events-none ${
            isSave ? "text-yellow-600" : ""
          }`}
        />
      </button>
    </>
  );
}

export default SavePost;

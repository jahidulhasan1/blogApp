import { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { useBlogContext } from "../../../context/Context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../Hooks/useSingleFetch";
function SavePost({ post }) {
  const { currentUser, allUser } = useBlogContext();

  const [isSave, setIsSave] = useState(false);
  const { data } = useSingleFetch("users", currentUser?.uid, "savePost");


  
  useEffect(() => {
    setIsSave(data && data.find((x) => x.id === post.id));
  }, [data, post.id]);

  const handelSavePost = async () => {
    try {
      if (currentUser) {
        // create a collection
        const saveRef =  doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if (isSave) {
          await deleteDoc(saveRef);

          toast.success("post Has been unSaaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("post saved");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log("save post firevbase", error);
    }

    setIsSave(true);
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

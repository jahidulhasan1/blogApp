import React, { useEffect, useState } from "react";
import Modal from "../../../../utils/Modal";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "../../../../utils/DropDown";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../../../context/Context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
function Action({ postId, title, description, post: postid }) {
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  const { setUpdateData, currentUser } = useBlogContext();
  const handleDrop = () => {
    setShowDrop(!showDrop);
  };

  const handlePostEdit = async () => {
    navigate(`/editPost/${postId}`);
    setUpdateData({ title, description });
  };

  async function handleDeletePost() {
    try {
      const ref = doc(db, "posts", postId);
      const likeref = doc(db, "posts", postId, "likes", currentUser?.uid);
      const comref = doc(db, "posts", postId, "comments", currentUser?.uid);
      const saveRef = doc(db, "users", currentUser?.uid, "savePost", postid);
      await deleteDoc(ref);
      await deleteDoc(likeref);
      await deleteDoc(comref);
      await deleteDoc(saveRef);
      navigate("/");
      toast.success("post has been deleted");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="relative ">
      <button onClick={handleDrop}>
        <BsThreeDots className="text-2xl " />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop}>
        <Button click={handlePostEdit} name="edit story" />
        <Button click={handleDeletePost} name="delete story" />
      </DropDown>
      {/* <Modal modal={modal} setModal={setModal} /> */}
    </div>
  );
}

export default Action;

const Button = ({ click, name }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left 
        ${name === "delete story" && "text-red-600"}
        `}
    >
      {name}
    </button>
  );
};

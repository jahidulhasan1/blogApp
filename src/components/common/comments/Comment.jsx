import React, { useState } from "react";
import { useBlogContext } from "../../../context/Context";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import moment from "moment";
import DropDown from "../../../utils/DropDown";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
function Comment({ comment, postId }) {
  const { currentUser, allUser } = useBlogContext();
  const [more, setMore] = useState(false);
  const [isEdit, setEdit] = useState(false);
  console.log(!isEdit);
  const [loading, setLoading] = useState(false);
  const [commentval, setCommentVal] = useState("");
  const [drop, setDrop] = useState(false);
  const getUserData = allUser.find((item) => item.id === comment.userId);

  const removeComment = async () => {
    try {
      const ref = doc(db, "posts", postId, "comments", comment.id);
      await deleteDoc(ref);
      toast.success("comment has been deleted");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEdit = async () => {
    setLoading(false);
    try {
      const ref = doc(db, "posts", postId, "comments", comment.id);
      await updateDoc(ref, {
        commentText: commentval,
        create: Date.now(),
        userId: currentUser?.uid,
      });
      setCommentVal("");
      setEdit(false);
      setDrop(false);
      setLoading(false);
      toast.success("post has been updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editCommentText = () => {
    setEdit(true);
    setDrop(false);
    setCommentVal(comment?.commentText);
  };
  return (
    <section className=" border-b  pt-[1rem]">
      {!isEdit ? (
        <>
          <div className="flex items-center gap-5">
            <img
              src={
                getUserData.imgUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="userimage"
              className="w-[3rem] h-[3rem] rounded-full object-cover "
            />

            <div className="flex-1 flex justify-between ">
              <div className="">
                <h2 className="text-sm capitalize">{getUserData?.name}</h2>
                <p className="text-sm text-gray-400">
                  {moment(comment?.created).fromNow()}
                </p>
              </div>
              <div className="relative">
                {currentUser && currentUser?.uid === comment?.userId && (
                  <>
                    <button
                      onClick={() => {
                        setDrop(!drop);
                      }}
                      className="text-2xl hover:opacity-70"
                    >
                      <BiDotsHorizontalRounded />
                    </button>
                    <DropDown
                      showDrop={drop}
                      setShowDrop={setDrop}
                      // size="w-[10rem]"
                    >
                      <Button
                        click={editCommentText}
                        title="Edit this response"
                      />
                      <Button click={removeComment} title="Delete" />
                    </DropDown>
                  </>
                )}
              </div>
            </div>
          </div>

          <p
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
            className="py-4 text-sm inline"
          >
            {more
              ? comment?.commentText
              : comment.commentText?.substring(0, 100)}

            {comment.commentText.length > 100 && (
              <button onClick={() => setMore(!more)}>
                {more ? "...less" : "...more"}
              </button>
            )}
          </p>
        </>
      ) : (
        <div className="bg-white shadows p-4">
          <textarea
            value={commentval}
            onChange={(e) => setCommentVal(e.target.value)}
            placeholder="write update comment"
            className="w-full outline-none resize-none "
          ></textarea>
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setEdit(false)} className="w-fit text-sm">
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn !text-white !bg-green-700 !rounded-full !text-xs"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Comment;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 text-black/80 w-full text-sm text-left"
    >
      {title}
    </button>
  );
};

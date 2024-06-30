import React, { useEffect, useState } from "react";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { useBlogContext } from "../../../context/Context";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import useSingleFetch from "../../Hooks/useSingleFetch";
import Loading from "../../loading/Loading";
import Comment from "./Comment";
function Comments({ postId }) {
  const [comment, setComment] = useState("");
  const {
    currentUser,
    allUser,
    showModal,
    setShowModal,

    setCommentLength,
  } = useBlogContext();
  const { data, loading } = useSingleFetch("posts", postId, "comments");

  useEffect(() => {
    if (data) {
      setCommentLength(data.length);
    }
  }, [data]);
  // const {userData} = useFetch("users");
  const getUserData = allUser.find((x) => x.userId === currentUser?.uid);

  const hnadleComment = async () => {
    try {
      if (comment === "") {
        toast.error("must be feild");
      } else {
        const commentRef = collection(db, "posts", postId, "comments");

        await addDoc(commentRef, {
          commentText: comment,
          created: Date.now(),
          userId: currentUser?.uid,
        });
        toast.success("Comment has been added");
        setComment("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal modal={showModal} setModal={setShowModal}>
      <section
        className={`fixed  p-5 z-50 top-0 right-0 bottom-0 bg-white overflow-y-auto transition-all duration-500 w-[23rem] ${
          showModal ? "translate-x-0" : "translate-x-[23rem]"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Responses</h3>
          <button onClick={() => setShowModal(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>

        {currentUser && (
          <div className="shadows p-3 my-5 overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <img
                className="w-[2rem] h-[2rem] object-cover rounded-full"
                src={
                  getUserData?.userImg ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
                }
                alt="user-img"
              />
              <h3 className="capitalize text-sm">{getUserData?.name}</h3>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full outline-none resize-none text-sm border px-2 pt-4"
            ></textarea>
            <div className="flex items-center justify-end gap-4 mt-[1rem]">
              <button onClick={() => setComment("")} className="text-sm">
                Cancel
              </button>
              <button
                onClick={hnadleComment}
                className="btn !text-xs !bg-green-700 !text-white !rounded-full"
              >
                Response
              </button>
            </div>
          </div>
        )}
        {data && data.length === 0 ? (
          <p>this post has no comments</p>
        ) : (
          <div className="border-t py-4 mt-8 flex flex-col gap-8 ">
            {data &&
              data.map((item, i) =>
                loading ? (
                  <Loading key={i} />
                ) : (
                  <Comment comment={item} key={i} postId={postId} />
                )
              )}
          </div>
        )}
      </section>
    </Modal>
  );
}

export default Comments;

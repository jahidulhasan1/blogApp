import React from "react";
import { FaRegComment } from "react-icons/fa";
import { useBlogContext } from "../../../../context/Context";
import { formateNum } from "../../../../utils/Helper";
function CommentBtn() {
  const { showModal, setShowModal,commentLength,
    setCommentLength } = useBlogContext();
  const handleComment = () => {
    setShowModal(true);
  };
  return (
    <button onClick={handleComment} className="flex items-center gap-2 text-sm">
      <FaRegComment className="text-lg" />
      <span>{formateNum(commentLength)}</span>
   
    </button>
  );
}

export default CommentBtn;

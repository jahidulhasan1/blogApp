import React from "react";
import { FaRegComment } from "react-icons/fa";
function Comments() {
  return (
    <button className="flex items-center gap-2 text-sm">
      <FaRegComment className="text-lg" />
      <span>1</span>
    </button>
  );
}

export default Comments;

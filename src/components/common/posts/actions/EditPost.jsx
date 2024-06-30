import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useBlogContext } from "../../../../context/Context";

function EditPost() {
  const { setTitle, title, setDescription, updateData, description } =
    useBlogContext();

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title);
      setDescription(updateData.description);
    }
  }, [updateData]);

  return (
    <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title.. "
        className="w-full outline-none text-4xl "
      />
      <ReactQuill
        theme="bubble"
        value={description}
        placeholder="Tell Your Story..."
        onChange={setDescription}
        className="write my-5"
      />
    </section>
  );
}

export default EditPost;

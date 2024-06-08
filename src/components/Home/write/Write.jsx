import { useState } from "react";
import ReactQuill from "react-quill";
import Preview from "./Preview";
import { useBlogContext } from "../../../context/Context";

function Write() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { publish, setPublish } = useBlogContext();
  return (
    <section className="w-[90%] md:w-[90%] lg:w-[60%] mx-auto py-[3rem]">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="text-4xl outline-none w-full"
      />
      <ReactQuill
        theme="bubble"
        value={description}
        placeholder="Tell Your Story..."
        onChange={setDescription}
        className="write my-5"
      />

      {/* className={`${
        publish ? "visible opacity-100" : "invisible opacity-0"
      } transition-all duration-200`} */}

      <div>
        <div
          className={`${
            publish ? "visible opacity-100" : "invisible opacity-0"
          } transition-all duration-200`}
        >
          <Preview
            setPublish={setPublish}
            description={description}
            title={title}
          />
        </div>
      </div>
    </section>
  );
}

export default Write;

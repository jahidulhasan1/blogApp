import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
// import TagsInput from "react-tagsinput";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useBlogContext } from "../../../context/Context";

import { useNavigate } from "react-router-dom";
function Preview({ setPublish, description, title }) {
  console.log(description);
  const imagref = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState({
    title: "",
    photoUrl: "",
  });
  const navigate = useNavigate();
  const { currentUser } = useBlogContext();
  const handleImage = () => {
    imagref.current.click();
  };
  const handleChange = (tags) => {
    setTags(tags);
  };

  useEffect(() => {
    if (title || description) {
      setPreview({ ...preview, title: title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, description]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        preview.title === "" ||
        preview.photoUrl === "" ||
        tags.length === 0
      ) {
        toast.error("All requred");
        return;
      }
      if (preview.title.length < 15) {
        toast.error("title must be atleast 15 letters");
      }

      // !  all of for photo
      const storageRef = ref(storage, `image/${preview?.photoUrl.name}`);
      uploadBytes(storageRef, preview?.photoUrl);
      const uRL = await getDownloadURL(storageRef);

      // ! adddoc
      const collections = collection(db, "posts");
      await addDoc(collections, {
        userId: currentUser?.uid,
        title: preview.title,
        postImg: uRL,
        desc,
        tags,
        created: Date.now(),
        pageViews: 0,
      });
      toast.success("Post has Been Addded");
      navigate("/");
      setPublish(false);
      setPreview({
        title: "",
        photoUrl: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="absolute inset-0 bg-white z-30">
      <div className="size  my-[2rem]">
        <span
          onClick={() => setPublish(false)}
          className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
        >
          <LiaTimesSolid />
        </span>
        {/* preview text */}
        <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
          {/* inputs */}
          <div className="flex-1 w-[50%]">
            <h3>Story preveiw</h3>
            <div
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={handleImage}
              className="w-full h-[200px] object-cover bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat"
            >
              {!imageUrl && " add Image"}
            </div>
            <input
              onChange={(e) => {
                setImageUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photoUrl: e.target.files[0] });
              }}
              type="file"
              hidden
              ref={imagref}
            />
            <input
              value={preview.title}
              onChange={(e) =>
                setPreview({ ...preview, title: e.target.value })
              }
              type="text"
              placeholder="Title"
              className="border-b border-gray-300 py-2 outline-none w-full"
            />
            <ReactQuill
              theme="bubble"
              value={desc}
              onChange={setDesc}
              placeholder="Tell Your Story..."
              className="write my-5 border-b border-gray-300 py-3"
            />
            <p className="text-gray-500 pt-4 text-sm">
              <span className="font-bold">Note:</span> Changes here will affect
              how your story appears in public places like Medium’s homepage and
              in subscribers’ inboxes — not the contents of the story itself.
            </p>
          </div>
          {/* publish */}
          <div className="flex-1 flex flex-col gap-4 mb-5 md:mb-0">
            <h3 className="text-2xl">
              Publishing to:
              <span className="font-bold capitalize">Milad Tech</span>
            </h3>
            <p>
              Add or change topics up to 5 so readers know what your story is
              about
            </p>
            <TagsInput value={tags} onChange={handleChange} />
            <button
              onClick={handleSubmit}
              className="btn !bg-green-800 !w-fit !text-white !rounded-full"
            >
              {loading ? "Submitting..." : "Publish Now"}
              {/* {loading ? "Submitting..." : "Publish Now"} */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Preview;

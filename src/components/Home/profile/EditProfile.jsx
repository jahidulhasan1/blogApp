import { useEffect, useRef, useState } from "react";
import Modal from "../../../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditProfile({ EditModal, setEditModal, getData }) {
  const imgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    imgUrl: "",
    bio: "",
  });

  useEffect(() => {
    if (getData) {
      setForm(getData);
    } else {
      setForm({ name: "", imgUrl: "", bio: "" });
    }
  }, [getData]);

  // edit profile form
  const saveData = async () => {
    if (form.name === "" || form.bio === "") {
      toast.error("All inputs are required!!!");
      return;
    }

    setLoading(true);

    const storageRef = ref(storage, `image/${form.imgUrl.name}`);
    await uploadBytes(storageRef, form?.imgUrl);

    const imageDUrl = await getDownloadURL(storageRef);

    try {
      const docRef = doc(db, "users", getData?.userId);
      await updateDoc(docRef, {
        bio: form.bio,
        name: form.name,
        imgUrl: imageUrl ? imageDUrl : form.imgUrl,
        userId: getData?.userId,
      });
      setLoading(false);
      setEditModal(false);
      toast.success("Profile has been updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const saveData = async () => {
  //   if (form.name === "" || form.bio === "") {
  //     toast.error("All inputs are required!!!");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     if (!getData?.userId) {
  //       throw new Error("User ID is missing");
  //     }

  //     const docRef = doc(db, "users", getData.userId);
  //     // const docSnap = await getDoc(docRef);
  //     // if (!docSnap.exists()) {

  //     //   throw new Error(`No document found for user ID: ${getData.userId}`);
  //     // }

  //     console.log("Document exists. Proceeding to update...");

  //     let imageDownloadUrl = form.imgUrl;
  //     if (imageUrl) {
  //       const storageRef = ref(storage, `images/${form.imgUrl.name}`);
  //       await uploadBytes(storageRef, form.imgUrl);
  //       imageDownloadUrl = await getDownloadURL(storageRef);
  //     }

  //     await updateDoc(docRef, {
  //       bio: form.bio,
  //       name: form.name,
  //       imgUrl: imageDownloadUrl,
  //       userId: getData.userId,
  //     });

  //     setLoading(false);
  //     setEditModal(false);
  //     toast.success("Profile has been updated");
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //     setLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  //   const saveData = async () => {
  //     if (form.name === "" || form.bio === "") {
  //       toast.error("All inputs are required!!!");
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       if (!getData?.userId) {
  //         throw new Error("User ID is missing");
  //       }

  //       console.log(`User ID: ${getData.userId}`);
  //       console.log("Form data:", form);

  //       const docRef = doc(db, "users", getData.userId);
  //       const docSnap = await getDoc(docRef);
  // console.log(docSnap.exists());
  //       if (!docSnap.exists()) {
  //         console.error(`Document not found for user ID: ${getData.userId}`);
  //         throw new Error(`No document found for user ID: ${getData.userId}`);
  //       }

  //       console.log("Document exists. Proceeding to update...");

  //       let imageDownloadUrl = form.imgUrl;
  //       if (imageUrl) {
  //         const storageRef = ref(storage, `images/${form.imgUrl.name}`);
  //         await uploadBytes(storageRef, form.imgUrl);
  //         imageDownloadUrl = await getDownloadURL(storageRef);
  //       }

  //       await updateDoc(docRef, {
  //         bio: form.bio,
  //         name: form.name,
  //         imgUrl: imageDownloadUrl,
  //         userId: getData.userId,
  //       });

  //       setLoading(false);
  //       setEditModal(false);
  //       toast.success("Profile has been updated");
  //     } catch (error) {
  //       console.error("Error updating document:", error);
  //       setLoading(false);
  //       toast.error(error.message);
  //     }
  //   };

  const handleImg = () => {
    imgRef.current.click();
  };

  return (
    <Modal modal={EditModal} setModal={setEditModal}>
      <div className="center bg-white z-20 w-[95%] md:w-[45rem] mx-auto shadows my-[1rem] mb-[3rem] p-7">
        {/* head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile information</h2>
          <button onClick={() => setEditModal(false)} className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              <img
                className="min-h-[5rem] min-w-[5rem] object-cover border rounded-full border-gray-400"
                src={
                  imageUrl
                    ? imageUrl
                    : form.imgUrl
                    ? form.imgUrl
                    : "https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
                }
                alt="profile image"
              />
              <input
                onChange={(e) => {
                  setImageUrl(URL.createObjectURL(e.target.files[0]));
                  setForm({ ...form, imgUrl: e.target.files[0] });
                }}
                accept="image/png, image/jpg, image/jpeg"
                ref={imgRef}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button onClick={handleImg} className="text-green-600">
                  Update
                </button>
                <button
                  onClick={() => {
                    setImageUrl("");
                    setForm({ ...form, imgUrl: "" });
                  }}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
                side.
              </p>
            </div>
          </div>
        </section>
        {/* form */}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="name">
            Name*
          </label>
          <input
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form?.name}
            type="text"
            maxLength={50}
            name="name"
            placeholder="username..."
            className="p-1 border-b border-black outline-none w-full"
          />
          <p className="text-sm text-gray-600 pt-2">
            Appears on your Profile page, as your byline, and in your responses.{" "}
            {form.name.length}/50
          </p>
          <section className="pt-5">
            <label className="pb-3 block" htmlFor="bio">
              Bio*
            </label>
            <input
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              type="text"
              maxLength={150}
              name="bio"
              value={form?.bio}
              placeholder="bio..."
              className="p-1 border-b border-black outline-none w-full"
            />
            <p className="text-sm text-gray-600 pt-2">
              Appears on your Profile and next to your stories.{form.bio.length}
              /150
            </p>
          </section>
        </section>
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button
            onClick={() => setEditModal(false)}
            className="border border-red-400 py-2 px-5 rounded-full text-red-600"
          >
            Cancel
          </button>
          <button
            onClick={saveData}
            className="border border-green-400 py-2 px-5 rounded-full text-white bg-green-500"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfile;

import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

function SignUp({ setSignReq, setModal }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (
      form.name == "" ||
      form.email == "" ||
      form.password == "" ||
      form.repassword == ""
    ) {
      toast.error("All fields are required");
      return;
    } else if (form.password !== form.repassword) {
      toast.error("Your passwords are not matching!");
      return;
    } else {
      try {
        setLoading(true);
        const user = (
          await createUserWithEmailAndPassword(auth, form.email, form.password)
        ).user;

        const ref = doc(db, "users", user.uid);
        const userDoc = await getDoc(ref);

        if (!userDoc.exists()) {
          await setDoc(ref, {
            userId: user.uid,
            username: form.name,
            email: form.email,
            userImg: "",
            bio: "",
            created: Date.now(),
          });
          navigate("/");
          setModal(false);
          toast.success("User has been created");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="size mt-[6rem] text-center w-full px-10 ">
      <h2 className="text-3xl">Sign Up with Email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we'll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          title="Name:"
          form={form}
          setForm={setForm}
        />
        <Input
          type="email"
          name="email"
          title="Email:"
          form={form}
          setForm={setForm}
        />
        <Input
          type="password"
          name="password"
          title="Password:"
          form={form}
          setForm={setForm}
        />
        <Input
          type="password"
          name="repassword"
          title="Confirm Password:"
          form={form}
          setForm={setForm}
        />

        <button
          className={`px-8 py-2 text-lg rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto ${
          loading ? "opacity-50 pointer-events-none" : " "
        }`}
        >
          Sign up
        </button>
      </form>

      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign Up Options
      </button>
    </div>
  );
}

export default SignUp;

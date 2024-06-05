import React, { useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../../context/Context";

function SignIn({ setSignReq }) {
  const [form, setForm] = useState({
    email: "",
    password: "",a
  });

  const navigate = useNavigate();
 
  const [ loading, setLoading ] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((form.email == "") | (form.password == "")) {
      toast.error("All feilds Are required");
    } else {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, form.email, form.password);
        navigate("/");
        toast.success("you are Logg-In");
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="size mt-[6rem] text-center w-full px-10 ">
      <h2 className="text-3xl">SignIn with Email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <Input
          form={form}
          setForm={setForm}
          type="email"
          name="email"
          title="email :"
        />
        <Input
          form={form}
          setForm={setForm}
          type="password"
          title="password :"
          name="password"
        />

        <button
          className={`px-8 py-2 text-lg rounded-full bg-green-700
        hover:bg-green-800 text-white w-fit mx-auto
${loading ? "opacity-50 pointer-events-none" : " "}

  `}
        >
          Sign in
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-green-600 hover:text-green-700
      flex items-center mx-auto"
      >
        <MdKeyboardArrowLeft />
        All sign In Options
      </button>
    </div>
  );
}

export default SignIn;

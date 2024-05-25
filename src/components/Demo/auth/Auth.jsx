import React, { useState } from "react";
import Modal from "/src/utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
function Auth() {
  const [createUser, setCreateUser] = useState(false);
  const [signReq, setSignReq] = useState("");
  const [modal, setModal] = useState(true);
  return (
    // modal =blur div
    <Modal modal={modal} setModal={setModal}>
      <section
        className={`z-50 bottom-0 fixed top-0  md:left-[10rem] overflow-auto bg-white right-0 md:right-[10rem] shadow ${
          modal ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-500`}
      >
        <button
        onClick={()=> setModal(false)}
        className=" top-8 right-8 absolute text-2xl hover:opacity-50">
          <LiaTimesSolid />
        </button>
        <div className="flex flex-col justify-center items-center gap-[3rem]">
          {signReq == "" ? (
            <>
              <h1 className="text-2xl font-bold text-center">Welcome to</h1>
              <div className="flex flex-col gap-5 w-fit mx-auto  ">
                <Button
                  icon={<FcGoogle />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Google`}
                />
                <Button
                  icon={<MdFacebook />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With facebook`}
                />
                <Button
                  icon={<AiOutlineMail />}
                  text={`${createUser ? "Sign Up" : "Sign In"} With Email`}
                  click={() =>
                    setSignReq(`${createUser ? "sign-up" : "sign-in"}`)
                  }
                />
              </div>
              <p>
                {createUser ? "Already have an account" : "No Account?"}
                <button
                  onClick={() => setCreateUser((prev) => !prev)}
                  className="text-green-600 hover:text-green-700 font-bold ml-1"
                >
                  {" "}
                  {createUser ? "Sign In" : "Create one"}
                </button>
              </p>
            </>
          ) : signReq == "sign-in" ? (
            <SignIn setSignReq={setSignReq} />
          ) : signReq == "sign-up" ? (
            <SignUp setSignReq={setSignReq} />
          ) : null}
          <p className="md:w-[30rem] mx-auto text-center text-sm mb-[3rem]">
            Click “Sign In” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </section>
    </Modal>
  );
}

export default Auth;

const Button = ({ icon, text, click }) => {
  return (
    <button
      onClick={click}
      className=" flex sm:w-[20rem]  items-center gap-10 border border-black
         px-3 py-2 rounded-full"
    >
      {icon}
      {text}
    </button>
  );
};

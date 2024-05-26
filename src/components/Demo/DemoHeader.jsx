import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nav } from "../../data";
import Auth from "./auth/Auth";
import { useBlogContext } from "../../context/Context";

function DemoHeader() {
  const { currentUser } = useBlogContext();
  const [active, setActive] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const scrooll = () => {
      scrollY > 150 ? setActive(true) : setActive(false);
    };

    window.addEventListener("scroll", scrooll);
  }, []);

  return (
    <header
      className={`border-b border-black sticky top-0 z-50 ${
        active ? "bg-white" : "bg-banner"
      } transition-all duration-500`}
    >
      <div className="size h-[70px] flex items-center justify-between ">
        <Link to={"/"}>
          <img
            className="h-[2.5rem]"
            src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex justify-center gap-5">
            {nav.map((link, i) => (
              <Link key={i} to={link.path}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setModal(true)}
              className="hidden sm:flex items-center ga-5"
            >
              Sign in
            </button>
            <Auth modal={modal} setModal={setModal} />
          </div>

          <button
            onClick={() => setModal(true)}
            className={`"bg-black text-white rounded-full px-3 p-2 text:sm font-medium ${
              active ? "bg-green-600" : "bg-black"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default DemoHeader;

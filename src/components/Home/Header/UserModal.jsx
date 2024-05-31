import React from "react";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";
import { useBlogContext } from "../../../context/Context";
import { Link } from "react-router-dom";
import { secretEmail } from "../../../utils/Helper";

function UserModal({setModal}) {
  const { currentUser } = useBlogContext();
  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${currentUser?.uid}`,
    },
    {
      title: "Library",
      icon: <MdOutlineLocalLibrary />,
      path: "/library",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <HiOutlineChartBar />,
      path: "/stats",
    },
  ];

  return (
    <section className=" w-[18rem]  top-[140%] right-0 p-6 z-50 absolute bg-white shadows rounded-md text-grey-500">
       <Link
            to={"/write"}
            className="flex md:hidden items-center gap-1 text-gray-500"
          >
            <span className="text-3xl">
              <LiaEditSolid />
            </span>
            <span className="text-xl mt-2"> Write</span>
          </Link>
          <div className="flex flex-col  gap-4 border-b border-gray-300 pb-5 ">
{userModal.map((link,i)=>(
    <Link 
    onClick={()=> setModal(false)}
    className="flex items-center gap-2 text-xl text-gray-500
    hover:text-black/70"
    key={i} to={link.path}>
<span className="text-2xl">{link.icon}</span>
<h2 className="text-md">{link.title}</h2>
    </Link>
     
))}

          </div>
          <button 
     className="flex flex-col pt-5 cursor-pointer hover:text-black/70"
     >
       sign out
<span className="text-sm">{secretEmail(currentUser?.email)}</span>

     </button>
    </section>
  );
}

export default UserModal;

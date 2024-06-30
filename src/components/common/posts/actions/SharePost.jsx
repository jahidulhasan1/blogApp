import React, { useState } from "react";
import DropDown from "../../../../utils/DropDown";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  BiLink,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { CiShare1 } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function SharePost() {
  const [showDrop, setShowDrop] = useState(false);

  const path = window.location.href;
  console.log(path);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast.success("copied");
      setShowDrop(false);
    } catch (error) {
      toast.error(error.message);
      setShowDrop(false); 
    }
  };

  return (
    <div className="relative flex items-center">
      <button onClick={() => setShowDrop(!showDrop)}>
        {<CiShare1 className="text-2xl " />}
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop}>
        <Button title="Copy link" click={copyLink} icon={<BiLink />} />

        <TwitterShareButton url={path}>
          <Button title="Share On Twitter" icon={<BiLogoTwitter />} />
        </TwitterShareButton>
        <FacebookShareButton url={path}>
          <Button title="Share On Facebook" icon={<BiLogoFacebookCircle />} />
        </FacebookShareButton>
        <LinkedinShareButton url={path}>
          <Button title="Share On LinkedIn" icon={<BiLogoLinkedinSquare />} />
        </LinkedinShareButton>
      </DropDown>
    </div>
  );
}

export default SharePost;

const Button = ({ click, title, icon }) => {
  return (
    <button
      className="p-2 hover:bg-gray-200 hover:text-black/80 w-full text-sm text-left
    flex items-center gap-2 cursor-pointer text-gray-500"
      onClick={click}
    >
      {" "}
      {icon} {title}
    </button>
  );
};

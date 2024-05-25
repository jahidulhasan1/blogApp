import React from "react";
import DemoBanner from "./DemoBanner";
import Trending from "./Trending";
import Post from "../common/posts/Post";
import Dsicover from "./Dsicover";
function Demo() {
  return (
    <>
      <DemoBanner />
      <Trending />
      <div className="size py-7 flex flex-col-reverse sm:flex-row border  gap-[7rem]">
        <div className="flex-[1.5]">
          <Post />
        </div>
        <div className="flex-[1.5] relative">
          <Dsicover />
        </div>
      </div>
    </>
  );
}

export default Demo;

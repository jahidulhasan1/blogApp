import React from "react";
import Follow from "./userTofllow/Follow";
import Post from "../common/posts/Post";

function Home() {
  return (
    <section className="size flex gap-[5rem] relative ">
      <div className="flex-[2]  py-10 mb-[4rem] border">
        <Post />
      </div>
      <div className="hidden md:inline-block md:w-[21rem] p-7 border-l border-gray-300 ">
        <h3>who to follow</h3>
        <Follow />
      </div>
    </section>
  );
}

export default Home;

import React from "react";

import Loading from "../../loading/Loading";
import PostCard from "./PostCard";
import { useBlogContext } from "../../../context/Context";

function Post() {
  const { postData, postLoading } = useBlogContext();
  console.log(postData);
  return (
    <section>
      {postLoading ? (
        <Loading />
      ) : (
        postData && postData.map((post, i) => <PostCard post={post} key={i} />)
      )}
    </section>
  );
}

export default Post;

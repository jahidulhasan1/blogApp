import React from "react";

import Loading from "../../loading/Loading";
import PostCard from "./PostCard";
import { useBlogContext } from "../../../context/Context";
import useFetch from "../../Hooks/useFetch";

function Post() {
  const { postLoading } = useBlogContext();
  const { data } = useFetch("posts");
  return (
    <section>
      {postLoading ? (
        <Loading />
      ) : (
        data && data.map((post, i) => <PostCard post={post} key={i} />)
      )}
    </section>
  );
}

export default Post;

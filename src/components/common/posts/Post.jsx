import React from "react";
import useFetch from "../../Hooks/useFetch";
import Loading from "../../loading/Loading";
import PostCard from "./PostCard";

function Post() {
  const { data, loading } = useFetch("posts");

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        data.map((post, i) => <PostCard post={post} key={i} />)
      )}
    </section>
  );
}

export default Post;

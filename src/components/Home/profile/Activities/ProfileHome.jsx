import React from "react";
import useFetch from "../../../Hooks/useFetch";
import PostsCard from "../../../common/posts/PostCard";
import Loading from "../../../loading/Loading";
import { useBlogContext } from "../../../../context/Context";

function ProfileHome({getData}) {
  const { data, loading } = useFetch("posts");
  console.log(getData);
  const { currentUser } = useBlogContext();

  const userPost =
    data && data?.filter((post) => post.userId === getData?.userId);
  return (
    <>
      {userPost.length === 0 ? (
        <p className="text-gray-500">
          <span className="capitalize">{getData?.name}</span>
          has no post
        </p>
      ) : loading ? (
        <Loading />
      ) : (
        userPost.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </>
  );
}

export default ProfileHome;

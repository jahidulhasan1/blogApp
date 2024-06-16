import React from "react";
import useFetch from "../../../Hooks/useFetch";
import PostsCard from "../../../common/posts/PostCard";
import Loading from "../../../loading/Loading";
import { useBlogContext } from "../../../../context/Context";

function ProfileHome({ getuser }) {
  const { data, loading } = useFetch("posts");

  const { currentUser } = useBlogContext();

  const userPost =
    data && data?.filter((post) => post.userId === currentUser?.uid);
  return (
    <>
      {userPost.length === 0 ? (
        <p className="text-gray-500">
          <span className="capitalize">{currentUser?.displayName}</span>
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

import React from "react";
import useFetch from "../../../Hooks/useFetch";
import PostsCard from "../../../common/posts/PostCard";
import Loading from "../../../loading/Loading";
import { useBlogContext } from "../../../../context/Context";

function ProfileHome({getData}) {

  const { postLoading,currentUser,postData } = useBlogContext();

  const userPost =
  postData && postData?.filter((post) => post.userId === getData?.userId);
  return (
    <>
      {userPost.length === 0 ? (
        <p className="text-gray-500">
          <span className="capitalize">{getData?.name}</span>
          has no post
        </p>
      ) : postLoading ? (
        <Loading />
      ) : (
        userPost.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </>
  );
}

export default ProfileHome;

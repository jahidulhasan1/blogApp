import React, { useMemo, useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import PostsCard from "./PostCard";

const RecomendedPost = React.memo(function RecomendedPost({
  post: singlePost,
}) {
  const { data: allPosts } = useFetch("posts");
  const [relatedPosts, setRelatedPosts] = useState([]);

  const memoizedRelatedPosts = useMemo(() => {
    if (!allPosts || !singlePost) return [];

    const postTags = singlePost.tags;
    const relatedPosts = allPosts.filter((blogPost) => {
      return (
        blogPost.id !== singlePost.id &&
        blogPost.tags.some((tag) => postTags?.includes(tag))
      );
    });

    const sortedRelatedPosts = relatedPosts.sort(() => Math.random() * -0.5);
    const minRecommendation = 4;
    const slicedPosts = sortedRelatedPosts.slice(0, minRecommendation);

    return slicedPosts;
  }, [allPosts, singlePost]);

  useEffect(() => {
    setRelatedPosts(memoizedRelatedPosts);
  }, [memoizedRelatedPosts]);
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem] ">
      <h2 className="font-bold  text-3xl mb-5">Recommended Posts</h2>
      {relatedPosts.length === 0 ? (
        <p>Not Recommendation posts based on your preference</p>
      ) : (
        relatedPosts.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </div>
  );
});

export default RecomendedPost;

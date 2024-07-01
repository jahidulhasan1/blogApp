import React from "react";
import useFetch from "../../Hooks/useFetch";
import { useLocation } from "react-router-dom";
import PostCard from "../../common/posts/PostCard";

function FilterPost() {
  const { data } = useFetch("posts");
  const { pathname } = useLocation();
  console.log(data);
  const path = pathname.split("/")[2].toLocaleLowerCase();
  console.log(path);
  const filtered = data && data.filter((x) => x.tags.includes(path));

  console.log(filtered);
  return (
    <section>
      {data && filtered.map((x, i) => <PostCard post={x} key={i} />)}
    </section>
  );
}

export default FilterPost;

import React from "react";
import useSingleFetch from "../../Hooks/useSingleFetch";
import { useBlogContext } from "../../../context/Context";
import Loading from "../../loading/Loading";
import PostsCard from "../../common/posts/PostCard";
import { BiLock } from "react-icons/bi";

function ProfileList({ getData }) {
  const { currentUser } = useBlogContext();
  // posts save
  const { data,loading } = useSingleFetch("users", currentUser?.uid, "savePost");
 
  return (
    <>
      {currentUser?.uid === getData?.userId ? (
        <>
          <div className="flex flex-col gap-[2rem] mb-[2rem]">
            {
            data.length === 0 && (<p>
              <span className="capitalize mr-1">
              {getData?.name} - has no saved posts
              </span>
            </p>
            )}

            {loading ? <Loading/>: (data.map((post,i)=> <PostsCard post={post} key={i}/>))}
          </div>
        </>
      ) : (
        <LockedList userName = {getData?.name} />
      )}
    </>
  );
}

export default ProfileList;

const LockedList = ({name}) => {
  return <>
 <div className="flex flex-col justify-center items-center gap-[3rem] text-center">
      <p>
        <span className="capitalize">{name} saved posts are private</span>
      </p>
      <span className="text-[10rem] text-gray-500">
        <BiLock />
      </span>
    </div>
  </>;
};

import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { useBlogContext } from "../../../context/Context";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
function Follow() {
  const { data } = useFetch("users");
  const { currentUser, allUser } = useBlogContext();
  console.log(allUser);
  const [count, setCount] = useState(1);
  const users =
    allUser &&
    allUser.slice(0, 2).filter((x) => x?.userId !== currentUser?.uid);
  const navigate = useNavigate();
  const loadMoreFn = () => {
    setCount((prev) => users.length < allUser.length && prev + 1);
  };
  return (
    <>
      {allUser &&
        users?.map((user, i) => (
          <div key={i} className="flex items-start gap-2 my-4 cursor-pointer ">
            <div
              onClick={() => navigate("/profile" + "/" + user.userId)}
              className="flex-1 flex items-center gap-2 cursor-pointer "
            >
              <img
                className="w-[3rem] h-[3rem] object-cover rounded-full "
                src={
                  user.imgUrl
                    ? user.imgUrl
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt="userImage"
              />
              <div className="flex flex-col ga-1">
                <h3 className="font-bold capitalize">@{user.username}</h3>
                <span className="leading-4 text-gray-300 text-sm line-clamp-2">
                  {user.bio || "user has no Bio"}
                </span>
              </div>
            </div>

            <FollowButton userId={user.userId} />
          </div>
        ))}
      {users?.length > count + 1 ? (
        <button onClick={loadMoreFn}>Load More</button>
      ) : (
        ""
      )}
    </>
  );
}

export default Follow;

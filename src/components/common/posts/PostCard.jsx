// import { readTime } from "../../../utils/helper";
// import moment from "moment/moment";

// import Actions from "./Actions/Actions";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../../context/Context";
import { readTime } from "../../../utils/Helper";
import moment from "moment/moment";
import SavePost from "./SavePost";
import useFetch from "../../Hooks/useFetch";
import Action from "./actions/Action";

const PostsCard = ( {post} ) => {
  const { title, desc, created, postImg, userId, name } = post;
  const { currentUser } = useBlogContext();
  const { data } = useFetch("users");
  const userData = data && data.find((x) => x.userId === userId);
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/post/${post.id}`)}
        className="flex  flex-col sm:flex-row gap-4 cursor-pointer "
      >
        <div className="flex-[2.5]">
          <p className="pb-2 font-semibold capitalize">{userData?.name}</p>
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 text-gray-500 line-clamp-2 leading-5"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>

        <div className="flex-[1] ml-5">
          <img
            src={postImg}
            alt="postImg"
            className="w-[53rem] h-[8rem] object-cover"
          />
        </div>
      </div>

      <div className="flex items-center border justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
          {readTime({ __html: desc })} min read .
          {moment(created).format("MMM DD")}
        </p>
        <div className="flex justify-center items-center gap-[1rem]">
          <SavePost post={post} userData={userData} />
          {currentUser?.uid === userId && <Action post={post} />}
        </div>
      </div>
    </>
  );
};

export default PostsCard;

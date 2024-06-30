import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import FollowButton from "../../Home/userTofllow/FollowButton";
import Loading from "../../loading/Loading";
import { useBlogContext } from "../../../context/Context";
import { readTime } from "../../../utils/Helper";
import moment from "moment/moment";
import Like from "./actions/Like";
import CommentBtn from "./actions/CommentBtn";
import SavePost from "./SavePost";
import Action from "./actions/Action";
import SharePost from "./actions/SharePost";
import RecomendedPost from "./RecomendedPost";
import Comments from "../comments/Comments";
function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  const [showRecomendation, setShowRecomendation] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postRef = doc(db, "posts", postId);
        const getPost = await getDoc(postRef);
        if (getPost.exists()) {
          const postData = getPost.data();

          if (postData?.userId) {
            const userRef = doc(db, "users", postData.userId);

            const user = await getDoc(userRef);
            console.log(user.data());
            if (user?.exists()) {
              const { created, ...rest } = user.data();
              console.log(rest);
              setPost({ ...postData, ...rest, id: postId });
              setLoading(false);
              setShowRecomendation(true);
            }
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchData();
  }, [postId, post?.userId]);

  const { title, desc, postImg, name, created, imgUrl, userId } = post;
  const { currentUser } = useBlogContext();
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem] ">
            {name && (
              <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
            )}
            <div className="flex items-center gap-2 py-[2rem]">
              <img
                onClick={() => navigate(`/profile/${userId}`)}
                className="w-[3rem] h-[3rem] rounded-full object-cover cursor-pointer "
                src={
                  post.userImg
                    ? post.userImg
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s"
                }
                alt="userImage"
              />
              <div>
                <div className="capitalize">
                  <span>{name} </span>
                  {currentUser && currentUser?.uid !== userId && (
                    <FollowButton userId={userId} />
                  )}
                </div>

                <p className="text-sm text-gray-500 ">
                  {" "}
                  {readTime({ html: desc })} min read
                  <span className="ml-1">{moment(created).fromNow()}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between border-b border-t border-gray-200">
              <div className="flex items-center gap-5 py-[0.5rem]">
                <Like postId={postId} />
                <CommentBtn  />
              </div>
              <div className="flex items-center pt-2 gap-5 ">
                {post && <SavePost post={post} />}
                <SharePost />
                {currentUser.uid === userId && <Action />}
              </div>
            </div>
            <div className="mt-[3rem]">
              {postImg && (
                <img
                  className="w-full h-[400px] object-cover"
                  src={postImg}
                  alt="post-img"
                />
              )}
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </div>
          </section>

          {post && showRecomendation && <RecomendedPost post={post} />}
          <Comments postId={postId} />
        </>
      )}
    </>
  );
}

export default SinglePost;

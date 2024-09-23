import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token); // Adjusted to state.token

  // Fetch all posts
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts for a specific user (for profile pages)
  const getUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  // useEffect to fetch posts based on the context (profile or general feed)
  useEffect(() => {
    if (token) {
      if (isProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    }
  }, [token, isProfile, userId]); // Dependencies to refetch when token, isProfile, or userId changes

  return (
    <>
      {posts?.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <div>No posts available</div>
      )}
    </>
  );
};

export default PostsWidget;

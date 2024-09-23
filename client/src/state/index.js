import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // You can persist mode as well if you want to
  user: null,    // The user object is stored in localStorage
  token: null,   // The token is stored in localStorage
  posts: [],     // Posts are not persisted in localStorage
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user; // Store the user data from the payload
      state.token = action.payload.token; // Store the JWT token from the payload
    },
    setLogout: (state) => {
      state.user = null; // Clear user information on logout
      state.token = null; // Clear token on logout
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends; // Update the friends list
      } else {
        console.error("User is not logged in, can't update friends.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts; // Update the list of posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Export the actions
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Export the reducer as default
export default authSlice.reducer;

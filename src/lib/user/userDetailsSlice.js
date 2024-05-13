const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImg: "",
  profileImgLink: "",
  githubLink: "",
  youtubeLink: "",
  linkedinLink: "",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.profileImgLink = action.payload.profileImgLink;
    },
    updateUserLinks: (state, action) => {
      state.githubLink = action.payload.githubLink;
      state.youtubeLink = action.payload.youtubeLink;
      state.linkedinLink = action.payload.linkedinLink;
    },
  },
});

export const { updateUserData } = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;

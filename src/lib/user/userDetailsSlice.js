const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImgLink: "",
  profileImg: "",
  userLinks: [
    { platform: "github", link: "", id: 0 },
    { platform: "youtube", link: "", id: 1 },
    { platform: "linkedin", link: "", id: 2 },
  ],
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
      state.userLinks.find((l) => l.platform === "github").link =
        action.payload.githubLink;
      state.userLinks.find((l) => l.platform === "youtube").link =
        action.payload.youtubeLink;
      state.userLinks.find((l) => l.platform === "linkedin").link =
        action.payload.linkedinLink;
    },
  },
});

export const { updateUserData, updateUserLinks } = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;

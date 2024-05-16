"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import {
  updateUserData,
  updateUserLinks,
} from "../lib/user/userDetailsSlice.js";

function loadUserDataFromLocalStorage() {
  if (typeof window === "undefined") {
    return;
  }
  const userData = localStorage.getItem("userDetails");
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
}
export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // loading user data from local storage and sending it to the store once the app starts, so that when the user visits the profile details page he can see his previously saved data.
    const returnedUserData = loadUserDataFromLocalStorage();
    if (returnedUserData) {
      storeRef.current.dispatch(updateUserData(returnedUserData));
      storeRef.current.dispatch(
        updateUserLinks({
          githubLink: returnedUserData.githubLink,
          youtubeLink: returnedUserData.youtubeLink,
          linkedinLink: returnedUserData.linkedinLink,
        })
      );
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

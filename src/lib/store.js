"use client";
import { configureStore } from "@reduxjs/toolkit";
import { userDetailsReducer } from "./user/userDetailsSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userDetailsReducer,
    },
  });
};

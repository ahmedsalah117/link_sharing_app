"use client";
import React, { useEffect, useState } from "react";
import IphonePreview from "../../../components/profileDetailsComponents/IphonePreview.jsx";
import ProfileDetailsForm from "../../../components/profileDetailsComponents/ProfileDetailsForm.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { generatePreviewImgLink } from "../../../lib/utils.js";
import { updateUserData } from "../../../lib/user/userDetailsSlice.js";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks.js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation.js";
import ProfileLinksForm from "../../../components/profileDetailsComponents/ProfileLinksForm.jsx";

const UserLinksPage = () => {
  const router = useRouter();
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const schema = yup
    .object({
      githubLink: yup.string().required().min(3).max(50),
      youtubeLink: yup.string().required().min(3).max(50),
      linkedinLink: yup.string().required(),
    })
    .required();
  const { control, handleSubmit, watch, formState, register, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      githubLink: userDetailsState.firstName,
      youtubeLink: userDetailsState.lastName,
      linkedinLink: userDetailsState.email,
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const liveUserDetailsValues = watch();
  //Preparing the preview image link from the user uploaded image.
  async function prepareProfileImg() {
    if (
      liveUserDetailsValues?.profileImg &&
      liveUserDetailsValues?.profileImg?.length > 0
    ) {
      const previewImage = await generatePreviewImgLink(
        liveUserDetailsValues.profileImg[0]
      );
      setProfileImgPreview(previewImage);
    }
  }

  //** watching the values of all inputs while the user is typing */

  function handleProfileDetailsSubmit(data) {
    const userData = {
      githubLink: data.firstName,
      youtubeLink: data.lastName,
      linkedInLink: data.email,
    };
    // saving the user data to localStorage.
    localStorage.setItem("userDetails", JSON.stringify(userData));
    // updating the store with the user data, so that the data is globally available.
    dispatch(updateUserData(userData));
    toast.success("Profile details updated successfully");
    router.push("/");
  }

  return (
    <section className="md:flex md:flex-row flex-col justify-between gap-4 py-6 overflow-y-auto">
      <IphonePreview liveUserDetailsValues={liveUserDetailsValues} />
      <form
        onSubmit={handleSubmit(handleProfileDetailsSubmit)}
        className="flex-grow"
      >
        <ProfileLinksForm
          control={control}
          isSubmitting={formState.isSubmitting}
          errors={formState.errors}
          register={register}
          profileImgPreview={profileImgPreview}
        />
      </form>
    </section>
  );
};

export default UserLinksPage;

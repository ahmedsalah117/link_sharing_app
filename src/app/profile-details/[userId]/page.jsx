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

const UserDetailsPage = () => {
  const router = useRouter();
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const schema = yup
    .object({
      firstName: yup.string().required().min(3).max(50),
      lastName: yup.string().required().min(3).max(50),
      email: yup
        .string()
        .email()
        .required()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
      profileImg: yup
        .mixed()
        .notRequired()
        .test({
          name: "isValidImg",
          skipAbsent: true,
          test: (value, ctx) => {
            if (
              value &&
              value.length > 0 &&
              !value[0]?.type?.startsWith("image/")
            ) {
              return ctx.createError({
                message: "Please upload a valid image",
              });
            }
            //not allowing any image above 3 MBs
            if (value && value.length > 0 && value[0].size > 3145728) {
              return ctx.createError({ message: "Image is too large" });
            }
            return true;
          },
        }),
    })
    .required();
  const { control, handleSubmit, watch, formState, register, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userDetailsState.firstName,
      lastName: userDetailsState.lastName,
      email: userDetailsState.email,
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const liveUserDetailsValues = watch();
  //Preparing the preview image link from the user uploaded image.
  async function prepareProfileImg() {
    //not allowing any image above 3 MBs
    if (
      liveUserDetailsValues?.profileImg &&
      liveUserDetailsValues?.profileImg?.length > 0 &&
      liveUserDetailsValues?.profileImg[0]?.size > 3145728
    ) {
      return;
    }
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
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      profileImgLink: profileImgPreview || userDetailsState.profileImgLink,
    };
    // saving the user data to localStorage.
    localStorage.setItem("userDetails", JSON.stringify(userData));
    // updating the store with the user data, so that the data is globally available.
    dispatch(updateUserData(userData));
    toast.success("Profile details updated successfully");
    router.push("/");
  }

  useEffect(() => {
    if (
      liveUserDetailsValues?.profileImg &&
      liveUserDetailsValues?.profileImg[0]?.type?.startsWith("image/")
    ) {
      prepareProfileImg();
    }
  }, [liveUserDetailsValues.profileImg]);

  return (
    <section className="flex lg:flex-row flex-col w-full items-center lg:items-stretch lg:justify-between gap-4 py-6 overflow-y-auto">
      <div className="lg:min-w-[29%] w-full">
        <IphonePreview
          liveUserDetailsValues={liveUserDetailsValues}
          profileImgPreview={profileImgPreview}
        />
      </div>
      <form
        onSubmit={handleSubmit(handleProfileDetailsSubmit)}
        className="w-full lg:max-w-[70%]"
      >
        <ProfileDetailsForm
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

export default UserDetailsPage;

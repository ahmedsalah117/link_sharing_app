"use client";
import React, { useEffect, useState } from "react";
import IphonePreview from "../../../components/profileDetailsComponents/IphonePreview.jsx";
import ProfileDetailsForm from "../../../components/profileDetailsComponents/ProfileDetailsForm.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserDetailsPage = () => {
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const schema = yup
    .object({
      firstName: yup.string().required().min(3).max(50),
      lastName: yup.string().required().min(3).max(50),
      email: yup
        .string()
        .email()
        .required()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
    })
    .required();
  const { control, handleSubmit, watch, formState, register } = useForm({
    resolver: yupResolver(schema),
  });

  function handleProfileDetailsSubmit(data) {
    console.log(data);
    // Generating the preview image link from the image file
    generatePreviewImgLink(data.profileImg[0]);
  }

  //** watching the values of all inputs while the user is typing */
  const userDetailsValues = watch();

  return (
    <section className="md:flex md:flex-row flex-col justify-between gap-4 md:h-lvh py-6">
      <IphonePreview
        userDetailsValues={userDetailsValues}
        profileImgPreview={profileImgPreview}
      />
      <form
        onSubmit={handleSubmit(handleProfileDetailsSubmit)}
        className="flex-grow"
      >
        <ProfileDetailsForm
          control={control}
          isSubmitting={formState.isSubmitting}
          errors={formState.errors}
          register={register}
        />
      </form>
    </section>
  );
};

export default UserDetailsPage;

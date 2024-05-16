"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input.jsx";
import Image from "next/image.js";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Controller } from "react-hook-form";
import { generatePreviewImgLink } from "../../lib/utils.js";
import { useAppSelector } from "../../lib/hooks.js";
const ProfileDetailsForm = ({
  control,
  isSubmitting,
  errors,
  register,
  profileImgPreview,
}) => {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  return (
    <section className="bg-white h-full rounded-lg shadow-md">
      <div className="  py-8 px-4 sm:px-8 relative">
        <div>
          <h3 className="text-black font-bold text-xl mb-2">Profile Details</h3>
          <p>Add your details to create a personal touch to your profile.</p>
        </div>
        <div className="mt-6 rounded-md">
          <div className="bg-tertiaryColor p-6 flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center rounded-lg">
            <p className="font-[600] ">Profile Picture</p>
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full  sm:w-[60%]">
              {/* Image uploader component */}
              <div className="h-[160px] w-[160px]  flex flex-col gap-1 ">
                <label
                  htmlFor="profileImageUploader"
                  className="w-full h-full block cursor-pointer rounded-lg relative overflow-hidden"
                >
                  <Input
                    name="profileImg"
                    {...register("profileImg", {
                      validate: (value) => {
                        if (value && value.length > 0) {
                          return value[0]?.type?.startsWith("image/")
                            ? ""
                            : "Please upload a valid image file.";
                        }
                      },
                    })}
                    type="file"
                    id="profileImageUploader"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .bmp"
                  />

                  <Image
                    alt="user-image"
                    src={
                      profileImgPreview ||
                      userDetailsState.profileImgLink ||
                      "/assets/profile-replacement.png"
                    }
                    fill
                    className="mb-4 object-cover"
                  />

                  <div className="bg-[#00000080] opacity-0 hover:opacity-100 duration-300 text-white flex flex-col justify-center items-center absolute inset-0 rounded-lg">
                    <ImageIcon />
                    <p className="text-sm">Change Image</p>
                  </div>
                </label>
                <p className="text-red-500 text-xs mt pl-1">
                  {errors?.profileImg?.message}
                </p>
              </div>
              {/* image upload recommendation text */}
              <p className="text-xs w-full text-center sm:text-left sm:w-auto ">
                Image must be below 1024x1024px.
                <br className="hidden sm:inline" />
                Use PNG, JPG, or BMP format.
              </p>
            </div>
          </div>
        </div>
        {/* first name , last name , email inputs. */}
        <div className="bg-tertiaryColor p-3  sm:p-6 my-4 flex flex-col gap-3 rounded-lg ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label
              className="block min-w-[200px] text-left"
              htmlFor="firstName"
            >
              First Name*
            </label>
            <div className="flex flex-col gap-2 w-full sm:w-[60%]">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={"firstName"}
                    type="text"
                    placeholder="First name"
                    className=" focus-visible:ring-main focus-visible:ring-2 mt-2 sm:mt-0  duration-200  "
                  />
                )}
              />
              <p className="text-red-500 text-xs mt pl-1">
                {errors?.firstName?.message &&
                  errors?.firstName?.message.replace("firstName", "First Name")}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label className="block min-w-[200px] text-left" htmlFor="lastName">
              Last Name*
            </label>
            <div className="flex flex-col gap-2 w-full sm:w-[60%]">
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    {...field}
                    id={"lastName"}
                    type="text"
                    placeholder="Last Name"
                    className=" focus-visible:ring-main focus-visible:ring-2 mt-2 sm:mt-0  duration-200  "
                  />
                )}
              />
              <p className="text-red-500 text-xs mt pl-1">
                {errors?.lastName?.message &&
                  errors?.lastName?.message.replace("lastName", "Last Name")}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label className="block min-w-[200px] text-left" htmlFor="email">
              Email*
            </label>
            <div className="flex flex-col gap-2 w-full sm:w-[60%]">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    id={"email"}
                    type="email"
                    placeholder="Email"
                    className=" focus-visible:ring-main focus-visible:ring-2 mt-2 sm:mt-0  duration-200  "
                  />
                )}
              />
              <p className="text-red-500 text-xs mt pl-1">
                {errors?.email?.type === "matches" ||
                errors?.email?.type === "email"
                  ? "Please enter a valid email address"
                  : errors?.email?.message.replace("email", "Email")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:w-auto flex justify-end py-3 md:py-6 px-8 md:border-t border-textPrimary ">
        <Button className="btn-primary" type="submit">
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default ProfileDetailsForm;

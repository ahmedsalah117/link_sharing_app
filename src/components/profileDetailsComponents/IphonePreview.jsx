"use client";
import Image from "next/image.js";
import React, { useEffect, useState } from "react";
import SocialLink from "./SocialLink.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
import { generatePreviewImgLink } from "../../lib/utils.js";
import { useAppSelector } from "../../lib/hooks.js";
const IphonePreview = ({
  githubLink,
  youtubeLink,
  linkedinLink,
  liveUserDetailsValues,
  profileImgPreview,
}) => {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  console.log(userDetailsState, "userDetailsState in Iphone preview");
  return (
    <div className="bg-white py-8 w-full md:w-[45%] rounded-lg flex justify-center items-center shadow-md">
      <div className="relative overflow-hidden">
        <Image
          src={"/assets/iphonePreview/iphone.svg"}
          width={250}
          height={250}
        />
        {/* Profile image , name , email previews */}
        <div className="w-full flex flex-col items-center mb-6 gap-2 absolute left-[50%] top-[12%] translate-x-[-50%]">
          {/* Profile Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden relative">
            {/* Here I am first checking if the user uploaded a pic already, if not i am checking if we have an old photo of the user in our store, if not this means the user never uploaded a photo, so I am displaying a profile image demo */}
            <Image
              src={
                profileImgPreview ||
                userDetailsState.profileImgLink ||
                "/assets/profile-replacement.png"
              }
              className="w-full h-full object-cover"
              fill
            />
          </div>
          {/* first + last name */}
          <div className="w-full text-clip overflow-hidden text-center px-3">
            <h3 className="font-bold overflow-hidden text-black text-clip text-lg">
              {liveUserDetailsValues?.firstName} &nbsp;
              {liveUserDetailsValues?.lastName}
            </h3>
          </div>
          <div className="">
            <p className="text-textPrimary text-sm">
              {liveUserDetailsValues?.email}
            </p>
          </div>
        </div>
        {/* Social links preview */}
        <div className=" flex flex-col gap-2 w-full px-8 absolute left-[50%] top-[50%] translate-x-[-50%]">
          <SocialLink
            linkType={"github"}
            Icon={<Github size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
          >
            {githubLink || "Github"}
          </SocialLink>
          <SocialLink
            linkType={"youtube"}
            Icon={<Youtube size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
          >
            {youtubeLink || "Youtube"}
          </SocialLink>
          <SocialLink
            linkType={"linkedin"}
            Icon={<Linkedin size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
          >
            {linkedinLink || "Linkedin"}
          </SocialLink>
        </div>
      </div>
    </div>
  );
};

export default IphonePreview;

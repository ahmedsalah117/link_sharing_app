"use client";
import Image from "next/image.js";
import React, { useEffect, useMemo, useState } from "react";
import SocialLink from "./SocialLink.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
import { generatePreviewImgLink } from "../../lib/utils.js";
import { useAppSelector } from "../../lib/hooks.js";
import { usePathname } from "next/navigation.js";
const IphonePreview = ({
  githubLink,
  youtubeLink,
  linkedinLink,
  liveUserDetailsValues,
  profileImgPreview,
}) => {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const [isInLinksForm, setIsInLinksForm] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    if (pathName.includes("links")) {
      setIsInLinksForm(true);
    } else {
      setIsInLinksForm(false);
    }
  }, [pathName]);

  const storedGithubLink = useMemo(() => {
    return userDetailsState.userLinks.find((link) => link.platform === "github")
      .link;
  }, [userDetailsState.userLinks]);
  const storedYoutubeLink = useMemo(() => {
    return userDetailsState.userLinks.find(
      (link) => link.platform === "youtube"
    ).link;
  }, [userDetailsState.userLinks]);
  const storedLinkedinLink = useMemo(() => {
    return userDetailsState.userLinks.find(
      (link) => link.platform === "linkedin"
    ).link;
  }, [userDetailsState.userLinks]);

  return (
    <div className="bg-white py-8 w-full h-full rounded-lg flex justify-center items-center shadow-md">
      <div className="relative overflow-hidden">
        <Image
          alt="user-image"
          src={"/assets/iphonePreview/iphone.svg"}
          width={300}
          height={300}
          className=" h-auto"
          priority={true}
        />
        {/* Profile image , name , email previews */}
        <div className="w-full flex flex-col items-center mb-6 gap-2 absolute left-[50%] top-[12%] translate-x-[-50%] ">
          {/* Profile Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden relative">
            {/* Here I am first checking if the user uploaded a pic already, if not i am checking if we have an old photo of the user in our store, if not this means the user never uploaded a photo, so I am displaying a profile image demo */}
            <Image
              alt="user-image"
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
          <div className="w-full  text-center px-4">
            <h3 className="font-bold  text-black text-lg overflow-hidden text-ellipsis whitespace-nowrap">
              {isInLinksForm
                ? userDetailsState.firstName
                : liveUserDetailsValues?.firstName}{" "}
              &nbsp;
              {isInLinksForm
                ? userDetailsState.lastName
                : liveUserDetailsValues?.lastName}
            </h3>
          </div>
          <div className="w-full px-4 text-center">
            <p className="text-textPrimary text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {isInLinksForm
                ? userDetailsState.email
                : liveUserDetailsValues?.email}
            </p>
          </div>
        </div>
        {/* Social links preview */}
        <div className=" flex flex-col gap-4 w-full px-8 absolute left-[50%] top-[50%] translate-x-[-50%]">
          <SocialLink
            linkType={"github"}
            Icon={<Github size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
            href={isInLinksForm ? githubLink : storedGithubLink}
          >
            {isInLinksForm
              ? githubLink || "Github"
              : storedGithubLink || "Github"}
          </SocialLink>
          <SocialLink
            linkType={"youtube"}
            Icon={<Youtube size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
            href={isInLinksForm ? youtubeLink : storedYoutubeLink}
          >
            {isInLinksForm
              ? youtubeLink || "Youtube"
              : storedYoutubeLink || "Youtube"}
          </SocialLink>
          <SocialLink
            linkType={"linkedin"}
            Icon={<Linkedin size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
            href={isInLinksForm ? linkedinLink : storedLinkedinLink}
          >
            {isInLinksForm
              ? linkedinLink || "Linkedin"
              : storedLinkedinLink || "Linkedin"}
          </SocialLink>
        </div>
      </div>
    </div>
  );
};

export default IphonePreview;

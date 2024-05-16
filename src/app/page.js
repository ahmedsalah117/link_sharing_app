"use client";
import Image from "next/image";
import SocialLink from "../components/profileDetailsComponents/SocialLink.jsx";
import { Github, Youtube, Linkedin, Trash2 } from "lucide-react";
import { updateUserData } from "../lib/user/userDetailsSlice.js";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks.js";
import { Button } from "../components/ui/button.jsx";
export default function Home() {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);

  const githubLink = useMemo(() => {
    return userDetailsState.userLinks.find((link) => link.platform === "github")
      .link;
  }, [userDetailsState.userLinks]);
  const youtubeLink = useMemo(() => {
    return userDetailsState.userLinks.find(
      (link) => link.platform === "youtube"
    ).link;
  }, [userDetailsState.userLinks]);
  const linkedinLink = useMemo(() => {
    return userDetailsState.userLinks.find(
      (link) => link.platform === "linkedin"
    ).link;
  }, [userDetailsState.userLinks]);
  return (
    <section>
      <div className="bg-main rounded-xl sm:rounded-3xl w-full h-[45%] absolute -z-10 -top-5 right-0"></div>
      <div className="bg-white rounded-xl shadow-lg flex px-4 sm:px-6 py-8 absolute top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex-col gap-2 md:gap-4 items-center max-w-[50%] min-w-[70%] min-[350px]:min-w-[50%] xs:min-w-[45%]  sm:min-w-[35%] md:min-w-[300px] overflow-hidden ">
        <div className="flex flex-col items-center mb-6 gap-4">
          {/* Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden relative">
            <Image
              alt="user-image"
              src={
                userDetailsState.profileImgLink ||
                "/assets/profile-replacement.png"
              }
              className="w-full h-full object-cover"
              fill
            />
          </div>
          {/* first + last name */}
          <div>
            <h3 className="font-bold text-black text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
              {userDetailsState.firstName} &nbsp; {userDetailsState.lastName}
            </h3>
          </div>
          <div className="">
            <p className="text-textPrimary overflow-hidden text-ellipsis whitespace-nowrap">
              {userDetailsState.email}
            </p>
          </div>
        </div>
        {/* email */}
        {/* Social links */}
        <div className="flex flex-col gap-4 w-full">
          <SocialLink
            href={githubLink}
            linkType="github"
            Icon={<Github size={16} className="text-white font-bold" />}
          >
            {githubLink || "Github"}
          </SocialLink>
          <SocialLink
            href={youtubeLink}
            linkType="youtube"
            Icon={<Youtube size={16} className="text-white font-bold" />}
          >
            {youtubeLink || "Youtube"}
          </SocialLink>
          <SocialLink
            href={linkedinLink}
            linkType={"linkedin"}
            Icon={<Linkedin size={16} className="text-white font-bold" />}
          >
            {linkedinLink || "LinkedIn"}
          </SocialLink>
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import SocialLink from "../components/profileDetailsComponents/SocialLink.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
import { updateUserData } from "../lib/user/userDetailsSlice.js";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks.js";
export default function Home() {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);

  return (
    <section className=" bg-red-300">
      <div className="bg-main rounded-3xl w-full h-[45%] absolute -z-10 -top-5 right-0"></div>
      <div className="bg-white rounded-xl shadow-lg flex px-12 py-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]   flex-col gap-4 items-center w-[300px] ">
        <div className="flex flex-col items-center mb-6 gap-4">
          {/* Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden relative">
            <Image
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
            <h3 className="font-bold text-black text-2xl">
              {userDetailsState.firstName} &nbsp; {userDetailsState.lastName}
            </h3>
          </div>
          <div className="">
            <p className="text-textPrimary ">{userDetailsState.email}</p>
          </div>
        </div>
        {/* email */}
        {/* Social links */}
        <SocialLink
          linkType="github"
          Icon={<Github size={16} className="text-white font-bold" />}
        >
          {userDetailsState?.githubLink || "Github"}
        </SocialLink>
        <SocialLink
          linkType="youtube"
          Icon={<Youtube size={16} className="text-white font-bold" />}
        >
          {userDetailsState?.youtubeLink || "Youtube"}
        </SocialLink>
        <SocialLink
          linkType={"linkedin"}
          Icon={<Linkedin size={16} className="text-white font-bold" />}
        >
          {userDetailsState?.linkedinLink || "LinkedIn"}
        </SocialLink>
      </div>
    </section>
  );
}

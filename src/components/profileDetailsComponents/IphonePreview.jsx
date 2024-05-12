import Image from "next/image.js";
import React, { useEffect, useState } from "react";
import SocialLink from "../SocialLink.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
import { generatePreviewImgLink } from "../../lib/utils.js";
const IphonePreview = ({
  githubLink = "Github",
  youtubeLink = "Youtube",
  linkedInLink = "Linkedin",
  userDetailsValues,
}) => {
  const [previewProfileImg, setPreviewProfileImg] = useState(null);

  async function prepareProfileImg() {
    if (
      userDetailsValues?.profileImg &&
      userDetailsValues?.profileImg?.length > 0
    ) {
      const previewImage = await generatePreviewImgLink(
        userDetailsValues.profileImg[0]
      );
      setPreviewProfileImg(previewImage);
    }
  }

  useEffect(() => {
    prepareProfileImg();
  }, [userDetailsValues]);
  return (
    <div className="bg-white py-8 w-full md:w-[45%] h-full rounded-lg flex justify-center items-center shadow-md">
      <div className="relative">
        <Image
          src={"/assets/iphonePreview/iphone.svg"}
          width={250}
          height={250}
        />
        {/* Profile image , name , email previews */}
        <div className="w-full flex flex-col items-center mb-6 gap-2 absolute left-[50%] top-[12%] translate-x-[-50%]">
          {/* Profile Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden relative">
            <Image
              src={previewProfileImg || "/assets/profile-replacement.png"}
              className="w-full h-full object-cover"
              fill
            />
          </div>
          {/* first + last name */}
          <div className="">
            <h3 className="font-bold text-black text-lg">
              {userDetailsValues?.firstName} &nbsp;
              {userDetailsValues?.lastName}
            </h3>
          </div>
          <div className="">
            <p className="text-textPrimary text-sm">
              {userDetailsValues?.email}
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
            {githubLink}
          </SocialLink>
          <SocialLink
            linkType={"youtube"}
            Icon={<Youtube size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
          >
            {youtubeLink}
          </SocialLink>
          <SocialLink
            linkType={"linkedin"}
            Icon={<Linkedin size={16} className="text-white font-bold" />}
            className="py-3 px-4 text-sm"
          >
            {linkedInLink}
          </SocialLink>
        </div>
      </div>
    </div>
  );
};

export default IphonePreview;

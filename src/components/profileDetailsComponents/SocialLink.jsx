import Link from "next/link.js";
import React from "react";
import { MoveRight } from "lucide-react";
import toast from "react-hot-toast";
const SocialLink = ({ children, href, Icon, linkType, className }) => {
  return (
    <a
      className={`block w-full shadow-md cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        if (href === "/" || !href) {
          toast.error("You did not add a link for this platform.");
        } else {
          window.open(href, "_blank");
        }
      }}
    >
      <div
        className={`flex justify-between items-center p-2 sm:p-4 rounded-lg duration-100 ${
          linkType === "github"
            ? "bg-black hover:bg-[#333333] hover:text-[#CCCCCC]"
            : linkType === "youtube"
            ? "bg-[#EF383A] hover:bg-[#D33134] hover:text-[#F2F2F2]"
            : "bg-[#2D69FF] hover:bg-[#1E4CBF] hover:text-[#F2F2F2]"
        } ${className} `}
      >
        <div className="flex gap-2 items-center overflow-hidden">
          {Icon && Icon}
          <p className="text-white text-ellipsis overflow-hidden whitespace-nowrap text-xs md:text-base">
            {children}
          </p>
        </div>
        <MoveRight size={16} className="text-white" />
      </div>
    </a>
  );
};

export default SocialLink;

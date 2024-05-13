import Link from "next/link.js";
import React from "react";
import { MoveRight } from "lucide-react";
const SocialLink = ({
  children,
  href = "/",
  Icon,
  linkType,
  className = "",
}) => {
  return (
    <Link href={href} className="block w-full shadow-md">
      <div
        className={`flex justify-between items-center p-4 rounded-lg duration-100 ${
          linkType === "github"
            ? "bg-black hover:bg-[#333333] hover:text-[#CCCCCC]"
            : linkType === "youtube"
            ? "bg-[#EF383A] hover:bg-[#D33134] hover:text-[#F2F2F2]"
            : "bg-[#2D69FF] hover:bg-[#1E4CBF] hover:text-[#F2F2F2]"
        } ${className} `}
      >
        <div className="flex gap-2 items-center">
          {Icon && Icon}
          <p className="text-white">{children}</p>
        </div>
        <MoveRight size={16} className="text-white" />
      </div>
    </Link>
  );
};

export default SocialLink;

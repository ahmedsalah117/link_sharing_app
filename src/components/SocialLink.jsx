import Link from "next/link.js";
import React from "react";
import { MoveRight } from "lucide-react";
const SocialLink = ({ children, href = "/", Icon, linkType }) => {
  return (
    <Link href={href} className="block w-full">
      <div
        className={`flex justify-between items-center p-4 rounded-lg ${
          linkType === "github"
            ? "bg-black"
            : linkType === "youtube"
            ? "bg-[#EF383A]"
            : "bg-[#2D69FF]"
        }  `}
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

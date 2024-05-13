import React from "react";
import { Link2 } from "lucide-react";
const Logo = () => {
  return (
    <div className="flex gap-1  items-center">
      <div className="bg-main rounded-md p-[2px]">
        <Link2 size={18} className="text-white" />
      </div>
      <p className="text-black font-bold text-2xl">devlinks</p>
    </div>
  );
};

export default Logo;

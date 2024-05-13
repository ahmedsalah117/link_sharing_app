import React from "react";
import { Columns2, Link as LinkIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { Input } from "../ui/input.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
const LinkCard = ({ linkNumber, handleRemoveLinkCard, id }) => {
  return (
    <div className="bg-tertiaryColor rounded-lg p-6">
      <div className="flex justify-between items-center">
        <p className="font-bold text-textPrimary flex justify-between items-center gap-3">
          <Columns2 />
          Link #{linkNumber}
        </p>
        <p
          onClick={() => {
            handleRemoveLinkCard(id);
          }}
          className="font-bold text-textPrimary cursor-pointer"
        >
          Remove
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        <div className="w-full ">
          <label className="font-600 block text-textPrimary mb-2">
            Platform
          </label>
          <Select className="w-full ">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Github">
                <Github size={16} className="inline font-bold" /> Github
              </SelectItem>
              <SelectItem value="Youtube">
                <Youtube size={16} className="inline font-bold mr-2" />
                Youtube
              </SelectItem>
              <SelectItem value="Linkedin">
                <Linkedin size={16} className="inline font-bold mr-2 mb-1" />
                Linkedin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className=" font-600 block text-textPrimary mb-1">Link</label>
          <div className="flex gap-2 items-center bg-white px-3">
            <LinkIcon size={16} />
            <Input className="border-none outline-none ring-0 focus-visible:ring-0 focus:border-none focus:outline-none focus-visible:ring-offset-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;

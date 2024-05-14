"use client";
import React, { useEffect, useState } from "react";
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
import { Controller } from "react-hook-form";
const LinkCard = ({
  liveUserLinksValues,
  linkNumber,
  handleRemoveLinkCard,
  id,
  control,
  register,
  errors,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    console.log(selectedPlatform, "the selected platform");
  }, [selectedPlatform]);
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
          <Select
            value={selectedPlatform}
            onValueChange={(value) => {
              setSelectedPlatform(value);
            }}
            className="w-full "
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="github">
                <Github size={16} className="inline font-bold" /> Github
              </SelectItem>
              <SelectItem value="youtube">
                <Youtube size={16} className="inline font-bold mr-2" />
                Youtube
              </SelectItem>
              <SelectItem value="linkedin">
                <Linkedin size={16} className="inline font-bold mr-2 mb-1" />
                Linkedin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <>
            <label className=" font-600 block text-textPrimary mb-1">
              Link
            </label>
            <div className="flex gap-2 items-center bg-white px-3 focus-within:ring-main focus-within:ring-1 rounded-md">
              <LinkIcon size={16} />
              <Controller
                name={`${selectedPlatform}Link`}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-none focus:outline-none "
                    />
                  );
                }}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;

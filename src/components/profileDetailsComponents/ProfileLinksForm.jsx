"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input.jsx";
import Image from "next/image.js";
import { Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Controller } from "react-hook-form";
import { generatePreviewImgLink } from "../../lib/utils.js";
import { useAppSelector } from "../../lib/hooks.js";
import LinkCard from "./LinkCard.jsx";
import toast from "react-hot-toast";
const ProfileLinksForm = ({
  control,
  isSubmitting,
  errors,
  register,
  profileImgPreview,
}) => {
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const [links, setLinks] = useState([
    { id: Math.random() * 15000 },
    { id: Math.random() * 15000 },
  ]);

  /**
   * handles the removal of a link card when the user clicks on the remove button.
   * @param {*} id
   * @returns void
   */
  function handleRemoveLinkCard(id) {
    setLinks((prevState) => {
      return prevState.filter((link) => {
        return link.id !== id;
      });
    });
  }
  return (
    <section className="bg-white rounded-lg  shadow-md">
      <div className="  py-8 px-8 relative ">
        <div>
          <h3 className="text-black font-bold text-xl mb-2">
            Customize your links
          </h3>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world.
          </p>
        </div>

        <div className="mt-4">
          <Button
            type="button"
            className="btn-secondary w-full"
            onClick={() => {
              if (links?.length === 3) {
                toast.error("You can't add more than 3 links!");
                return;
              }
              setLinks((prevState) => {
                return [...prevState, { id: Math.random() * 15000 }];
              });
            }}
          >
            <Plus size={15} /> Add your link
          </Button>
        </div>
        <section className="mt-6 flex flex-col gap-4">
          {links.map((link, index) => {
            return (
              <LinkCard
                key={index + Math.random() * 15000}
                linkNumber={links.findIndex((l) => l.id === link.id) + 1}
                id={link.id}
                handleRemoveLinkCard={handleRemoveLinkCard}
              />
            );
          })}
          {links.length === 0 && (
            <p className="text-textPrimary text-center text-xl">
              You have no links at the moment. Try adding some ☺
            </p>
          )}
        </section>
      </div>
      <div className="w-full mt-4 md:w-auto flex justify-end py-3 md:py-6 px-8 md:border-t border-textPrimary ">
        <Button className="btn-primary" type="submit">
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default ProfileLinksForm;

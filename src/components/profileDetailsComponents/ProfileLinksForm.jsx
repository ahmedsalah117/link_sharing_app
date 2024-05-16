"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input.jsx";
import { Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Controller } from "react-hook-form";
import { Columns2, Link as LinkIcon } from "lucide-react";
import { Github, Youtube, Linkedin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import FormError from "./FormError.jsx";
import toast from "react-hot-toast";
const ProfileLinksForm = ({
  fields,
  append,
  remove,
  control,
  isSubmitting,
  errors,
}) => {
  return (
    <section className="bg-white rounded-lg  shadow-md">
      <div className="px-4  py-8 md:px-8 relative ">
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
              if (fields.length === 3) {
                toast.error("You cannot add more than 3 links!");
                return;
              }
              append({ platform: "", link: "", id: fields.length + 1 });
            }}
          >
            <Plus size={15} /> Add your link
          </Button>
        </div>
        <section className="mt-6 flex flex-col gap-4">
          {/* Handling the cards of each platform... */}
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="bg-tertiaryColor overflow-hidden rounded-lg p-4 sm:p-6"
              >
                <div className="flex w-full justify-between items-center">
                  <p className="sm:font-bold text-xs sm:text-base  text-textPrimary flex justify-between items-center gap-3">
                    <Columns2 />
                    Link #{index + 1}
                  </p>
                  <p
                    onClick={() => {
                      remove(index);
                    }}
                    className="sm:font-bold text-textPrimary cursor-pointer text-xs sm:text-base"
                  >
                    Remove
                  </p>
                </div>
                <div className="flex flex-col gap-5 mt-6">
                  <div className="w-full ">
                    <label className="font-600 block text-textPrimary mb-2">
                      Platform
                    </label>
                    <Controller
                      name={`links.${index}.platform`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            className="w-full "
                          >
                            <SelectTrigger className="w-full focus-visible:ring-main focus:ring-main focus-visible:ring focus:ring-offset-1 focus-visible:ring-offset-1 focus:ring">
                              <SelectValue
                                placeholder={field.value || "Platform"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="github">
                                <Github
                                  size={16}
                                  className="inline font-bold"
                                />{" "}
                                Github
                              </SelectItem>
                              <SelectItem value="youtube">
                                <Youtube
                                  size={16}
                                  className="inline font-bold mr-2"
                                />
                                Youtube
                              </SelectItem>
                              <SelectItem value="linkedin">
                                <Linkedin
                                  size={16}
                                  className="inline font-bold mr-2 mb-1"
                                />
                                Linkedin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                    <FormError>
                      {errors.links && errors?.links[index]?.platform?.message}
                    </FormError>
                  </div>
                  <div>
                    <>
                      <label className=" font-600 block text-textPrimary mb-1">
                        Link
                      </label>
                      <div className="flex gap-2 items-center bg-white px-3 focus-within:ring-main focus-within:ring-1 rounded-md">
                        <LinkIcon size={16} />
                        <Controller
                          name={`links.${index}.link`}
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
                      <FormError>
                        {errors?.links?.root?.type === "unique-platforms"
                          ? ""
                          : errors?.links && errors?.links[index]?.link?.message}
                      </FormError>
                    </>
                  </div>
                </div>
              </div>
            );
          })}
          {fields.length === 0 && (
            <p className="text-textPrimary text-center text-xl">
              You have no links at the moment. Try adding some ☺
            </p>
          )}
        </section>
      </div>
      <div className="w-full mt-4 md:w-auto flex justify-end py-3 md:py-6 px-8 md:border-t border-textPrimary ">
        <Button className="btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default ProfileLinksForm;

"use client";
import React, { useEffect, useMemo, useState } from "react";
import IphonePreview from "../../../components/profileDetailsComponents/IphonePreview.jsx";
import ProfileDetailsForm from "../../../components/profileDetailsComponents/ProfileDetailsForm.jsx";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { generatePreviewImgLink } from "../../../lib/utils.js";
import {
  updateUserData,
  updateUserLinks,
} from "../../../lib/user/userDetailsSlice.js";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks.js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation.js";
import ProfileLinksForm from "../../../components/profileDetailsComponents/ProfileLinksForm.jsx";

const UserLinksPage = () => {
  const router = useRouter();
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const schema = yup
    .object({
      githubLink: yup.string().required(),
      youtubeLink: yup.string().required(),
      linkedinLink: yup.string().required(),
    })
    .required();
  const { control, handleSubmit, watch, formState, register, reset } = useForm({
    defaultValues: {
      links: [{ platform: "github", link: "", id: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "links",
    control,
  });

  const dispatch = useAppDispatch();
  //** watching the values of all inputs while the user is typing */

  const liveUserLinksValues = watch();

  function handleUserLinksSubmit(data) {
    console.log(data, "data of links form.");
    const userLinks = {
      githubLink: data.links.find((l) => l.platform === "github")?.link,
      youtubeLink: data.links.find((l) => l.platform === "youtube")?.link,
      linkedinLink: data.links.find((l) => l.platform === "linkedin")?.link,
    };
    // saving the user data to localStorage.
    localStorage.setItem("userLinks", JSON.stringify(userLinks));
    // updating the store with the user data, so that the data is globally available.
    dispatch(updateUserLinks(userLinks));
    toast.success("Profile links updated successfully");
    router.push("/");
  }

  useEffect(() => {
    console.log(liveUserLinksValues, "from live");
  }, [liveUserLinksValues]);

  return (
    <section className="md:flex md:flex-row flex-col justify-between gap-4 py-6 overflow-y-auto">
      <IphonePreview
        githubLink={
          liveUserLinksValues.links.find((l) => l.platform === "github")?.link
        }
        youtubeLink={
          liveUserLinksValues.links.find((l) => l.platform === "youtube")?.link
        }
        linkedinLink={
          liveUserLinksValues.links.find((l) => l.platform === "linkedin")?.link
        }
      />
      <form
        onSubmit={handleSubmit(handleUserLinksSubmit)}
        className="flex-grow"
      >
        <ProfileLinksForm
          fields={fields}
          append={append}
          remove={remove}
          liveUserLinksValues={liveUserLinksValues}
          control={control}
          isSubmitting={formState.isSubmitting}
          errors={formState.errors}
          register={register}
        />
      </form>
    </section>
  );
};

export default UserLinksPage;

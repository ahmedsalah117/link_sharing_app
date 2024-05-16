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


const platformLinkPatterns = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
  youtube:
    /^https:\/\/(www\.)?youtube\.com\/(c\/|channel\/|user\/)[a-zA-Z0-9_-]+\/?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
};

const UserLinksPage = () => {
  const router = useRouter();
  const userDetailsState = useAppSelector((state) => state.userDetailsReducer);
  const schema = yup
    .object({
      links: yup.array().of(
        yup.object().shape({
          platform: yup.string().required("Platform is required"),
          link: yup.string().when("platform", {
            is: (val) => val !== "",
            then: () =>
              yup
                .string()
                .required("Please add a link")
                .test(
                  "link-format",
                  "Invalid link format",
                  (value, context) => {
                    const selectedPlatform = context.parent.platform;
                    return platformLinkPatterns[selectedPlatform].test(value);
                  }
                ),
          }),
          id: yup.mixed().notRequired(),
        })
      ),
    })
    .required();
  const { control, handleSubmit, watch, formState, register, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      links: userDetailsState.userLinks.filter((link, index) => link.link),
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
    const userDetails = {
      githubLink: data.links.find((l) => l.platform === "github")?.link,
      youtubeLink: data.links.find((l) => l.platform === "youtube")?.link,
      linkedinLink: data.links.find((l) => l.platform === "linkedin")?.link,
      firstName: userDetailsState.firstName,
      lastName: userDetailsState.lastName,
      email: userDetailsState.email,
      profileImgLink: userDetailsState.profileImgLink,
    };
    // saving the user data to localStorage.
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    // updating the store with the user data, so that the data is globally available.
    dispatch(
      updateUserLinks({
        githubLink: userDetails.githubLink,
        youtubeLink: userDetails.youtubeLink,
        linkedinLink: userDetails.linkedinLink,
      })
    );
    toast.success("Profile links updated successfully");
    router.push("/");
  }

  // useEffect(() => {
  //   console.log(liveUserLinksValues, "liveUserLinksValues");
  // }, [liveUserLinksValues]);

  const githubLink = useMemo(
    () =>
      liveUserLinksValues.links.find((l) => l?.platform === "github")?.link ||
      "",
    [liveUserLinksValues]
  );
  const youtubeLink = useMemo(
    () =>
      liveUserLinksValues.links.find((l) => l?.platform === "youtube")?.link ||
      "",
    [liveUserLinksValues]
  );
  const linkedinLink = useMemo(
    () =>
      liveUserLinksValues.links.find((l) => l?.platform === "linkedin")?.link ||
      "",
    [liveUserLinksValues]
  );

  return (
    <section className="md:flex md:flex-row flex-col justify-between gap-4 py-6 overflow-y-auto">
      <IphonePreview
        githubLink={githubLink}
        youtubeLink={youtubeLink}
        linkedinLink={linkedinLink}
      />
      <form
        onSubmit={handleSubmit(handleUserLinksSubmit)}
        className="flex-grow"
      >
        <ProfileLinksForm
          fields={fields}
          append={append}
          remove={remove}
          control={control}
          isSubmitting={formState.isSubmitting}
          errors={formState.errors}
        />
      </form>
    </section>
  );
};

export default UserLinksPage;

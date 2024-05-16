"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import Link from "next/link.js";
import { Link as LinkIcon, AlignJustify, X, CircleUser } from "lucide-react";
import { usePathname } from "next/navigation.js";
import toast from "react-hot-toast";
import { Button } from "../../ui/button.jsx";
const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInHomePage, setIsInHomePage] = useState(false);
  const [copied, setCopied] = useState(false);
  const isActiveLink = `bg-secColor text-main`;

  const handleCopy = () => {
    const fullUrl = window.location.href;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true);
        toast.success("copied to clipboard");
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        setCopied(false);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (pathName === "/") {
      setIsInHomePage(true);
    } else {
      setIsInHomePage(false);
    }
  }, [pathName]);

  useEffect(() => {
    window.addEventListener("click", () => {
      setIsMenuOpen(false);
    });

    return () => {
      window.addEventListener("click", () => {
        setIsMenuOpen(false);
      });
    };
  }, []);

  return (
    <nav className="bg-white py-4 px-5 w-full shadow-md sticky z-50 top-3 left-0 right-0 rounded-lg my-4">
      {/* Desktop design */}
      <div className="hidden sm:flex justify-between items-center">
        {/* Note that I am using the value "1" here as a placeholder for the user id.. */}
        {isInHomePage ? (
          <Link href={`/profile-details/${1}`}>
            <Button className="bg-transparent text-main border-main !border hover:bg-secColor">
              Back to Editor
            </Button>
          </Link>
        ) : (
          <div>
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
        )}

        {isInHomePage ? (
          ""
        ) : (
          <div className="flex gap-2 ">
            {/* Assuming the user id  to be 1 */}
            <Link
              href={`/links/${1}`}
              className={`flex items-center gap-1 hover:bg-secColor hover:text-main font-[600] px-4 py-2 rounded-md duration-100 ${
                pathName.trim().includes("links") ? isActiveLink : ""
              }`}
            >
              <LinkIcon size={16} />
              Links
            </Link>
            <Link
              //**Todo: I am using the value "1" here as a placeholder for the user id... */
              href={`/profile-details/${1}`}
              className={`flex items-center gap-1 font-[600] hover:bg-secColor hover:text-main px-4 py-2 rounded-md duration-100 ${
                pathName.trim().includes("profile-details") ? isActiveLink : ""
              }`}
            >
              <CircleUser size={18} />
              Profile Details
            </Link>
          </div>
        )}
        <div>
          {isInHomePage ? (
            <Button
              onClick={handleCopy}
              className="bg-main text-white hover:bg-[#8A71FF] hover:text-[#2C1F7C]"
            >
              {copied ? "Copied!" : "Share link"}
            </Button>
          ) : (
            <Link href={"/"}>
              <Button className="btn-secondary">Preview</Button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile design */}
      <div className="flex flex-1 sm:hidden relative  z-[100] justify-between items-center">
        <div>
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        {isMenuOpen ? (
          <X
            className="cursor-pointer text-black font-bold"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          />
        ) : (
          <AlignJustify
            className="cursor-pointer text-black font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(true);
            }}
          />
        )}
        <div
          className={`${
            !isMenuOpen ? "hidden" : "flex"
          } p-4 bg-white absolute top-12 shadow-lg  -right-5 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
          <ul
            className="list-none flex flex-col gap-4 items-start justify-end"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <li
              className={`flex gap-2 hover:bg-secColor hover:text-main w-full rounded-md ${
                pathName.trim().includes("links") ? "bg-secColor text-main" : ""
              }`}
            >
              {/* assuming that the user id is 1 */}
              <Link
                href={`/links/${1}`}
                className={`flex items-center gap-1 w-full  font-[600] px-4 py-2 rounded-md duration-100`}
              >
                <LinkIcon size={16} />
                Links
              </Link>
            </li>
            <li
              className={`flex gap-2 hover:bg-secColor hover:text-main w-full rounded-md ${
                pathName.trim().includes("profile-details")
                  ? "bg-secColor text-main"
                  : ""
              }`}
            >
              <Link
                //**Todo: I am using the value "1" here as a placeholder for the user id... */
                href={`/profile-details/${1}`}
                className={`flex items-center gap-1 font-[600] hover:bg-secColor hover:text-main px-4 py-2 rounded-md duration-100 ${
                  pathName.trim().includes("profile-details")
                    ? isActiveLink
                    : ""
                }`}
              >
                <CircleUser size={18} />
                Profile Details
              </Link>
            </li>
            <li className="flex justify-end w-full">
              {isInHomePage ? (
                <Button
                  onClick={handleCopy}
                  className="bg-main text-white hover:bg-[#8A71FF] hover:text-[#2C1F7C]"
                >
                  {copied ? "Copied!" : "Share link"}
                </Button>
              ) : (
                <Link href={"/"}>
                  <Button className="bg-transparent text-main border-main !border hover:bg-secColor">
                    Preview
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

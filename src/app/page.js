import Image from "next/image";
import SocialLink from "../components/SocialLink.jsx";
import { Github, Youtube, Linkedin } from "lucide-react";
export default function Home() {
  return (
    <section className=" bg-red-300">
      <div className="bg-main rounded-3xl w-full h-[45%] absolute -z-10 -top-5 right-0"></div>
      <div className="bg-white rounded-xl shadow-lg flex px-12 py-8 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]   flex-col gap-4 items-center w-[300px] ">
        <div className="flex flex-col items-center mb-6 gap-4">
          {/* Image */}
          <div className="rounded-full border-2 border-main w-[100px] h-[100px] overflow-hidden">
            <Image
              src={"/assets/profile-replacement.png"}
              className="w-full h-full"
              width={50}
              height={50}
            />
          </div>
          {/* first + last name */}
          <div>
            <h3 className="font-bold text-black text-2xl">Ahmed Bahnasy</h3>
          </div>
          <div className="">
            <p className="text-textPrimary ">ahmed@gmail.com</p>
          </div>
        </div>
        {/* email */}
        {/* Social links */}
        <SocialLink
          linkType="github"
          Icon={<Github size={16} className="text-white font-bold" />}
        >
          Github
        </SocialLink>
        <SocialLink
          linkType="youtube"
          Icon={<Youtube size={16} className="text-white font-bold" />}
        >
          Youtube
        </SocialLink>
        <SocialLink
          linkType={"linkedin"}
          Icon={<Linkedin size={16} className="text-white font-bold" />}
        >
          LinkedIn
        </SocialLink>
      </div>
    </section>
  );
}

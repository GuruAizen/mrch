"use client";

import { useRouter } from "next/navigation";
import React from "react";
import notificationIcon from "@/assets/dashboard/header/notificationIcon.png";
import messageicon from "@/assets/dashboard/header/messageIcon.png";
import profileicon from "@/assets/dashboard/header/profileicon.png";
import Image from "next/image";

const Header = () => {
  const userName = "Guru";
  const userRole = "Admin";
  const router = useRouter();
  return (
    <div className="w-full h-20 flex justify-around items-center border-1 ">
      <div className="w-auto h-7  text-[24px] font-nunito text-[#405189] font-bold flex flex-row items-center ">
        MSH Hospital
      </div>
      <div className="w-[62%] overflow-hidden whitespace-nowrap">
        {/* <marquee>[LIVE] MDIndia TPA: Submit all claims only</marquee> */}
        {/* <div className="transform scale-110 rotate-45">Transformed Element</div> */}
        <div className="animate-marquee text-[#0B6177] font-bold inline-block">
          [LIVE] MDIndia TPA: Submit all claims only [LIVE] MDIndia TPA: Submit
          all claims only [LIVE] MDIndia TPA: Submit all claims only
        </div>
      </div>
      <div className="w-auto h-7  flex justify-between items-center gap-3">
        <div className="">
          <Image
            src={notificationIcon}
            alt="Notifications"
            title="Notification "
            className="w-10 h-10"
          />
        </div>
        <div>
          <Image
            src={messageicon}
            alt="Message"
            title="Message Icon "
            className="w-10 h-10"
          />
        </div>
        <div>
          <Image
            src={profileicon}
            alt="Message"
            title="Message Icon "
            className="w-10 h-10"
          />
        </div>
        <div className="flex flex-col h-7 justify-center items-center">
          <div className="font-inter font-bold">{userName}</div>
          <div className="font-inter text-3.5 font-bold text-[#04A7C3]">
            {userRole}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

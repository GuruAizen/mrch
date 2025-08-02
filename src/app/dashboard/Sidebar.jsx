"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/dashboard/sidebar/mysmarthealth.png";
import hospitalIcon from "@/assets/dashboard/sidebar/mysmarthealth.png";
import claimsActiveIcon from "@/assets/dashboard/sidebar/mysmarthealth.png";
import leftArrow from "@/assets/dashboard/sidebar/mysmarthealth.png";
import rightArrow from "@/assets/dashboard/sidebar/mysmarthealth.png";

const dropdownData = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    icon: hospitalIcon,
  },
  {
    id: "appointments",
    title: "Appointments",
    icon: hospitalIcon,
    afterIcon: claimsActiveIcon,
    links: [
      { label: "Dashboard 1", to: "/hospital/dashboard1" },
      { label: "Dashboard 1", to: "/hospital/dashboard1" },
      { label: "Dashboard 1", to: "/hospital/dashboard1" },
      { label: "Dashboard 1", to: "/hospital/dashboard1" },
      { label: "Dashboard 1", to: "/hospital/dashboard1" },
    ],
  },
  {
    id: "doctorSchedule",
    title: "Doctor Schedule",
    icon: hospitalIcon,
    afterIcon: claimsActiveIcon,
    links: [{ label: "Dashboard 1", to: "/hospital/dashboard1" }],
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: hospitalIcon,
    afterIcon: claimsActiveIcon,
    links: [
      { label: "Credit Dashboard", to: "/hospital/dashboard1" },
      { label: "Pre Authorization", to: "/insurance/preauthorization" },
      { label: "Credit Dashboard", to: "/hospital/dashboard1" },
      {
        label: "Discharge",
        subId: "discharge",
        children: [
          { label: "Discharge Summary", to: "/hospital/sub1" },
          { label: "Final Bill", to: "/hospital/sub2" },
          { label: "Pre Discharge Audit", to: "/hospital/sub2" },
        ],
      },
      {
        label: "Email",
        subId: "email",
        children: [
          { label: "Inbox", to: "/hospital/sub1" },
          { label: "Email Config", to: "/hospital/sub2" },
        ],
      },
      {
        label: "Payer",
        subId: "payer",
        children: [
          { label: "Payer", to: "/hospital/sub1" },
          { label: "Payer Config", to: "/hospital/sub2" },
        ],
      },
    ],
  },
  {
    id: "logout",
    title: "Logout",
    path: "/logout",
    icon: hospitalIcon,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);

  const toggleDropdown = (id, path) => {
    if (path) {
      router.push(path);
      setClickedLink(path);
      setOpenDropdown(null); // optionally close dropdown when navigating via title
      setOpenSubmenu(null);
      return;
    }

    setOpenDropdown((prev) => (prev === id ? null : id));
    setOpenSubmenu(null); // close submenu when switching dropdowns
  };

  const toggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  const handleRouteClick = (to) => {
    router.push(to);
    setClickedLink(to);
  };

  return (
    <div className="w-[274px] h-screen bg-[#405189] text-white p-4 hidden lg:block overflow-y-auto no-scrollbar">
      {/* LOGO */}
      <div className="w-[239px] h-[114px] bg-white rounded-xl flex items-center gap-3 px-4 py-2 mb-6 shadow">
        <Image src={logo} alt="Logo" width={60} height={60} />
        <p className="font-semibold text-base text-[#004C72]">
          My Smart Health
        </p>
      </div>

      {/* DROPDOWNS */}
      {dropdownData.map((dropdown) => (
        <div key={dropdown.id} className="mb-4">
          <button
            onClick={() => toggleDropdown(dropdown.id, dropdown.path)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${
              openDropdown === dropdown.id
                ? "bg-white text-[#405189]"
                : "hover:bg-[#2f3a5a]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={
                  openDropdown === dropdown.id
                    ? dropdown.afterIcon || dropdown.icon
                    : dropdown.icon
                }
                alt="Icon"
                width={24}
                height={24}
              />
              <span>{dropdown.title}</span>
            </div>
            {/* Show arrow only if dropdown has links */}
            {dropdown.links && (
              <Image
                src={openDropdown === dropdown.id ? leftArrow : rightArrow}
                alt="Arrow"
                width={20}
                height={20}
              />
            )}
          </button>

          {/* MAIN DROPDOWN LINKS */}
          {openDropdown === dropdown.id && dropdown.links && (
            <ul className="mt-2 ml-6 space-y-2">
              {dropdown.links.map((link, idx) =>
                link.children ? (
                  <div key={idx}>
                    {/* Submenu Button */}
                    <button
                      onClick={() => toggleSubmenu(link.subId)}
                      className="flex items-center justify-between w-full text-sm px-2 py-1 rounded-md bg-[#2f3a5a] hover:bg-[#3a4a6a]"
                    >
                      <span>{link.label}</span>
                      <Image
                        src={
                          openSubmenu === link.subId ? leftArrow : rightArrow
                        }
                        alt="Arrow"
                        width={16}
                        height={16}
                      />
                    </button>

                    {/* Submenu Links */}
                    {openSubmenu === link.subId && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {link.children.map((child, i) => (
                          <li key={i}>
                            <Link
                              href={child.to}
                              onClick={() => setClickedLink(child.to)}
                              className={`block px-3 py-1 rounded-md text-sm ${
                                clickedLink === child.to
                                  ? "bg-white text-[#405189]"
                                  : "hover:bg-[#4b5c89]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <li key={idx}>
                    <button
                      onClick={() => handleRouteClick(link.to)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-1 rounded-md text-sm ${
                        clickedLink === link.to
                          ? "bg-white text-[#405189]"
                          : "hover:bg-[#2f3a5a]"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

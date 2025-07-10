import React from "react";
import { Link, useLocation } from "react-router-dom";

import { GoHome, GoHomeFill } from "react-icons/go";
import { BsCameraReels, BsCameraReelsFill } from "react-icons/bs";
import { IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import {
  IoChatbubbleEllipsesSharp,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import {
  RiAccountCircleFill,
  RiAccountCircleLine,
} from "react-icons/ri";

const tabs = [
  { path: "/", active: <GoHomeFill />, inactive: <GoHome /> },
  { path: "/reels", active: <BsCameraReelsFill />, inactive: <BsCameraReels /> },
  { path: "/search", active: <IoSearchCircle />, inactive: <IoSearchCircleOutline /> },
  { path: "/chat", active: <IoChatbubbleEllipsesSharp />, inactive: <IoChatbubbleEllipsesOutline /> },
  { path: "/account", active: <RiAccountCircleFill />, inactive: <RiAccountCircleLine /> },
];

const NavigationBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 w-full bg-[#0f0f0f]/80 backdrop-blur-md border-t border-[#333] shadow-[0_-2px_10px_rgba(0,0,0,0.5)] z-50">
      <div className="flex justify-around py-3">
        {tabs.map((tab, index) => {
          const isActive = currentPath === tab.path;
          return (
            <Link
              key={index}
              to={tab.path}
              className={`text-2xl flex flex-col items-center transition-all duration-300 ${
                isActive
                  ? "text-yellow-400 drop-shadow-[0_0_4px_rgba(255,255,100,0.3)] scale-105"
                  : "text-gray-500 hover:text-yellow-300"
              }`}
            >
              {isActive ? tab.active : tab.inactive}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;

import React, { useState } from "react";
import SyncButton from "./SyncButton";
import TooltipMenu from "./TooltipMenu";
import "./Component-Styles/Card.css";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";

const Card = ({
  metaData,
  isInPersonalCatalog = true,
  setOpenPopup,
  setPopupData,
}) => {
  const { title, imgUrl, platforms, releaseDate, catalogType, id } = metaData;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative max-w-xs lg:max-w-md cursor-default"
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" text-black bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-row parent">
        <div
          className="
        w-2/5
        flex-shrink-0
        rounded-l-lg
        overflow-hidden
        pr-4
        relative
        cursor-pointer
        hoverToShow"
          onMouseEnter={() => setIsHovered(true)}
        >
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover rounded-inherit"
          />
        </div>

        <div className="w-3/5 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className="text-md text-white mb-0.5 text-left truncate">
                {title}
              </h1>
            </TooltipTrigger>
            <TooltipContent className={""}>{title}</TooltipContent>
          </Tooltip>
          {/* <h2 className="text-md text-white mb-0.5 text-left truncate">
            {title}
          </h2> */}
          <div className="">
            <h4 className="text-sm text-white text-left mb-[0.1rem]">
              Platforms
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {platforms.map((platform, i) => {
                return (
                  <p
                    key={i}
                    className="text-white text-xs bg-blue-400 w-max py-1 px-2 rounded-2xl cursor-default"
                  >
                    {platform}
                  </p>
                );
              })}
            </div>
            <div>
              <p className="text-sm text-white text-left mt-2">
                Release Date: <span>{releaseDate}</span>
              </p>
            </div>
            <div className="w-max mt-1.5">
              {isInPersonalCatalog ? (
                <Button
                  onClick={() => {
                    setOpenPopup(true);
                    setPopupData(metaData);
                    return;
                  }}
                >
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="#a6a7ab"
                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                      />
                    </svg>
                    <span>Upload File</span>
                  </div>
                </Button>
              ) : (
                "Add Button"
              )}
            </div>
          </div>
        </div>
      </div>
      {isHovered && (
        <div className="absolute -bottom-10 left-0 bg-gray-700 rounded-sm z-10 bounce-in-down tooltip before:absolute before:-top-1.5 before:left-[40%] before:border-l-6 before:border-r-6 before:border-b-6 before:border-transparent before:border-b-gray-700">
          <TooltipMenu gameId={id} />
        </div>
      )}
    </div>
  );
};

export default Card;

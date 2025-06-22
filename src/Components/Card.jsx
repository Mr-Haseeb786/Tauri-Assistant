import React, { useState } from "react";
import SyncButton from "./SyncButton";
import TooltipMenu from "./TooltipMenu";
import "./Component-Styles/Card.css";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const Card = ({ metaData, isInPersonalCatalog = true }) => {
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
              <h2 className="text-md text-white mb-0.5 text-left truncate">
                {title}
              </h2>
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
              {platforms.map((platform) => {
                return (
                  <p className="text-white text-xs bg-blue-400 w-max py-1 px-2 rounded-2xl cursor-default">
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
              {isInPersonalCatalog ? <SyncButton /> : "Add Button"}
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

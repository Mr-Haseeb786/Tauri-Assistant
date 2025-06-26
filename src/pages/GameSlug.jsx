import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import singleGame from "../../single_game_data.json";

const RAWG_KEY = import.meta.env.VITE_RAWG_API;

const GameSlug = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        let { data } = await axios.get(
          `https://https://api.rawg.io/api/games/${id}?key=${RAWG_KEY}`
        );

        console.log(data);

        const {
          name,
          description,
          description_raw,
          released,
          background_image,
          platforms,
          parent_platforms,
        } = data;

        let platformNames = null;

        parent_platforms.map((plt) => {
          platformNames.push(plt.platform.name);
        });

        let requirements = "";

        platforms.map((plt) => {
          if (plt.platform.name === "PC") {
            requirements = plt.platform.requirements.minimum;
            return;
          }
          console.log("PLT not found");
        });

        setGameData({
          name,
          description,
          description_raw,
          released,
          background_image,
          platforms: platformNames,
          requirements,
        });

        return;
      } catch (error) {
        console.log(error);
      }
    };

    function callingFn() {
      setIsLoading(true);
      // fetchGameDetails();
      setIsLoading(false);
    }

    callingFn();
  }, []);

  const {
    name,
    description,
    description_raw,
    released,
    background_image,
    platforms,
    parent_platforms,
  } = singleGame;

  let platformNames = [];

  parent_platforms.map((plt) => {
    platformNames.push(plt.platform.name);
  });

  let requirements = "";
  let dateFormat = "";

  if (released) {
    dateFormat = released.split("-").reverse().join("/");
    // dateFormat =
  }

  platforms.map((plt) => {
    if (plt.platform.name === "PC") {
      requirements = plt.requirements.minimum;
      return;
    }
  });

  let test = "Hey there\nHow are you doing";
  let charArry = test.split("\n");

  charArry.map((str) => {
    console.log(str);
  });

  return (
    <section className="h-[40rem] pb-18 scrollbar scrollbar-thumb-gray-700 overflow-y-auto custom-scrollbar">
      <h2 className="text-3xl font-bold text-center mt-4">Game Information</h2>
      <article className="mt-20 flex gap-6 max-w-2xl mx-auto">
        <div className="w-52 h-52">
          <img
            className="object-cover w-full h-full"
            src={background_image}
            alt={name}
          />
        </div>
        <div>
          <h3 className="text-2xl">{name}</h3>
          <div className="h-1 rounded-2xl mt-3 mb-6 w-full accent-bg"></div>
          <h3 className="mt-1">Released: {dateFormat}</h3>
          <h3 className="mt-3">Available Platforms</h3>
          <div className="flex flex-wrap gap-2 mt-2 max-w-60">
            {platformNames.map((plt, i) => {
              return (
                <p
                  key={i}
                  className="text-white text-xs bg-blue-400 w-max py-1 px-2 rounded-2xl cursor-default"
                >
                  {plt}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      <article className="max-w-3xl mx-auto italic font-extralight text-sm text-left mt-12">
        <h2 className="text-xl font-bold not-italic mb-2">Description</h2>
        <p>{description_raw}</p>
      </article>

      <table className="table-auto max-w-xl mt-12 mx-auto border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">
              <h2>Minimum Requirements</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {requirements.split("\n").map((str, index) => {
            if (str.toLowerCase().match("minimum")) {
              return;
            }
            return (
              <tr key={index}>
                <td className="border border-slate-300 p-2">{str}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href="https://google.com" target="_blank">
        Das
      </a>
    </section>
  );
};

export default GameSlug;

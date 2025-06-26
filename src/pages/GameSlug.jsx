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

  return (
    <section className="">
      <article>
        <div>
          <img src="" alt="" />
        </div>
      </article>
      <article></article>
      <article></article>
    </section>
  );
};

export default GameSlug;

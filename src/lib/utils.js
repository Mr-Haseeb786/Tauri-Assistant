import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const RAWG_KEY = import.meta.env.VITE_RAWG_API;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetchGames = async (queryStr) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_KEY}&${queryStr}`
    );

    return {
      response: response.data.results,
      links: {
        nextPage: response.data.next,
        prevPage: response.data.previous,
      },
      error: null,
    };
  } catch (error) {
    return { response: null, error, links: null };
  }
};

export function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayAndOneMonthAgoDates() {
  const today = new Date();

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  if (oneMonthAgo.getDate() !== today.getDate()) {
    oneMonthAgo.setDate(0);
  }

  const formatedDate = formatDate(today);
  const oneMonthFormattedDate = formatDate(oneMonthAgo);

  return { formatedDate, oneMonthFormattedDate };
}

export const formatToShortGamesArray = (arry) => {
  let shortArry = [];

  arry.map((game) => {
    let platformsArry = [];
    if (game.platforms) {
      game.parent_platforms.map((platform) => {
        platformsArry.push(platform.platform.name);
      });
    }

    shortArry.push({
      title: game.name,
      imgUrl: game.background_image,
      platforms: platformsArry,
    });
  });

  return shortArry;
};

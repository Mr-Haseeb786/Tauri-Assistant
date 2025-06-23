import Searchbar from "@/Components/Searchbar";
import React, { useState } from "react";
import gamesList from "../testingData.json";
import { CardContent, Card as SmallCard } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TooltipMenu from "@/Components/TooltipMenu";
import { Button } from "@/Components/ui/button";

const SearchPage = () => {
  const [gameList, setGameList] = useState(gamesList);
  const [isHovered, setIsHovered] = useState(false);
  const testingCarousel = [
    {
      url: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222140/capsule_616x353.jpg?t=1667468479",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/283/682/371/girl-face-background-sweetheart-wallpaper-preview.jpg",
    },
    {
      url: "https://images.gog-statics.com/8355e657a19311b158a3553a154e109199d6991c7791a20c3305af1f84d15ed7.jpg",
    },
  ];

  return (
    <section className="font-nacelle text-center">
      <div className="max-w-md w-4/5 mx-auto mb-4">
        <Searchbar list={gameList} setList={setGameList} />
      </div>
      {/* Carasol */}
      <div className="overflow-y-scroll pb-32 lg:pb-8 h-[38rem]  scrollbar custom-scrollbar scrollbar-thumb-midnight-accent ">
        <div className="max-w-sm md:max-w-xl lg:max-w-4xl w-11/12 mx-auto mt-4 cursor-pointer">
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {testingCarousel.map((game, i) => {
                const src = game.url;
                return (
                  <CarouselItem>
                    <a href={src}>
                      <div
                        className="h-64 md:h-96 w-full bg-transparent overflow-hidden relative group"
                        key={i}
                      >
                        <img
                          className="w-full h-full rounded-lg object-cover"
                          src={src}
                          alt=""
                        />
                        <div className="w-full h-[50%] absolute rounded-b-lg bg-transparent backdrop-blur-lg bottom-0 left-0 translate-y-56 group-hover:translate-y-0 transition-all">
                          <h1>Title</h1>
                          <span></span>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>

          {/* Top Charts */}
          <article className="mt-12 cursor-default">
            <h2 className="mb-4 text-left text-3xl font-bold text-charcoal-accent">
              Top Charts
            </h2>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-4xl"
            >
              <CarouselContent>
                {gameList.map((game, index) => {
                  const { id } = gameList;
                  return (
                    <CarouselItem
                      key={id}
                      className="md:basis-1/2 lg:basis-1/5"
                    >
                      <SmallCardComp item={game} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </article>
        </div>

        {/* Top Charts */}
      </div>
    </section>
  );
};

const SmallCardComp = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, title, imgUrl } = item;
  console.log(item);

  return (
    <div className="p-1">
      <SmallCard
        onMouseLeave={() => setIsHovered(false)}
        className={
          "relative bg-amber-400 h-40 w-full cursor-pointer border border-noir-accent"
        }
      >
        <CardContent className="w-full h-full relative overflow-hidden">
          <div className="w-full h-full">
            <img
              className="object-cover w-full h-full rounded-xl"
              src={imgUrl}
              alt={title}
            />
            <button
              className={
                "transition-all cursor-pointer rounded-sm absolute top-[50%] -translate-y-1/2 left-0 -translate-x-10/12 hover:translate-x-0 size-12 accent-bg hover:bg-transparent "
              }
              onClick={() => setIsHovered(true)}
            >
              <div className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    fill="#74C0FC"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </CardContent>
        {isHovered && (
          <div className="absolute -bottom-0 left-0 bg-gray-700 rounded-sm z-10 bounce-in-down tooltip before:absolute before:-top-1.5 before:left-[40%] before:border-l-6 before:border-r-6 before:border-b-6 before:border-transparent before:border-b-gray-700">
            <TooltipMenu gameId={item.id} />
          </div>
        )}
      </SmallCard>
    </div>
  );
};

export default SearchPage;

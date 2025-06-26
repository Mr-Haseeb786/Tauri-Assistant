import Card from "@/Components/Card";
import Searchbar from "@/Components/Searchbar";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import gamesList from "../testingData.json";
import Popup from "@/Components/Popup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const HomePage = () => {
  const [filterValue, setFilterValue] = useState("all");
  const [gameList, setGameList] = useState(gamesList);
  const [filteredList, setFilteredList] = useState(gamesList);
  const [displayList, setDisplayList] = useState(filteredList);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  const changeFilterValue = (e) => {
    const filter = e.currentTarget.value;
    setFilterValue(filter);

    if (filter != "all") {
      const filtered = gameList.filter((game) => {
        return filter === game.catalogType;
      });

      setDisplayList(filtered);
    } else {
      setDisplayList(gameList);
    }

    return;
  };

  // Api Call to get the metdata of a game,

  return (
    <section className="font-nacelle text-center relative">
      HomePage
      <div className="max-w-full w-4/6 mx-auto my-auto mt-4">
        <Searchbar
          list={filteredList}
          setList={setDisplayList}
          isUniversalSearch={false}
        />
      </div>
      <article className="flex justify-between md:max-w-full lg:w-[55%] w-11/12 mx-auto my-auto mt-8">
        <Button
          className={`filterButtons ${filterValue === "all" ? "selected" : ""}`}
          value="all"
          onClick={(e) => changeFilterValue(e)}
        >
          All
        </Button>
        <Button
          className={`filterButtons ${
            filterValue === "completed" ? "selected" : ""
          }`}
          value="completed"
          onClick={(e) => changeFilterValue(e)}
        >
          Completed
        </Button>
        <Button
          className={`filterButtons ${
            filterValue === "playing" ? "selected" : ""
          } `}
          value="playing"
          onClick={(e) => changeFilterValue(e)}
        >
          Playing
        </Button>
        <Button
          className={`filterButtons ${
            filterValue === "planned" ? "selected" : ""
          }`}
          value="planned"
          onClick={(e) => changeFilterValue(e)}
        >
          Planned
        </Button>
        <Button
          className={`filterButtons ${
            filterValue === "dropped" ? "selected" : ""
          }`}
          value="dropped"
          onClick={(e) => changeFilterValue(e)}
        >
          On-Hold/Dropped
        </Button>
      </article>
      <article className="mt-8 pb-[11rem] gap-y-8 flex flex-wrap gap-5 justify-center justify-items-center overflow-y-auto max-h-[30rem] scrollbar scrollbar-thumb-blue-100 custom-scrollbar">
        {displayList.map((game, index) => {
          return (
            <Card
              key={index}
              metaData={game}
              isInPersonalCatalog={true}
              setOpenPopup={setOpenPopup}
              setPopupData={setPopupData}
            />
          );
        })}
      </article>
      {openPopup && (
        <Popup
          headTitle={"Sync Game File"}
          setIsOpen={setOpenPopup}
          isOpen={openPopup}
        >
          <div className="text-left mt-4">
            <h2 className="font-bold">Game Title: </h2>
            <span>{popupData.title}</span>
          </div>
          {/* <input type="file" className="w-full" /> */}
          <div className="mt-4">
            <h2 className="text-left font-bold">File Options</h2>
            <h3 className="text-left">
              Select the Game's Save Folder Location
            </h3>
          </div>

          <div className="mt-4">
            <h2 className="text-left font-bold">Sync Options</h2>
            <div className="flex gap-6 items-center ">
              <h3 className="text-left">Choose how to sync your game saves</h3>
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer transition-all">
                  <SelectValue placeholder="Select sync mode" />
                </SelectTrigger>
                <SelectContent className={"bg-gray-800 text-white"}>
                  <SelectGroup>
                    <SelectItem
                      value="backup"
                      className={"cursor-pointer hover:bg-gray-700"}
                    >
                      Create backup
                    </SelectItem>
                    <SelectItem
                      value="overwrite"
                      className={"cursor-pointer hover:bg-gray-700"}
                    >
                      Overwrite files
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-10 flex justify-end">
              <Button className={"bg-green-500 text-lg "}>Sync Game</Button>
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
};

export default HomePage;

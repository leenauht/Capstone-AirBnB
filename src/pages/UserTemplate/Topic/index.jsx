import { Carousel } from "antd";
import { listTopic } from "./ListTopic";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Filter from "../../../Icons/Filter";
import { NavLink } from "react-router-dom";

export default function Topic() {
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(listTopic.length / itemsPerSlide);
  const [carouselRef, setCarouselRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const classTW =
    "w-auto flex flex-col justify-center items-center opacity-80 hover:text-black transition duration-300";

  const groupedItems = Array.from({ length: totalSlides }, (_, i) =>
    listTopic.slice(i * itemsPerSlide, (i + 1) * itemsPerSlide)
  );

  const handlePrev = () => {
    if (carouselRef && currentSlide > 0) {
      carouselRef.prev();
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (carouselRef && currentSlide < totalSlides - 1) {
      carouselRef.next();
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="flex">
      <div className="max-w-3xl mx-auto relative">
        {currentSlide > 0 && (
          <button
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 border border-slate-400 w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:bg-gray-400 transition duration-300"
            onClick={handlePrev}
          >
            <LeftOutlined />
          </button>
        )}
        <div className="">
          <Carousel
            dots={false}
            ref={setCarouselRef}
            afterChange={(current) => setCurrentSlide(current)}
            infinite={true}
          >
            {groupedItems.map((group, index) => (
              <div key={index} className="!flex gap-10 justify-between">
                {group.map((item, i) => (
                  <div
                    key={i}
                    className={`${isActive ? "opacity-100" : ""} ${classTW}`}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-6 h-6 object-cover"
                    />
                    <p className="text-center mt-2">{item.title}</p>
                    <p className="w-full h-0.5 bg-black"></p>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        {currentSlide < totalSlides - 1 && (
          <button
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 border border-slate-400 w-8 h-8 bg-white text-black flex items-center justify-center rounded-full shadow-lg hover:bg-gray-400 transition duration-300"
            onClick={handleNext}
          >
            <RightOutlined />
          </button>
        )}
      </div>
      <div>
        <button className="flex justify-center items-center gap-1.5 px-5 py-4 border border-gray-300 rounded-2xl">
          <Filter />
          <span>Bộ lọc</span>
        </button>
      </div>
    </div>
  );
}

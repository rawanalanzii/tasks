import { useState } from "react";
import AnimatedSpiral from "./animated-banners-slider";
export enum DirectionEnum {
  LTR = 'ltr',
  RTL = 'rtl',
}
const SliderImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<DirectionEnum>()

  const images = [
    "https://5alfiat.com/wp-content/uploads/2023/02/%D8%AE%D9%84%D9%81%D9%8A%D8%A7%D8%AA-%D9%83%D9%85%D8%A8%D9%8A%D9%88%D8%AA%D8%B1-4k-%D9%88%D8%B5%D9%88%D8%B1-3-scaled.jpg",
    "https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg",
  ];

  const goToPrevious = () => {
    if (!isAnimating) {
      setAnimationDirection(DirectionEnum.LTR);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsAnimating(false);
      }, 1000);
    }
  };

  const goToNext = () => {
    if (!isAnimating) {
      setAnimationDirection(DirectionEnum.RTL);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-2 rounded-full border border-white text-white hover:bg-white
            hover:text-black py-2 px-4 cursor-pointer transition-colors duration-300 z-10"
        onClick={goToPrevious}
        disabled={isAnimating}
      >
        {"<"}
      </button>
      <div className="relative w-full h-screen flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={` ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        <div
          className={`absolute  flex items-center transition-opacity duration-1000 ${isAnimating ? '' : "hidden"}`}>
          <AnimatedSpiral animationDirection={animationDirection} />
        </div>
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-2 rounded-full border border-white text-white hover:bg-white
          hover:text-black py-2 px-4 cursor-pointer transition-colors duration-300 z-10"
        onClick={goToNext}
        disabled={isAnimating}
      >
        {">"}
      </button>
    </div>
  );
};

export default SliderImages;

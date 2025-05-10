import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Heplogo from "../../assets/HEPlogo.png";
import Untitleddesign1 from "./Untitled design (1).png"
import Untitleddesign2 from "./Untitled design (2).png";
import Untitleddesign3 from "./Untitled design (3).png";
import Untitleddesign4 from "./Untitled design (4).png";

const images = [
  Untitleddesign1,
  Untitleddesign2,
  Untitleddesign3,
  Untitleddesign4,
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (newIndex) => {
    setCurrentIndex((newIndex + images.length) % images.length);
  };

  return (
    <div className="relative w-full md:w-4/5 mx-auto h-[50vh] md:h-[80vh] flex items-center justify-center mt-30 "> 
      <div className="overflow-hidden rounded-lg shadow-lg w-full h-full">
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-300" 
        />
      </div>
      <button 
        onClick={() => updateIndex(currentIndex - 1)} 
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 md:p-3 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowLeft />
      </button>
      <button 
        onClick={() => updateIndex(currentIndex + 1)} 
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 md:p-3 rounded-full text-white hover:bg-opacity-75 transition"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

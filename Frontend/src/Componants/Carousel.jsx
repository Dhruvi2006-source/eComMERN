import { useState, useEffect, useRef } from "react";

const images = [
  "https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg",
  "https://i.pinimg.com/736x/b4/6e/b7/b46eb746f7664083877a42aa05062dfe.jpg",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80",
];

function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-lg shadow-lg overflow-hidden
      h-56 sm:h-72 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem] 3xl:h-[40rem]"
    >
      {/* Slides */}
      <div className="relative h-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out
              ${currentIndex === idx ? "opacity-100 z-20" : "opacity-0 z-10"}`}
          >
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white
          p-2 sm:p-3 rounded-full z-30"
        aria-label="Previous Slide"
      >
        <span className="text-lg sm:text-xl md:text-2xl">&#10094;</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 sm:right-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white
          p-2 sm:p-3 rounded-full z-30"
        aria-label="Next Slide"
      >
        <span className="text-lg sm:text-xl md:text-2xl">&#10095;</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              clearTimeout(timeoutRef.current);
              setCurrentIndex(idx);
            }}
            className={`rounded-full transition-colors
              ${idx === currentIndex ? "bg-indigo-600" : "bg-gray-300"}
              w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerCarousel;

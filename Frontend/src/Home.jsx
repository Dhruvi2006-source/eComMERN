import Cards from "./Componants/Cards";
import BannerCarousel from "./Componants/Carousel";
import ImageGrid from "./Componants/ImageGrid";

const Home = () => {
  return (
    <div>
      <div className="mb-2">
        <BannerCarousel />
      </div>
      <div className="mb-2">
        <ImageGrid />
      </div>
      <Cards />
    </div>
  );
};

export default Home;

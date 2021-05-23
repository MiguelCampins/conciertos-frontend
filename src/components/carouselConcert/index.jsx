import React from "react";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import imageDefault from "../../assets/images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg";
import "./index.css";

const CarouselConcert = ({ imagesUrl }) => {
  if (!imagesUrl) {
    const imagesdefault = [
      imageDefault,
      imageDefault,
      imageDefault,
      imageDefault,
    ].map((image) => ({
      src: image,
    }));
    return (
      <div className="carousel-container">
        <Carousel images={imagesdefault} style={{ height: 400, width: 750 }} />
      </div>
    );
  }

  const images = imagesUrl.map((url) => ({
    src: url,
  }));

  return (
    <div className="carousel-container">
      <Carousel images={images} style={{ height: 400, width: 750 }} />
    </div>
  );
};

export default CarouselConcert;

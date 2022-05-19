import React from "react";
import { Fade } from "react-slideshow-image";
import "../css/Carousel.css";
import banner1 from "../images/banner.jpg";
import banner2 from "../images/banner1.jpg";
import banner3 from "../images/banner3.webp";

function Slide() {
  const images = [banner1, banner2, banner3];
  const zoomInProperties = {
    indicators: true,
  };
  return (
    <div className="slideshow">
      <Fade {...zoomInProperties}>
        <div className="each-fade">
          <div>
            <img className="slideImage" src={images[0]} alt="Slide 1" />
          </div>
        </div>
        <div className="each-fade">
          <div>
            <img className="slideImage" src={images[1]} alt="Slide 2" />
          </div>
        </div>
        <div className="each-fade">
          <div>
            <img className="slideImage" src={images[2]} alt="Slide 3" />
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Slide;

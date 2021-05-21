import React from "react";
import "./HeroSection.css";

function HeroSection({
  lightBg,
  lightText,
  lightTextDesc,
  headline,
  description,
  img,
  alt,
  imgStart,
}) {
  return (
    <div className="hero-top-level-container">
      <div
        className={
          lightBg
            ? "hero-row-container hrc-light"
            : "hero-row-container hrc-dark"
        }
      >
        <div
          className="hrc-content hrc-content-order"
          style={{
            display: "flex",
            flexDirection: imgStart === "start" ? "row-reverse" : "row",
          }}
        >
          <div className="content-col">
            <div className="hero-text-wrapper">
              <h1 className={lightText ? "heading h-light" : "heading h-dark"}>
                {headline}
              </h1>
              <p
                className={
                  lightTextDesc ? "description d-light" : "description d-dark"
                }
              >
                {description}
              </p>
            </div>
          </div>
          <div className="content-col">
            <div className="hero-img-wrapper">
              <img src={img} alt={alt} className="hero-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

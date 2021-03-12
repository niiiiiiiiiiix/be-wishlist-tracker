import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
}) {
  return (
    <>
      <div
        className={lightBg ? "home-hero-section" : "home-hero-section darkBg"}
      >
        <div className="hero-container">
          <div
            className="row home-hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home-hero-text-wrapper">
                <div className="top-line"> {topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? "home-hero-subtitle"
                      : "home-hero-subtitle dark"
                  }
                >
                  {description}
                </p>
                <div className="button-link">
                  <Link to="/sign-up">{buttonLabel}</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="home-hero-img-wrapper">
                <img src={img} alt={alt} className="home-hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

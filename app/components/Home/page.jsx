// src/components/Hero.jsx
import React from "react";
import style from "../styles/hero.module.css";

const Hero = () => {
  return (
    <div className={style["hero-banner"]}>
      <div className={style["hero-overlay"]}>
        <h1>Welcome to Freshmart</h1>
        <p>
          Freshmart brings you the freshest groceries right to your doorstep.
          Enjoy our hand-picked products and special offers every day.
        </p>
        <button className={style["btn-banner"]}>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;

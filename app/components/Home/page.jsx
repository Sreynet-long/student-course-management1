import React from "react";
import style from "../styles/hero.module.css";

const Hero = () => {
  return (
    <div className={style["hero-banner"]}>
      <div className={style["hero-overlay"]}>
        <div className={style["hero-content"]}>
          <div className={style["promo"]}>
            <h1>Get 10% Cashback on Shopping $150</h1>
            <p>Shopping made easy with fresh groceries delivered to your door.</p>
            <button className={style["btn-banner"]}>Learn More</button>
          </div>
          <div className={style["hero-image-container"]}>
            <img
              src="/images/Freshmart-1.jpg"
              alt="Promo"
              className={style["hero-image"]}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Hero;

import React from "react";
import style from "../styles/hero.module.css";

export default function Hero({onLearnMore}){
  return (
    <div className={style["hero-banner"]}>
      <div className={style["hero-overlay"]}>
        <div className={style["hero-content"]}>
          <div className={style["promo"]}>
            <h1>Welcome to our Freshmart 🥰</h1>
            <p>Shopping made easy with fresh groceries delivered to your door.</p>
            <button className={style["btn-banner"]} variant="contained" onClick={onLearnMore} >
              Learn More
            </button>
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



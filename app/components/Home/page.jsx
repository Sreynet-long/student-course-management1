import React from 'react';
import { Button } from '@mui/material';

function Hero() {
  return (
    <section className="container-content">
        <div className="hero-content-wrapper"> 
        <div>
          <div>
            <h1 className='text-one'>We bring the Store to your door</h1><br />
            <p className='text-one'>Experience the convenience of online shopping with FreshMart. Get fresh groceries delivered to your doorstep in no time.</p>
            <Button variant="contained" className='btn-banner'>Shop Now</Button>
          </div>
        </div>
      </div>

      {/* SVG for the bottom curve */}
      {/* <div className="svg-wave-bottom">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="white"/> 
        </svg>
      </div> */}
    </section>
  );
}

export default Hero;
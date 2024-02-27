// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Landing.css';

export default function landing() {
  return (
    <>
    <div className="container">
      <div className="LeftSide">

        
            <img src= "./MIA_at_concert/" />


      </div>
      <div className="MiddleSection">
        <h1>Welcome to our Website</h1>
        <p>At Mic’d Up, our mission is to revolutionize the artistic landscape by providing a unique platform dedicated to community building and exposure. Unlike traditional platforms, Mic’d Up focuses on the seamless attendance of events, fostering meaningful connections among artists, amplifying artistic voices, and shaping a world where every creative mind finds its stage. Elevate your music experience with our app, where creativity meets connectivity!</p>
      </div>

      <div className="RightSide">
          <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    </>
  );
}

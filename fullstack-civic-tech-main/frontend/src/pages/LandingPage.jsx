// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// import React from 'react';
import './Landing.css';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/Login';

export default function landing() {
const [isLogin, setIsLogin] = React.useState(true);

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
            {!isLogin ? <LoginForm/> : <SignUpForm />}
            <button onClick={() => setIsLogin(prevIsSignUp => !prevIsSignUp)}>{isLogin ? 'Login':'SignUp'}</button>
          </div>
        </div>
    </>
    
  );
  
}

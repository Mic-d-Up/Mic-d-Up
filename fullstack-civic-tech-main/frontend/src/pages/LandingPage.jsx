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
            <img src="static-picture.jpg" alt="Static Picture" />
          </div>

          <div className="MiddleSection">
            <h1>Mission statement</h1>
            <h4>Blurb about our aim/goals with the site</h4>
          </div>

          <div className="RightSide">
            {!isLogin ? <LoginForm/> : <SignUpForm />}
            <button onClick={() => setIsLogin(prevIsSignUp => !prevIsSignUp)}>{isLogin ? 'Login':'SignUp'}</button>
          </div>
        </div>
    </>
    
  );
  
}

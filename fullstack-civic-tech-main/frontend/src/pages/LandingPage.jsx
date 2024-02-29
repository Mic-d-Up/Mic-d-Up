import React, { useState, useContext } from 'react';
import './Landing.css';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/Login';
import CurrentUserContext from '../contexts/current-user-context';

export default function Landing() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // const currentUser = useContext; // Replace null with actual currentUser logic

  return (
    <>
    <main className="landingMain">
      <div className="container">
        <div className="imgContainer">
          <figure className="LeftSide">
            <img
              src="https://t4.ftcdn.net/jpg/01/33/55/89/360_F_133558973_IadAyRUHecUYFn7cTICrqb09XGyo7SjF.jpg"
              className="landingImg"
              alt="Landing"
            />
          </figure>
        </div>

        <div className="MiddleSection">
          <h1 className='landingTitle'>Welcome to Mic'd Up</h1>
          <br/>
          <p className="landingMission">Mic’d Up focuses on the seamless attendance of events, fostering meaningful connections among artists, amplifying artistic voices, and shaping a world where every creative mind finds its stage. Elevate your music experience with our app, where creativity meets connectivity!</p>
        </div>

          <div className="RightSide">
            {!isLogin ? <LoginForm/> : <SignUpForm />}
            {!currentUser && <button className="formSwapButton" onClick={() => setIsLogin(prevIsSignUp => !prevIsSignUp)}>{isLogin ? 'Log in':'Register'}</button>}
          </div>
          
      </div>
      </main>
    </>
  );
}

import React, { useState, useContext } from 'react';
import './Landing.css';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/Login';
import CurrentUserContext from '../contexts/current-user-context';

export default function Landing() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <>
    <main className="landingMain">
      <div className="landingContainer">
        <h1 className='landingTitle'>Welcome to <span>Mic'd Up!</span></h1>
        <img className="landingImg"
          alt="Image of female activist musicians"
          src="https://www.udiscovermusic.com/wp-content/uploads/2021/06/LGBTQ-Women-in-Music-1000x600.jpg"
        />
        <br/>
        <p className="landingMission">Where creativity meets connectivity. We focus on amplifying voices, fostering meaningful connections among artists, and shaping a world where every creative mind finds its stage. Elevate the way you experience your favorite artistic activists.</p>
        {/* </div>

          <div className="RightSide"> */}
      </div>
      <div className="landingFormsContainer">
       {!isLogin ? <LoginForm/> : <SignUpForm />}
       {!currentUser && <button className="landingFormSwapButton" onClick={() => setIsLogin(prevIsSignUp => !prevIsSignUp)}>{isLogin ? 'Log in':'Register'}</button>}
       </div>
      </main>
    </>
  );
}

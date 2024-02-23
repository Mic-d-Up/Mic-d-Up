// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Landing.css';
import SignUpForm from '../components/SignUpForm';

export default function landing() {
  return (
    <>
        <div className="container">
          <div className="LeftSide">
            <img src="static-picture.jpg" alt="Static Picture" />
          </div>
          <div className="MiddleSection">
            <h1>Welcome to our Website</h1>
            <p>Description of what the website does...</p>
          </div>

          <div className="RightSide">
            <SignUpForm/>
          </div>
        </div>
    </>
    
  );
  
}

import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiHomeAlt } from 'react-icons/bi';

function WelcomePage(props) {
  const refAnimationInstance = useRef(null);
  const nav = useNavigate();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  };

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeShot]);

  useEffect(() => {
    setInterval(() => {
      fire();
    }, 2500);
  }, []);

  return (
    <div style={{ minHeight: '60vh' }} className="container-fluid d-flex align-items-center">
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <div className="container text-center">
        <h2 className="display-1">Welcome to ShipMarket</h2>
        <h3 className="display-6">
          We're glad you registerd to our site <BsEmojiSmile color="#F4D03F" className="ms-2" />
        </h3>
        <button
          className="btn btn-outline-secondary mt-5"
          onClick={() => {
            nav('/');
          }}>
          Home <BiHomeAlt className="ms-2" />
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;

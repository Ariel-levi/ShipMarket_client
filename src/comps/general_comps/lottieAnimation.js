import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";

function LottieAnimation(props) {
  // install [ npm i lottie-web ]

  // style for the Animation Box
  // add to the css file

  // .box_Animation {
  //     height: 300px;
  //     width: 400px;
  //     margin: 0 auto;
  // }

  let animaRef = useRef(); // for lottie-web animation

  useEffect(() => {
    Lottie.loadAnimation({
      container: animaRef.current,
      loop: true,
      autoplay: true,
      path: "/lottieAnimation/loading.json",
    });
  }, []);

  return (
    <div className="mt-4 box_Animation">
      <div ref={animaRef}></div>
    </div>
  );
}

export default LottieAnimation;

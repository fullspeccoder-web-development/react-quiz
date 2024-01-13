import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { secondsRemaining, tick } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(function () {
      tick();
    }, 1000);

    return () => clearInterval(id);
  }, [tick]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
};

export default Timer;

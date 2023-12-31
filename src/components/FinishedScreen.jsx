import React from "react";
import { determineEmoji } from "../utilities";

const FinishedScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  return (
    <>
      <p className="result">
        <span>{determineEmoji(percentage)}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;

import React from "react";

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;

  const handleClick = () => {
    const action =
      index < numQuestions - 1
        ? { type: "nextQuestion" }
        : { type: "finishQuiz" };
    dispatch(action);
  };

  return (
    <button className="btn btn-ui" onClick={handleClick}>
      {index < numQuestions - 1 ? "Next" : "Finish"}
    </button>
  );
};

export default NextButton;

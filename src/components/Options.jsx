import React from "react";

const Options = ({ question, dispatch, answer }) => {
  const { options } = question;

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((answer, ind) => (
        <button
          className={`btn btn-option ${ind === answer ? "answer" : ""} ${
            hasAnswered
              ? ind === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={ind}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: ind })}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Options;

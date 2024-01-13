import { useQuiz } from "../context/QuizContext";

const NextButton = ({ numQuestions }) => {
  const { nextQuestion, finishQuiz, answer, index } = useQuiz();
  if (answer === null) return null;

  const handleClick = () => {
    index < numQuestions - 1 ? nextQuestion() : finishQuiz();
  };

  return (
    <button className="btn btn-ui" onClick={handleClick}>
      {index < numQuestions - 1 ? "Next" : "Finish"}
    </button>
  );
};

export default NextButton;

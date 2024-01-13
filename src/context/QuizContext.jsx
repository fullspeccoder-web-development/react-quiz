import { createContext, useContext, useReducer } from "react";

export const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "answerClick":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function startQuiz() {
    dispatch({ type: "startQuiz" });
  }

  function answerClick(id) {
    dispatch({ type: "answerClick", payload: id });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finishQuiz() {
    dispatch({ type: "finishQuiz" });
  }

  function restartQuiz() {
    dispatch({ type: "restartQuiz" });
  }

  function tick() {
    dispatch({ type: "tick" });
  }

  const providerValue = {
    ...state,
    startQuiz,
    answerClick,
    nextQuestion,
    finishQuiz,
    restartQuiz,
    tick,
  };

  return (
    <QuizContext.Provider value={providerValue}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("context does not exist");
  return context;
};

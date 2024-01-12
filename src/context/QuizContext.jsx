import { createContext, useContext } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("context does not exist");
  return context;
};

import { useReducer } from "react";

const COUNTER_TYPES = {
  DECREMENT: "DEC",
  INCREMENT: "INC",
  SET_COUNT: "SET_COUNT",
  SET_STEP: "SET_STEP",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case COUNTER_TYPES.DECREMENT:
      return { ...state, count: state.count - 1 };
    case COUNTER_TYPES.INCREMENT:
      return { ...state, count: state.count + 1 };
    case COUNTER_TYPES.SET_COUNT:
      return { ...state, count: action.payload };
    case COUNTER_TYPES.SET_STEP:
      return { ...state, step: action.payload };
    case COUNTER_TYPES.RESET:
      return { ...state, count: 0, step: 1 };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: COUNTER_TYPES.DECREMENT });
  };

  const inc = function () {
    dispatch({ type: COUNTER_TYPES.INCREMENT });
  };

  const defineCount = function (e) {
    dispatch({
      type: COUNTER_TYPES.SET_COUNT,
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    dispatch({ type: COUNTER_TYPES.SET_STEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: COUNTER_TYPES.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

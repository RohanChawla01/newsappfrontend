import { types } from "../constants";

const initialState = {
  currentNews: {},
};

const reducer = (
  state = initialState,
  action: { type: string, payload: any }
) => {
  switch (action.type) {
    case types.SET_CURRENT_NEWS_DATA:
      return {
        ...state,
        currentNews: action.payload,
      };

    default:
      throw new Error("Action not found");
  }
};

export { initialState, types, reducer };

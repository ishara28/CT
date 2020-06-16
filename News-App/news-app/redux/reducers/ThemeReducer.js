import { SET_THEME } from "../actions/ThemeTypes";

const initialState = {
  color: "red",
  counter: 3,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        color: action.color,
      };
    
    default:
      return state;
  }
};

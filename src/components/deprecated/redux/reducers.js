import { SET_ALBUMS_TITLES } from "./actions";

const initialState = {
  words: "",
};

function wordsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS_TITLES:
      return { ...state, words: action.payload };
    default:
      return state;
  }
}

export default wordsReducer;

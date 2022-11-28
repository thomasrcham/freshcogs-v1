import { SET_ALBUMS_TITLES } from "./actions";

const initialState = {
  title: "",
};

function albumTitleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS_TITLES:
      return { ...state, title: action.payload };
    default:
      return state;
  }
}

export default albumTitleReducer;

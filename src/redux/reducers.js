import SET_ALBUMS from "./actions";

const initialState = {
  title: "",
};

function albumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, album: action.payload };
    default:
      return state;
  }
}

export default albumReducer;

import SET_ALBUMS from "../../redux/actions";

const initialState = {
  title: "words",
};

function albumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, title: action.albumTitle };
    default:
      return state;
  }
}

export default albumReducer;

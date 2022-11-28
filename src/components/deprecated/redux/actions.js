export const SET_ALBUMS_TITLES = "SET_ALBUMS_TITLES";

export const setAlbumTitle = (words) => (dispatch) => {
  dispatch({
    type: SET_ALBUMS_TITLES,
    payload: words,
  });
};

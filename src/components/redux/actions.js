export const SET_ALBUMS_TITLES = "SET_ALBUMS_TITLES";

export const setAlbumTitle = (title) => (dispatch) => {
  dispatch({
    type: SET_ALBUMS_TITLES,
    payload: title,
  });
};

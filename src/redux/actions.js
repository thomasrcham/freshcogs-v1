export const SET_ALBUMS = "SET_ALBUMS";

export const setAlbums = (albumsStore) => (dispatch) => {
  dispatch({
    type: SET_ALBUMS,
    payload: albumsStore,
  });
};

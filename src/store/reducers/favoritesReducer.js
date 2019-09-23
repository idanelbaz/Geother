import types from "../types";

export default function
  postsReducer(state = { favorites:[], currFavorite:null }, action) {
  switch (action.type) {
    case types.GET_FAVORITES:
      return { ...state, favorites: action.data };
    case types.GET_FAVORITE_BY_ID:
      return { ...state, currFavorite: action.data };
    default:
      return state;
  }
}
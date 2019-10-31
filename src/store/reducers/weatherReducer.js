import types from "../types";

export default function
  usersReducer(state = { currCityWeather: null, userLoc: null, celsius: true }, action) {
  switch (action.type) {
    case types.GET_CURR_WEATHER_BY_SEARCH:
      return { ...state, currCityWeather: action.data };
    case types.GET_USER_LOC:
      return { ...state, userLoc: action.data };
    case types.CHANGE_TEMPERATURE:
      return { ...state, celsius: !state.celsius };
    default:
      return state;
  }
}
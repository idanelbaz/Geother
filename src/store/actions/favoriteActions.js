import types from "../types";
import favoriteService from "../../services/favoriteService";


export const getFavorites = () => {
    return async (dispatch) => {
        try {
            const response = await favoriteService.getAllFavorites();
            await dispatch({ type: types.GET_FAVORITES, data: response });
        }
        catch (err) {
            throw err;
        }
    };
};

export const addFavorite = (key, cityName, countryName, currWeather) => {
    return async (dispatch) => {
        try {
            await favoriteService.addToFavorites(key, cityName, countryName, currWeather);
        }
        catch (err) {
            throw err;
        }
    };
};

export const removeFavorite = (favoriteKey) => {
    return async (dispatch) => {
        try {
            var response = await favoriteService.removeFromFavorites(favoriteKey);
            await dispatch({ type: types.GET_FAVORITES, data: response });
        }
        catch (err) {
            throw err;
        }
    };
};

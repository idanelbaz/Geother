import types from "../types";
import weatherService from "../../services/weatherService";



export const searchBy = (txt) => {
    return async (dispatch) => {
        try { 
            const resAutoComplete = await weatherService.getAutoComplete(txt)
            const resCurrWeather = await weatherService.getCurrWeather(resAutoComplete.Key)
            const resFiveDays =  await weatherService.getFiveDaysForcast(resAutoComplete.Key)
            const currCityWeather = {
                key: resAutoComplete.Key,
                cityName: resAutoComplete.LocalizedName,
                countryName: resAutoComplete.Country.ID,
                fiveDaysForcast: resFiveDays.DailyForecasts,
                cityWeather: resCurrWeather,
            }
            if(currCityWeather.cityWeather[0].WeatherIcon<=9)
             currCityWeather.cityWeather[0].WeatherIcon = "0" + currCityWeather.cityWeather[0].WeatherIcon 
            dispatch({ type: types.GET_CURR_WEATHER_BY_SEARCH, data: currCityWeather })
            
        }
        catch (err) {
            throw err
        } 
           
    }
};

export const getUserLoc = () => { 
    return async (dispatch) => {
        try { 
            const res = await weatherService.getPosition()
            const userLocDetails = await weatherService.getUserCurrLocWeather(res.coords.latitude, res.coords.longitude) 
            const userLocRes = {lat:res.coords.latitude, lng: res.coords.longitude, cityName: userLocDetails.LocalizedName}
            dispatch({ type: types.GET_USER_LOC, data: userLocRes })
        }
        catch(err){ 
            searchBy('tel aviv');
        }
    }
}

export const changeTemperature = () => { 
    return async (dispatch) => { 
        dispatch({ type: types.CHANGE_TEMPERATURE})
    }
}

import Axios from 'axios';


export default {
getAutoComplete,
getFiveDaysForcast,
getCurrWeather,
getPosition,
getUserCurrLocWeather,
}

const apiKey = 'knnG3d5le7I9GPG1UGpGIpqtXXVXht5D';

async function getAutoComplete(txt) {
    try {
      const res = await Axios.get((`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${txt}`))
      return res.data[0]
    }
    catch (err) {
     throw err;
    }
}

async function getFiveDaysForcast(locKey) {
    try {
      const res = await Axios.get((`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locKey}?apikey=${apiKey}`))
      return res.data
    }
    catch (err) {
     throw err;
    }
}

async function getCurrWeather(locKey) {
    try {
      const res = await Axios.get((`https://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${apiKey}`))
      return res.data
    }
    catch (err) {
     throw err;
    }
}

async function getUserCurrLocWeather(lat,lng) {
  try {
    const res = await Axios.get((`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lng}`))
    return res.data
  }
  catch (err) {
   throw err;
  }
}



function getPosition() {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

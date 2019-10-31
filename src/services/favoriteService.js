import weatherService from './weatherService';

export default {
  getAllFavorites,
  addToFavorites,
  removeFromFavorites,
}


let favorites = [];

async function getAllFavorites() {
  if (!_loadFromStorage('favorites')) return favorites;
  favorites = _loadFromStorage('favorites');
  return _updateFavoritesWeather();
}

function addToFavorites(key, cityName, countryName, currWeather) {
  favorites.push(_createFavorite(key, cityName, countryName, currWeather));
  _saveToStorage('favorites', favorites);
}


function removeFromFavorites(favoriteKey) {
  const favoriteIdx = favorites.findIndex(item => {
    return item.key === favoriteKey;
  })
  favorites.splice(favoriteIdx, 1);
  _saveToStorage('favorites', favorites);
  return favorites;
}


async function _updateFavoritesWeather() {
  try {
    for (var i = 0; i < favorites.length; i++) {
      favorites[i].currWeather = await weatherService.getCurrWeather(favorites[i].key);
    }
    _saveToStorage('favorites', favorites);
    return favorites;
  }
  catch (err) {
    throw err;
  }

}



function _createFavorite(key, cityName, countryName, currWeather) {
  return {
    key: key,
    cityName: cityName,
    countryName: countryName,
    currWeather: currWeather,
    _id: _makeId(),
  }
}


function _makeId(length = 10) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveToStorage(key, value) {
  var strValue = JSON.stringify(value);
  localStorage.setItem(key, strValue);
}

function _loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

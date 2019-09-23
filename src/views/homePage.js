import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {searchBy, getUserLoc} from '../store/actions/weatherActions';
import {getFavorites, addFavorite, removeFavorite} from '../store/actions/favoriteActions';
import DayCard from '../componentes/DayCard';
import {Card,Spinner} from 'react-bootstrap';



class homePage extends Component {

    state = {
        searchByCity: {txt:'' },
        isCityInFavorites: false,
    };

    async componentDidMount() {
        const { dispatch } = this.props
        try {
            await dispatch(getUserLoc())
            await dispatch(getFavorites())
            if(this.props.currCityWeather === null){
                if(this.props.userLoc === null) await dispatch(searchBy('tel aviv'))
                else await dispatch(searchBy(this.props.userLoc.cityName))  
            }
            
            var checkIsCityInFavorites = this.props.favorites.find(item =>{ 
                return item.key === this.props.currCityWeather.key
            })
            if(checkIsCityInFavorites) this.setState((state) => ( { ...state.isCityInFavorites, isCityInFavorites: true } ));
        }catch(err) {
            this.notify('Cannot load page, please try again later')
        }
        
    }

    addToFavorites = async (e) => { 
        e.preventDefault();
        var favoriteToAdd = JSON.parse(JSON.stringify(this.props.currCityWeather));
        const { dispatch } = this.props
        try{ 
              await dispatch(addFavorite(favoriteToAdd.key,favoriteToAdd.cityName,favoriteToAdd.countryName, favoriteToAdd.cityWeather[0]));
              this.setState((state) => ( { ...state.isCityInFavorites, isCityInFavorites: true } ));
              this.notify(favoriteToAdd.cityName +',' + favoriteToAdd.countryName + ' added successfully')
        }catch(err){ 
            this.notify('Cannot add to favorites')
        }
      
    }

    removeFromFavorites = async (e) => { 
        e.preventDefault();  
        const { dispatch } = this.props
        try { 
            await dispatch(removeFavorite(this.props.currCityWeather.key))
            await dispatch(getFavorites())
            this.setState((state) => ( { ...state.isCityInFavorites, isCityInFavorites: false } ));
            this.notify('Removed successfully')
        }catch(err){ 
            this.notify('Cannot remove favorite city')
        }

    }

    handleSearch = async (e) => { 
        const regex = /^[a-zA-Z ]+$/;
        const { name } = e.target;
        const value = e.target.value;
        const chars = e.target.value.split('');
        const char = chars.pop();
        if (!regex.test(char)) { 
            e.target.value = this.state.searchByCity.txt;
            this.notify('Only English letters please');
        }
        else this.setState((state) => ({ searchByCity: { ...state.searchByCity, [name]: value } }));
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        try{ 
            await dispatch(searchBy(this.state.searchByCity.txt))
            var checkIsCityInFavorites = this.props.favorites.find(item =>{ 
            return item.key === this.props.currCityWeather.key
            })
            if(checkIsCityInFavorites) this.setState((state) => ({  ...state.isCityInFavorites, isCityInFavorites: true } ));
            else this.setState((state) => ({  ...state.isCityInFavorites, isCityInFavorites: false } ));
        }catch(err){ 
            this.notify('Cannot find search query, please try again');
        }
       
    };

    notify = (txt) => toast(txt);

    render() {

        const {currCityWeather, celsius} = this.props;
        const {isCityInFavorites} = this.state;
        var weekDays = ['Sunday','Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var todayDay = new Date().getDay();
        
        return (

            <div className="homePage">
                 <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <input className="searchInput" required type="text" name="txt"  onChange={this.handleSearch} placeholder="Search weather in..."></input>
                    <button title="Search for a specific city" className="searchBtn">Search</button> 
                </form>
                { currCityWeather !== null &&
                    <div className="city-container">
                        <Card title={currCityWeather.cityName} className="city-card" style={{ width: 'auto', height: '13rem' }}>
                            <Card.Body>
                                <Card.Title>{currCityWeather.cityName},{currCityWeather.countryName}</Card.Title>
                            </Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">{currCityWeather.cityWeather[0].WeatherText}</Card.Subtitle> 
                            <Card.Img variant="top" src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${currCityWeather.cityWeather[0].WeatherIcon}-s.png`} />
                            {celsius && 
                                <Card.Subtitle className="mb-2 text-muted">{currCityWeather.cityWeather[0].Temperature.Metric.Value}°C</Card.Subtitle> 
                            }
                            {!celsius && 
                                <Card.Subtitle className="mb-2 text-muted">{currCityWeather.cityWeather[0].Temperature.Imperial.Value}°F</Card.Subtitle> 
                            }
                        
                        </Card>
                        {!isCityInFavorites &&
                            <button onClick={this.addToFavorites} className="addBtn">Add to favorites</button> 
                        }
                        {isCityInFavorites&&
                            <button onClick={this.removeFromFavorites} className="removeBtn">Remove from favorites</button> 
                        }
                        
                    </div>
                }
                
                
                { currCityWeather !== null &&
                <div className="fiveDays-container">
                         {
                        currCityWeather.fiveDaysForcast.map((day,idx) =>
                            <DayCard celsius={celsius} weekDay={weekDays[todayDay+idx+1]} day={day} key={day.Date}></DayCard>
                        )}
                </div>
                }
                { currCityWeather === null &&
                    <Spinner animation="grow" variant="info" /> 
                }
                
            </div>
        )
    }
}

const mapStateToProps = ({ weatherReducer, favoritesReducer }) => {
    const { favorites, currFavorite } = favoritesReducer;
    const { currCityWeather, userLoc, celsius } = weatherReducer;

    return {
       favorites,
       currFavorite,
       currCityWeather,
       userLoc,
       celsius
    }
}

export default connect(mapStateToProps)(homePage)
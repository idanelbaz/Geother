import React from 'react';
import {Card,Spinner} from 'react-bootstrap';

const favortieItemCard = props => {

    const removeFavoriteItem=()=> { 
        props.removeFavoriteItem(props.city.key)
    }


    const goToFavoriteItem=()=> { 
        props.goToFavoriteItem(props.city.cityName)
    }



    const {city,celsius}  = props;
    var dayIcon;
    if(city.currWeather[0]){ 
        if(city.currWeather[0].WeatherIcon <=9 )  dayIcon = "0" + city.currWeather[0].WeatherIcon
        else dayIcon = city.currWeather[0].WeatherIcon;
    }
            
    return (
                <div>
                    {city.currWeather[0] &&
                        <Card title={city.cityName} key={city._id} style={{ width: '12rem', height: '19rem' }}>
                            <Card.Body>
                                <Card.Title className="favorite-title" onClick={goToFavoriteItem} >{city.cityName},{city.countryName}</Card.Title>
                            </Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">{city.currWeather[0].WeatherText}</Card.Subtitle>
                            <Card.Img variant="top" src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${dayIcon}-s.png`} />
                            {celsius &&
                                <Card.Subtitle className="mb-2 text-muted">{city.currWeather[0].Temperature.Metric.Value}°C</Card.Subtitle>
                            }
                            {!celsius && 
                                <Card.Subtitle className="mb-2 text-muted">{city.currWeather[0].Temperature.Imperial.Value}°F</Card.Subtitle>
                            }
                            
                            <button onClick={removeFavoriteItem}>Remove</button>
                        </Card>
                    }
                    {!city.currWeather[0] &&
                        <Spinner animation="grow" variant="info" />
                    }
                
                </div>
            
            )
}

export default favortieItemCard;
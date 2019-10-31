import React from 'react';
import { Card } from 'react-bootstrap';

const favortieItemCard = props => {
    const { day, weekDay, celsius } = props;
    const celTempMax = (day.Temperature.Maximum.Value - 32) * 5 / 9;
    const celTempMin = (day.Temperature.Minimum.Value - 32) * 5 / 9;
    let dayIcon;
    if (day.Day.Icon <= 9) dayIcon = "0" + day.Day.Icon;
    else dayIcon = day.Day.Icon;

    return (
        <Card style={{ width: '10rem', height: '12rem' }}>
            <Card.Body title={weekDay}>
                <Card.Title>{weekDay}</Card.Title>
            </Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{day.Day.IconPhrase}</Card.Subtitle>
            <Card.Img variant="top" src={`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${dayIcon}-s.png`} />
            {celsius &&
                <Card.Subtitle className="mb-2 text-muted">{Math.floor(celTempMax)}°C/{Math.floor(celTempMin)}°C</Card.Subtitle>
            }
            {!celsius &&
                <Card.Subtitle className="mb-2 text-muted">{day.Temperature.Maximum.Value}°F/{day.Temperature.Minimum.Value}°F</Card.Subtitle>
            }
        </Card>
    )
}

export default favortieItemCard;
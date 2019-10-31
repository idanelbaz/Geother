import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteCard from '../componentes/FavoriteCard';
import { removeFavorite, getFavorites } from '../store/actions/favoriteActions';
import { searchBy } from '../store/actions/weatherActions';
import { Badge } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class favoritesList extends Component {
    async componentDidMount() {
        const { dispatch } = this.props;
        try {
            await dispatch(getFavorites());
        }
        catch (err) {
            this.notify('Cannot load page, please try again later');
        }
    }

    removeFavoriteItem = async (cityKey) => {
        const { dispatch } = this.props;
        try {
            await dispatch(removeFavorite(cityKey));
            await dispatch(getFavorites());
            this.notify('Removed successfully');
        }
        catch (err) {
            this.notify('Cannot remove city from favorites');
        }
    }

    goToFavoriteItem = async (favoriteItemCityName) => {
        const { dispatch } = this.props;
        try {
            await dispatch(searchBy(favoriteItemCityName));
            this.props.history.push(`/`);
        }
        catch (err) {
            this.notify('Cannot find item, please try again later');
        }
    }


    notify = (txt) => toast(txt);

    render() {
        const { favorites, celsius } = this.props;
        return (
            <div className="favorites-list">
                <ToastContainer />
                {favorites.length > 0 &&
                    <h1><Badge className="badgeTitle" variant="secondary">Your favorites</Badge></h1>
                }
                {favorites.length > 0 &&
                    <div className="favorites-container">
                        {
                            favorites.map((city) =>
                                <FavoriteCard celsius={celsius} key={city._id} city={city} goToFavoriteItem={this.goToFavoriteItem} removeFavoriteItem={this.removeFavoriteItem}></FavoriteCard>
                            )}
                    </div>
                }
                {favorites.length === 0 &&
                    <div className="favorites-container">
                        <h1><Badge className="badgeTitle" variant="secondary">Your favorites are empty</Badge></h1>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ favoritesReducer, weatherReducer }) => {
    const { favorites } = favoritesReducer;
    const { celsius } = weatherReducer
    return {
        favorites,
        celsius
    }
}

export default connect(mapStateToProps)(favoritesList)
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import favoritesList from './views/favoritesList';
import Header from './componentes/header';
import homePage from './views/homePage';
import './App.css';



class App extends Component {
    
    render() {
        return (
            <div className="App">

                <Router>
                    <Header></Header>
                    <Switch>
                        <Route path="/" exact component={homePage}/>
                        <Route path="/favorites" component={favoritesList}/>
                    </Switch>
                </Router>
            </div>
        )

    }

}

export default App;
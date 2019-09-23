import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar,Nav} from 'react-bootstrap';
import {changeTemperature} from '../store/actions/weatherActions';



class header extends Component {

    state = {
        light: true,
    };

    handleThemeChange = () => { 
       this.setState((state) => ( { ...state.light, light: !state.light } ));
       if(this.state.light) { 
        document.body.style.backgroundColor = "#121212";
       }
       else if(!this.state.light) {
        document.body.style.backgroundColor = "#ffffff"; 
       }
    }

    toggleTemperature = () => { 
        const { dispatch } = this.props
        dispatch(changeTemperature())
    }
    

    render() {

        const {light} = this.state;
        const {celsius} = this.props;

        return (
            <div className="header">
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/"><img title="Geother" width="50px" height="50px" alt="logo" src={require('../imgs/icon.png')}></img> Geother</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link title="Home" href="#/">Home</Nav.Link>
                        <Nav.Link title="Favorites" href="#favorites">Favorites</Nav.Link>
                    </Nav>
                    {!light &&
                        <Nav.Link title="Change theme to Light" onClick={this.handleThemeChange}>Light theme</Nav.Link>
                    }
                    {light &&
                        <Nav.Link title="Change theme to Dark" onClick={this.handleThemeChange}>Dark theme</Nav.Link>
                    }
                    {!celsius &&
                        <Nav.Link title="Change to Celsius" onClick={this.toggleTemperature}>Celsius</Nav.Link>
                    }
                    {celsius &&
                        <Nav.Link title="Change to Fahrenheit" onClick={this.toggleTemperature}>Fahrenheit</Nav.Link>
                    }
                </Navbar.Collapse>
                
               </Navbar>
            </div>
        )

    }

}

const mapStateToProps = ({ weatherReducer}) => {
    const { celsius } = weatherReducer;

    return {
       celsius
    }
}

export default connect(mapStateToProps)(header)


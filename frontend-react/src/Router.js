import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// imports components
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Footer from "./components/footer/Footer";
import NotFound from './components/not-found/NotFound';
import Home from './components/home/Home';
import Portatiles from './components/portatiles/Portatiles';
import Monitores from './components/monitores/Monitores';
import Cables from './components/cables/Cables';
import Adaptadores from './components/adaptadores/Adaptadores';
import Create from './components/create/Create';
import Edit from './components/edit/Edit';
import Search from './components/search/Search';

class Router extends Component {
    render() {
        return (
            
            <BrowserRouter>
                <Header></Header>
                <Slider></Slider>
                {/* configure routes */}
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/home" component={Home}></Route>
                    <Route exact path="/portatiles" component={Portatiles}></Route>
                    <Route exact path="/monitores" component={Monitores}></Route>
                    <Route exact path="/cables" component={Cables}></Route>
                    <Route exact path="/adaptadores" component={Adaptadores}></Route>
                    <Route exact path="/home/crear" component={Create}></Route>
                    <Route exact path="/home/editar/:name" component={Edit}></Route>
                    <Route exact path="/buscar/:search" component={Search}></Route>
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return(
                                <Redirect to={'/buscar/'+search}></Redirect>
                            )
                        }
                    }></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                
                <Footer></Footer>
            </BrowserRouter>
        );
    }
}

export default Router;
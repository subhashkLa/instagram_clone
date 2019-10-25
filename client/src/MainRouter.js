import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './Menu';
import About from './core/About';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/home" component={Home} ></Route>
            <Route exact path="/about" component={About} ></Route>
            <Route exact path="/signin" component={Signin} ></Route>
            <Route exact path="/signup" component={Signup} ></Route>
        </Switch>
    </div>
);

export default MainRouter;
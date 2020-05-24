import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import Login from './Login';
import Currencies from './Currencies';
import GroceryList from './GroceryList';

class GroceryApp extends Component {
    render() {
        return ( 
            <>
                { <Router>
                    <>
                        {/* <MenuComponent /> */}
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" exact component={Login} />
                            <AuthenticatedRoute path="/currencies" exact component={Currencies} />
                            <AuthenticatedRoute path="/grocerylist" exact component={GroceryList} />
                        </Switch>
                    </>
                </Router> } 
            </>
        )
    }
}

export default GroceryApp;
import React from 'react';

import Header from './components/Header'
import Transaction from './components/Transaction'
import Balance from './components/Balance'
import Home from './components/Home'
import CreateAccount from './components/CreateAccount'

import { Route, Switch } from 'react-router-dom'

function App() {

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/create' component={CreateAccount} />
        <Route exact path='/transaction' component={Transaction} />
        <Route exact path='/balance' component={Balance} />
      </Switch>
    </div>
  );
}

export default App;

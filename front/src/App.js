import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './Home';
import Quizz from './Quizz';

function App() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/quizz/:id" component={Quizz} />
            <Route path="*" component={() => <p>Page Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default App;

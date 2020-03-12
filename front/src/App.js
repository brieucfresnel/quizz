import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import QuizzManager from './components/QuizzManager';
import NewQuizzForm from './components/NewQuizzForm';

function App() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/quizz/:id" component={QuizzManager} />
            <Route exact={true} path="/new_quizz" component={NewQuizzForm} />

            <Route path="*" component={() => <p>Page Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'

import './assets/css/novoTweet.css'

import App from './App';
import PerfilPage from './pages/PerfilPage'

//Rotas
import {BrowserRouter} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/perfil/:login" component={PerfilPage} />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

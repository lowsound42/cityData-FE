import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './index.css';
import App from './App';
import ShelterTable from './ShelterTable'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Router>
  <Switch>
      <Route path='/' exact component={App}/>
      <Route path='/main' render = {(props) => <ShelterTable {...props} thing='main'/>}/>
      <Route path='/alexandra' render = {(props) => <ShelterTable {...props} thing='alexandra'/>}/>
      <Route path='/weather' render = {(props) => <ShelterTable {...props} thing='weather'/>}/>
      <Route path='/bellwoods' render = {(props) => <ShelterTable {...props} thing='bellwoods'/>}/>
  </Switch>
</Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

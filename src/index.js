import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';


import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import ReadHome from './components/Read/ReadHome.js';


const Root = () => {


  return (

    <Router>



      <Fragment>

        <Switch>

          <Route path="/" exact component={App} />

          <Route path="/read/:_id" component={ReadHome} />
          
        </Switch>

      </Fragment>

    </Router>
  )

};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

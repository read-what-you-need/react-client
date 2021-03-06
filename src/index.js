import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'


import './index.css';
import './twemoji-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import ReadHome from './components/Read/ReadHome.js';
import Bookmark from './components/Bookmark/Bookmark.js';
import Navbar from './components/Nav/Navbar';
import TestNav from './TestNav';
import Faqs from "./components/Faqs";

import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile'




const httpLink = createHttpLink({
  uri: 'http://localhost:4444/graphql',
  credentials: 'same-origin'
});



const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});




const Root = ({ refetch, session }) => {

  return (

    <Router>


      <Navbar session={session} />

      <Switch>



        <Route path="/test" exact component={() => (<TestNav />)} />

        <Route path="/" exact component={() => (<App session={session} />)} />

        <Route path="/read/:_id" render={(props) => <ReadHome session={session} props={props} />} />

        <Route path="/bookmarks" render={() => <Bookmark session={session} />} />

        <Route path="/login" render={() => <Signin refetch={refetch} />} />

        <Route path="/signup" render={() => <Signup refetch={refetch} />} />

        <Route path="/profile" render={() => <Profile session={session} />} />

        <Route path="/faq" component={Faqs} />

      </Switch>





    </Router>



  )

};


const RootWithSession = withSession(Root);



ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <RootWithSession />
    </ApolloHooksProvider>
  </ ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

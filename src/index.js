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
import BookmarkLines from './components/Bookmark/BookmarkLines.js';

import NavResponsive from './components/Nav/NavResponsive';
import TestNav from './TestNav';
import TestHtml from './TestHtml';
import Faqs from "./components/Faqs";

import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile'




const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT
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


     

      <Switch>



        <Route path="/test" exact component={() => (<TestNav />)} />
        
        <Route path="/testhtml/:_id" exact component={(props) => (<TestHtml props={props} />)} />

        <Route path="/" exact component={() => (<App session={session} />)} />

        <Route path="/read/:_id" exact component={(props) => (<TestHtml props={props} />)} />

        

        <Route path="/bookmark" render={(props) => <Bookmark session={session} />}/>

        <Route path="/bookmarks/:user/:uuid/:queryId" render={(props) => <BookmarkLines session={session} props={props} />}/>

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
// to log results (for example: reportWebVitals(////console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React, { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root: {

        width: '100%',
        position: 'fixed',
        bottom: 0,
        borderTop: "0.009px solid #d7d7d7",
        background: "white",
        zIndex: 1000


    },
});


const BottomNavbar = ({ session }) => {



    return (

        <nav>

            {session && session.getCurrentUser ? <BottomNavbarAuth session={session} /> : <BottomNavbarUnAuth />}

        </nav>

    );


}
const BottomNavbarAuth = ({ session }) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        if (newValue === 'feedback') {
            // click link action
            openInNewTab('https://l3sp0taqveu.typeform.com/to/b5guEylp')
         
        }
        history.push(`/${newValue}`);
        setValue(newValue);
    };

    const username = session.getCurrentUser.username;

    return (

        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >

            <BottomNavigationAction label="Feedback" value="search" icon={<FeedbackIcon />} />
            <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
            <BottomNavigationAction label={username} value="profile" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Bookmarks" value="bookmark" icon={<BookmarksOutlinedIcon />} />

        </BottomNavigation>

    );
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

const BottomNavbarUnAuth = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        if (newValue === 'feedback') {
            // click link action
            openInNewTab('https://l3sp0taqveu.typeform.com/to/b5guEylp')
         
        }
        history.push(`/${newValue}`);
        setValue(newValue);
    };

    return (

        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >

            <BottomNavigationAction label="Feedback" value="feedback" icon={<FeedbackIcon />} />
            <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
            <BottomNavigationAction label="Login" value="login" icon={<FavoriteIcon />} />



        </BottomNavigation>

    );
}

export default BottomNavbar;
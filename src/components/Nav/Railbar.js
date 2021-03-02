import React from 'react';
import { Link } from 'react-router-dom';

import Signout from '../Auth/Signout'
import FeedBackFaqAboutItem from './FeedBackFaqAboutItem'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';




import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';


import FeedbackOutlinedIcon from '@material-ui/icons/Feedback';
import HelpOutlinedIcon from '@material-ui/icons/Help';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 220;



const RailBar = ({ session }) => {


    const classes = useStyles();


    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };




    return (


        <div className={classes.root} >


            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >


                <List>
                    {!open && <ListItem button onClick={handleDrawerOpen}>
                        <ListItemIcon color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen} > <MenuIcon /> </ListItemIcon>
                    </ListItem>}

                    {open && <ListItem button onClick={handleDrawerClose}>
                        <ListItemIcon color="inherit"
                            aria-label="open drawer"
                        > {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} </ListItemIcon>
                    </ListItem>}


                </List>


                <Divider />

                {/* check for auth -> true then -> big or small auth nav bar else big or small non auth nav bar */}

                <nav>{session && session.getCurrentUser ? <RailBarAuth session={session} /> : <RailBarUnAuth />}</nav>

            </Drawer>

        </div>

    );
}

const RailBarAuth = ({ session }) => {


    const username = session.getCurrentUser.username;

    const classes = useStyles();

    const [openNestedList, setNestedListOpen] = React.useState(true);

    const handleNestedListClick = () => {
        setNestedListOpen(!openNestedList);
    };


    return (

        <div >
            <List>

                <Link to='/' style={{ textDecoration: 'none', color: 'grey' }} >
                    <ListItem button key={'Home'}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>

                <ListItem button onClick={handleNestedListClick} key={'Your account'}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary={'Your account'} />
                    {openNestedList ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        <Link to='/profile' style={{ textDecoration: 'none', color: 'grey' }} >
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <CloudUploadOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Uploads" />
                            </ListItem>
                        </Link>

                        <Link to='/bookmark' style={{ textDecoration: 'none', color: 'grey' }} >
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <BookmarksOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Bookmarks" />
                            </ListItem>
                        </Link>

                    </List>
                </Collapse>

            </List>
            <Divider />


            <Divider />

            <Signout />

        </div>



    );
}


const RailBarUnAuth = () => {




    return (

        <div>
            <List>
                {[['Home', '/', <HomeIcon />],
                ['Login', '/login', <VpnKeyIcon />]
                ].map((nameRouteIcon, index) => (

                    <Link to={nameRouteIcon[1]} style={{ textDecoration: 'none', color: 'grey' }} >
                        <ListItem button key={nameRouteIcon[0]}>
                            <ListItemIcon>{nameRouteIcon[2]}</ListItemIcon>
                            <ListItemText primary={nameRouteIcon[0]} />
                        </ListItem>
                    </Link>

                ))}
            </List>
            <Divider />

         



        </div>



    );



}









const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        zIndex: theme.zIndex.drawer + 1,
        opacity: 0.6
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: 'inset -7px 0 19px -7px rgba(0,0,0,0.2)',
        backgroundColor: '#f1f1f1',
        opacity: 0.95

    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'inset -7px 0 18px -7px rgba(0,0,0,0.2)',
        backgroundColor: '#f1f1f1',
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    }
}));


export default RailBar;


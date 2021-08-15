import React from 'react';

import Collapse from '@material-ui/core/Collapse';

import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InfoIcon from '@material-ui/icons/Info';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';


import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const FeedBackFaqAboutItem = () => {

    const classes = useStyles();

    const [openNestedList, setNestedListOpen] = React.useState(false);

    const handleNestedListClick = () => {
        setNestedListOpen(!openNestedList);
    };

    const feedBack = () => {
        return (
            <a target="blank"

                style={{ textDecoration: 'none', color: 'grey' }}

                href="https://forms.gle/3kC9Rz6piAHptxS6A">Feedback</a>
        )
    }


    return (
        <List>

            <ListItem button onClick={handleNestedListClick} key={'More'}>
                <ListItemIcon><ContactSupportIcon /></ListItemIcon>
                <ListItemText primary={'More'} />
                {openNestedList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>



                    <a target="blank"

                        style={{ textDecoration: 'none', color: 'grey' }}

                        href="https://forms.gle/3kC9Rz6piAHptxS6A"><ListItem button onClick={feedBack} className={classes.nested}>
                            <ListItemIcon>
                                <FeedbackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Feedback" />

                        </ListItem></a>



                    <Link to='/faq' style={{ textDecoration: 'none', color: 'grey' }} >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="FAQ" />
                        </ListItem>
                    </Link>

                    <Link to='/about' style={{ textDecoration: 'none', color: 'grey' }} >
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                    </Link>

                </List>
            </Collapse>
        </List>

    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default FeedBackFaqAboutItem;
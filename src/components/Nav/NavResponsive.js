import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import RailBar from './Railbar';
import BottomNavBar from './BottomNavBar';





const NavResponsive = ({ session }) => {
    // if screen size > 600px, use bottom nav bar else rail bar
    const matches = useMediaQuery('(max-width:688px)');

    if (matches) {
        /* if matches is true, then small screen, show BottomNavBar */
        return <BottomNavBar session={session} />
    } else {
        return <RailBar session={session} />
    }

}

export default NavResponsive;
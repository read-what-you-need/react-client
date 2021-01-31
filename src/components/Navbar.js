import React from 'react';
import { Link } from 'react-router-dom';

import Signout from './Auth/Signout'

const Navbar = ({ session }) => {
    return (
        <nav>{session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}</nav>


    );
}

const NavbarAuth = ({ session }) => {


    const username = session.getCurrentUser.username;

    return (



        < div class="sidebar" >

            <Link to="/" >   Home       </Link>

            <Link to="/profile" >   Profile       </Link>

            <a target="blank" href="https://forms.gle/ZE73f4cdWVMmwkPy8">Feedback</a>

        

            <div className="App"><Signout/></div>

        </div >


    );
}


const NavbarUnAuth = () => {




    return (



        < div class="sidebar" >

            <Link to="/" >   Home       </Link>

            <Link to="/login" >   Login       </Link>

            <a target="blank" href="https://forms.gle/ZE73f4cdWVMmwkPy8">Feedback</a>

            <Link to="/faq" >   FAQ's       </Link>

        </div >


    );
}

export default Navbar;


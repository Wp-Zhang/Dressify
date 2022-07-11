import React from 'react';
import { Button } from '@nextui-org/react';
import { googleLogout } from '@react-oauth/google';

function Logout({ setUser }) {

    const handleLogout = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');
    };

    return (
        <Button color="error" onClick={handleLogout}>Logout</Button>
    );
}

export default Logout;
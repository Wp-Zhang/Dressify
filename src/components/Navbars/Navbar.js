import React, { useState, useEffect, useCallback } from "react";
import { Container, Image, Link, Grid, Button } from '@nextui-org/react';
import './NavBar.css';

import Toolbar from '@mui/material/Toolbar';

import Login from '../Account/Login';
import Logout from '../Account/Logout';


import 'boxicons';

const Navbar1 = ({ user, setUser }) => {

    return (
        <Container>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'rgba(0,0,0,0)' }}>
                <Container className="NavBrand" display="grid" justify="space-between">


                    <Link href="/" className="Logo">
                        <Image src="./logo1.svg" alt="products logo" height={60} />
                    </Link>


                    <div className="Account">
                        {user ? <Logout setUser={setUser} /> : <Login setUser={setUser} />}
                    </div>
                    {/* <Navbar.Collapse id="reponsive-navbar-nav">
                        <Nav className="m-auto">
                            <Nav.Link as={Link} to={"/products"}>
                                Products
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse> */}

                </Container>
            </Toolbar>
            {/* </Navbar> */}


        </Container >
    )
}

export default Navbar1
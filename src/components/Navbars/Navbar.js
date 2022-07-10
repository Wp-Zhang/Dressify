import React, { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import Container from "react-bootstrap/Container";
import { Button, Container, Image, Link, Grid, Row } from '@nextui-org/react';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Navbar.css';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
                        {user ? (
                            <Logout setUser={setUser} />
                        ) : (
                            <Login setUser={setUser} />
                        )}
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
            <Toolbar sx={{ marginTop: "-10px", borderColor: 'rgba(0,0,0,0)' }}>
                <Grid.Container gap={1.9} justify="center">
                    <Grid justify="center">
                        <Link href="/products" className="NavLink">Ladieswear</Link>
                    </Grid>
                    <Grid justify="center">
                        <Link href="/products" className="NavLink">Baby/Children</Link>
                    </Grid>
                    <Grid justify="center">
                        <Link href="/products" className="NavLink">Menswear</Link>
                    </Grid>
                    <Grid justify="center">
                        <Link href="/products" className="NavLink">Sport</Link>
                    </Grid>
                    <Grid justify="center">
                        <Link href="/products" className="NavLink">Divided</Link>
                    </Grid>
                </Grid.Container>
            </Toolbar>
            {/* </Navbar> */}


        </Container>
    )
}

export default Navbar1
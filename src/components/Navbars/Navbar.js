import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Navbar.css';

import Login from '../Login';
import Logout from '../Logout';

import 'boxicons';

const Navbar1 = ({ user, setUser }) => {
    return (
        <Navbar bg="white" expand="lg" sticky="top">
            <Container className="container-fluid">
                <Navbar.Brand href="/">
                    <img src="./logo1.svg" alt="products logo" height={60} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="reponsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to={"/products"}>
                            Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {user ? (
                    <Logout setUser={setUser} />
                ) : (
                    <Login setUser={setUser} />
                )}
            </Container>
        </Navbar>
    )
}

export default Navbar1
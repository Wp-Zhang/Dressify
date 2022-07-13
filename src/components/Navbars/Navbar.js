import React, { useState, useEffect, useCallback } from "react";
import { Container, Image, Link, Grid, Button, Row } from '@nextui-org/react';
import './NavBar.css';

import Toolbar from '@mui/material/Toolbar';
import Logo from "../icons/logo";
import Login from '../Account/Login';
import Account from '../Account/Account';

import CartIcon from "../icons/cart";
import { FavoriteIcon, FavoriteFillIcon } from "../icons/favorite";

import 'boxicons';
import { useNavigate } from "react-router-dom";

const Navbar1 = ({ user, setUser }) => {
    const navigate = useNavigate()

    return (
        <Container>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'rgba(0,0,0,0)' }}>
                <Container className="NavBrand" display="grid" justify="space-between" style={{ paddingTop: "20px" }}>


                    <Link href="/" className="Logo">
                        <Image src="./logo.png" alt="products logo" width={150} />
                    </Link>


                    <Row justify="right" className="Account">
                        {user && (<Button
                            auto
                            style={{ backgroundColor: "rgba(255,255,255,0)", textAlign: "center" }}
                            icon={window.location.pathname === "/favorites" ?
                                <FavoriteFillIcon strokeWidth="0px" size={19} filter="drop-shadow(0px 0px 3px rgb(245 85 85 / 0.8))" />
                                :
                                <FavoriteIcon strokeWidth="0px" fill="black" size={19} filter="drop-shadow(0px 2px 2px rgb(0 0 0 / 0.3))" />
                            }
                            onClick={() => { navigate("/favorites") }}
                        >
                        </Button>)}

                        {user && <Button
                            auto
                            style={{ backgroundColor: "rgba(255,255,255,0)" }}
                            icon={<CartIcon fill="black" size={21} filter="drop-shadow(0px 2px 2px rgb(0 0 0 / 0.3))" />}
                        />}
                        {user ? <Account user={user} setUser={setUser} /> : <Login setUser={setUser} style={{ alignSelf: "right" }} />}
                    </Row>


                </Container>
            </Toolbar>
            {/* </Navbar> */}


        </Container >
    )
}

export default Navbar1
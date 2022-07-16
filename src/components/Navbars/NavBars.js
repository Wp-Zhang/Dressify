import React from "react";
import { Container, Image, Link, Grid, Button, Row, Tooltip, Text } from '@nextui-org/react';
import './NavBar.css';

import Toolbar from '@mui/material/Toolbar';
import Login from '../Account/Login';
import Account from '../Account/Account';

import { CartIcon, CartFillIcon } from "../icons/cart";
import { FavoriteIcon, FavoriteFillIcon } from "../icons/favorite";

import { useNavigate } from "react-router-dom";

const Navbar1 = ({ user, setUser, loginVisible = false }) => {
    const navigate = useNavigate()

    return (
        <Container>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'rgba(0,0,0,0)' }}>
                <Container className="NavBrand" display="grid" justify="space-between" style={{ paddingTop: "3%" }}>

                    <Container className="Logo">
                        <Link href="/" >
                            <Image src="./logo.png" alt="products logo" width={150} />
                        </Link>
                    </Container>


                    <Row justify="right" className="Account">
                        {user && (
                            <Tooltip content={<Text>My Favorites</Text>} placement="bottom">
                                <Button
                                    auto
                                    style={{ backgroundColor: "rgba(255,255,255,0)", textAlign: "center" }}
                                    icon={window.location.pathname === "/favorites" ?
                                        <FavoriteFillIcon strokeWidth="0px" size={19} filter="drop-shadow(0px 0px 3px rgb(245 85 85 / 0.8))" />
                                        :
                                        <FavoriteIcon strokeWidth="0px" fill="black" size={19} filter="drop-shadow(0px 2px 2px rgb(0 0 0 / 0.3))" />
                                    }
                                    onClick={() => { navigate("/favorites") }}
                                >
                                </Button>
                            </Tooltip>
                        )}
                        {user &&
                            <Tooltip content={<Text>My Cart</Text>} placement="bottom">
                                <Button
                                    auto
                                    style={{ backgroundColor: "rgba(255,255,255,0)" }}
                                    icon={window.location.pathname === "/cart" ?
                                        <CartFillIcon size={21} filter="drop-shadow(0px 0px 3px rgb(245 165 36 / 0.8))" />
                                        :
                                        <CartIcon fill="black" size={21} filter="drop-shadow(0px 2px 2px rgb(0 0 0 / 0.3))" />
                                    }
                                    onClick={() => { navigate("/cart") }}
                                />
                            </Tooltip>
                        }
                        {user ?
                            <Account user={user} setUser={setUser} />
                            :
                            <Login setUser={setUser} style={{ alignSelf: "right" }} defaultVisible={loginVisible} />}
                    </Row>


                </Container>
            </Toolbar>
        </Container >
    )
}

const Navbar2 = () => {

    const navigate = useNavigate();
    const indexList = ["All", 'Ladieswear', 'Baby/Children', 'Menswear', 'Sport', 'Divided']

    return (
        <Toolbar sx={{ marginTop: "0px", borderColor: 'rgba(0,0,0,0)' }}>
            <Grid.Container gap={0} justify="center">
                {
                    indexList.map(idx => {
                        return (
                            <Grid key={idx} justify="center">
                                <Button
                                    auto
                                    color=""
                                    className="NavLink"
                                    style={{ background: "transparent" }}
                                    onPress={(e) => { navigate("/products", { params: { index: idx } }) }}
                                >
                                    {idx}
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid.Container>
        </Toolbar>
    )
}

export { Navbar1, Navbar2 }
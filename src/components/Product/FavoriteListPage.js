import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import AccountDataService from "../../services/account";
import { Container, Grid, Spacer, Image } from '@nextui-org/react';

import SmallProductCard from "./SmallProductCard";
import { Navbar2 } from "../NavBars/NavBar";

import './FavoritePage.css';


const FavoriteListPage = ({ user }) => {

    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);
    const [spacerNum, setSpacerNum] = useState(0);


    const retrieveFavorites = useCallback(() => {
        if (user) {
            AccountDataService.getFavorites(user.id)
                .then(response => {
                    setFavorites(response.data.favorites)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [user])

    const addFavorite = (productId) => {
        if (user) {
            let newFavorites = [...favorites, productId];
            let data = {
                _id: user.id,
                favorites: newFavorites
            }
            AccountDataService.updateFavorites(data)
                .then(response => {
                    setFavorites(newFavorites);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const deleteFavorite = (productId) => {
        if (user) {
            let filteredFavorites = favorites.filter(f => f !== productId);
            let data = {
                _id: user.id,
                favorites: filteredFavorites
            }
            AccountDataService.updateFavorites(data)
                .then(response => {
                    setFavorites(filteredFavorites);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    useEffect(() => {
        if (user && favorites && favorites.length > 0) {
            ProductDataService.getProductByIds(favorites)
                .then(response => {
                    let info = response.map((res) => res.data)
                    setProducts(info)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [favorites]);

    useEffect(() => {
        retrieveFavorites();
    }, [retrieveFavorites]);

    useEffect(() => {
        let rowNum = Math.ceil(favorites.length / 4)
        if (rowNum >= 4) {
            setSpacerNum(0);
        } else {
            setSpacerNum(4 - rowNum);
        }
    }, [favorites])

    return (
        <div className="App">
            <Navbar2 />
            <Spacer y={1} />

            <Container xs>
                <Image src="./images/favoritePageTitle.png" width={"40%"}></Image>
            </Container>
            <Spacer y={1} />

            <Container lg>
                <Grid.Container gap={2} justify="flex-start">
                    {products.length > 0 && products.map((product, index) => {
                        return (
                            <Grid xs={6} sm={3} key={index}>
                                <SmallProductCard
                                    key={product.product_code}
                                    user={user}
                                    product={product}
                                    isFavorite={favorites.includes(product.product_code)}
                                    addFavorite={addFavorite}
                                    deleteFavorite={deleteFavorite}
                                />
                            </Grid>
                        )
                    })}
                </Grid.Container>
            </Container>
            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={9.5} />)
            }
        </div >
    )
}

export default FavoriteListPage;
import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import AccountDataService from "../../services/account";
import { Container, Grid, Spacer, Image, Text } from '@nextui-org/react';

import SmallProductCard from "./SmallProductCard";
import { Navbar2 } from "../NavBars";
import RecommendBar from "./RecommendBar";

import './FavoritePage.css';


const FavoriteListPage = ({ user }) => {

    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([])
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
            AccountDataService.getCart(user.id)
                .then(response => {
                    setCart(response.data.cart)
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

    const addCart = (articleId, size) => {
        let target = cart.filter((article) => article.article_id === articleId && article.size === size)
        let rest = cart.filter((article) => article.article_id !== articleId || article.size !== size)
        if (target.length === 0) {
            target = { article_id: articleId, size: size, num: 1 }
        } else {
            target = target[0]
            target.num += 1
        }
        let newCart = [target, ...rest]
        let data = {
            _id: user.id,
            cart: newCart
        }
        AccountDataService.updateCart(data)
            .then(response => {
                setCart(newCart);
            })
            .catch(e => {
                console.log(e);
            })
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
            {
                favorites.length > 0 && products.length > 0 ?
                    <div>
                        <Container xs>
                            <Image src="./images/favoritePageTitle.png" width={"40%"}></Image>
                        </Container>
                        <Spacer y={1} />
                        <Container lg>
                            <Grid.Container gap={2} justify="flex-start">
                                {favorites.length > 0 && products.length > 0 && products.map((product, index) => {
                                    return (
                                        <Grid sm={3} key={index}>
                                            <SmallProductCard
                                                key={product.product_code}
                                                user={user}
                                                product={product}
                                                isFavorite={favorites.includes(product.product_code)}
                                                addFavorite={addFavorite}
                                                deleteFavorite={deleteFavorite}
                                                addCart={addCart}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid.Container>
                        </Container>
                    </div>
                    :
                    <Container>
                        <Spacer y={3} />
                        <Image src="./images/emptyCart.png" width={"20%"}></Image>
                        <Text size={20}>Your wish list is empty !</Text>
                    </Container>
            }

            <Spacer y={2} />
            <RecommendBar
                user={user}
                favorites={favorites}
                addFavorite={addFavorite}
                deleteFavorite={deleteFavorite}
                addCart={addCart}
            />

            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={9.5} />)
            }
        </div >
    )
}

export default FavoriteListPage;
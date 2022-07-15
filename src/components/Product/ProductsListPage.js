import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import AccountDataService from "../../services/account";
import { Container, Grid, Pagination, Button, Spacer } from '@nextui-org/react';
import Toolbar from '@mui/material/Toolbar';

import SearchBar from "../SearchBar/SearchBar";
import SmallProductCard from "./SmallProductCard";


const ProductsListPage = ({ user }) => {

    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([])

    const indexList = ["All", 'Ladieswear', 'Baby/Children', 'Menswear', 'Sport', 'Divided']
    const [index, setIndex] = useState(indexList[0])

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageNum, setTotalPageNum] = useState(0);

    const [filters, setFilters] = useState({})

    const [spacerNum, setSpacerNum] = useState(0);

    const retrieveFavoritesAndCart = useCallback(() => {
        if (user) {
            console.log("Retrieveing favorites and cart...")
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

    const deleteFavorite = (productId) => {
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


    const retrieveProducts = useCallback(() => {
        ProductDataService.find(filters, currentPage)
            .then(response => {
                setProducts(response.data.products);
                setCurrentPage(response.data.page);
                setTotalPageNum(Math.ceil(response.data.total_results / 16))
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage, filters]);

    useEffect(() => {
        retrieveProducts();
    }, [currentPage])

    useEffect(() => {
        if (currentPage !== 0) {
            setCurrentPage(0);
        } else {
            retrieveProducts()
        }
    }, [filters])

    useEffect(() => {
        retrieveFavoritesAndCart();
    }, [retrieveFavoritesAndCart]);

    useEffect(() => {
        let rowNum = Math.ceil(products.length / 4)
        if (rowNum >= 4) {
            setSpacerNum(0);
        } else {
            setSpacerNum(4 - rowNum);
        }
    }, [products])

    return (
        <div className="App">
            <Toolbar sx={{ marginTop: "0px", borderColor: 'rgba(0,0,0,0)' }}>
                <Grid.Container gap={0} justify="center">
                    {
                        indexList.map(idx => {
                            return (
                                <Grid key={idx} justify="center">
                                    <Button
                                        auto
                                        color=""
                                        className={index === idx ? "NavLink-clicked" : "NavLink"}
                                        style={{ background: "transparent" }}
                                        onPress={(e) => { setIndex(e.target.textContent) }}
                                    >
                                        {idx}
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                </Grid.Container>
            </Toolbar>

            <SearchBar
                index={index}
                setFilters={setFilters}
            />
            <Container lg>
                <Grid.Container gap={1} justify="flex-start">
                    {products.map((product, index) => (
                        <Grid sm={3} key={index} justify="center">
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
                    ))}
                </Grid.Container>
            </Container>
            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={10} />)
            }
            {products.length === 16 &&
                (
                    <div>
                        < Spacer y={2} />
                        < Pagination
                            shadow
                            total={totalPageNum}
                            page={currentPage + 1}
                            initialPage={1}
                            onChange={(v) => setCurrentPage(v - 1)}
                            style={{ paddingBottom: "100px" }}
                        />
                    </div>
                )

            }
        </div >

    )
}

export default ProductsListPage;
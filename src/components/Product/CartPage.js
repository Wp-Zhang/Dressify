import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import AccountDataService from "../../services/account";
import { Container, Table, Checkbox, Row, Text, Button, Spacer, Image, Grid } from '@nextui-org/react';

import CartProductCard from "./CartProductCard";

import { Navbar2 } from "../NavBars/NavBar";

import './CartPage.css';


const CartPage = ({ user }) => {

    const [cart, setCart] = useState([]);
    const [articles, setArticles] = useState([]);
    const [products, setProducts] = useState([]);
    const [spacerNum, setSpacerNum] = useState(0);


    const retrieveCart = useCallback(() => {
        if (user) {
            AccountDataService.getCart(user.id)
                .then(response => {
                    setCart(response.data.cart)
                    console.log("Retrieveing cart...", response.data.cart)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [user])

    const updateCart = (newCart) => {
        if (user) {
            let data = {
                _id: user.id,
                cart: newCart
            }
            AccountDataService.updateCart(data)
                .then(response => {
                    setCart(newCart)
                    console.log("Cart updated", newCart)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    useEffect(() => {
        if (user && cart && cart.length > 0) {
            // setProducts([])
            // console.log("Cart:", cart)
            console.log("Retrieve articles...")
            ProductDataService.getArticleByIds(cart.map(item => item.article_id))
                .then(response => {
                    let info = response.map((res) => res.data)
                    info = info.map((item, idx) => { return { ...item, ...cart[idx] } })
                    // console.log(info.length)
                    setArticles(info)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [cart]);

    useEffect(() => {
        if (user && articles && articles.length > 0) {
            // setProducts([])
            // console.log("Cart:", cart)
            console.log("Retrieve products...")
            // console.log(articles.map(item => item.product_code))
            ProductDataService.getProductByIds(articles.map(item => item.product_code))
                .then(response => {
                    let info = response.map((res) => res.data)
                    setProducts(info)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [articles]);

    useEffect(() => {
        retrieveCart();
    }, [retrieveCart]);

    useEffect(() => {
        let rowNum = Math.ceil(cart.length / 4)
        if (rowNum >= 4) {
            setSpacerNum(0);
        } else {
            setSpacerNum(4 - rowNum);
        }
    }, [cart])

    return (
        <div className="App">
            <Navbar2 />

            <Spacer y={1} />

            {/* <Text h1 className="cart-title" borderColor="black">Cart</Text> */}
            {/* <Image src="./images/cartPageTitle.png" width={"40%"} /> */}
            <Spacer y={1} />

            <Container css={{ width: "50%" }}>
                <Table
                    selectionMode="multiple"
                    hoverable={false}
                    color=""
                    css={{ background: "rgba(255,255,255,0.5)", paddingLeft: "8%", paddingRight: "8%" }}
                >
                    <Table.Header>
                        <Table.Column css={{ background: "transparent", textAlign: "center" }}>
                            <Text className="cart-title" size={32}>Shopping Cart</Text>
                            {/* <Image src="./images/cartPageTitle.png" width={"30%"} /> */}
                        </Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {articles.length > 0 && products.length > 0 && articles.map((article, index) => {
                            // console.log("Product", index, ":", article)
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <CartProductCard
                                            key={article.article_id}
                                            user={user}
                                            cart={cart}
                                            updateCart={updateCart}
                                            article={article}
                                            product={products[index]}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Container>
            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={9.5} key={idx} />)
            }
        </div >
    )
}

export default CartPage;
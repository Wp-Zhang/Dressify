import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import AccountDataService from "../../services/account";
import { Container, Table, Card, Row, Text, Spacer } from '@nextui-org/react';
import { Divider } from "@mui/material";

import CartProductCard from "./CartProductCard";
import CheckoutForm from "./CheckoutForm";

import { Navbar2 } from "../NavBars/NavBar";

import './CartPage.css';


const CartPage = ({ user }) => {

    const [cart, setCart] = useState([]);
    const [articles, setArticles] = useState([]);
    const [products, setProducts] = useState([]);
    const [spacerNum, setSpacerNum] = useState(0);

    const [selectedItems, setSelectedItems] = useState(new Set([]))


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
            console.log("Retrieve articles...")
            ProductDataService.getArticleByIds(cart.map(item => item.article_id))
                .then(response => {
                    let info = response.map((res) => res.data)
                    info = info.map((item, idx) => { return { ...item, ...cart[idx] } })
                    setArticles(info)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [cart]);

    useEffect(() => {
        if (user && articles && articles.length > 0) {
            console.log("Retrieve products...")
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
        let rowNum = cart.length
        if (rowNum >= 5) {
            setSpacerNum(0);
        } else {
            setSpacerNum(5 - rowNum);
        }
    }, [cart])

    const getTotalPrice = () => {
        let items = [...selectedItems]
        items = items.map(idx => articles[parseInt(idx)])
        return items.map(item => item.price * item.num).reduce((a, b) => a + b, 0)
    }

    return (
        <div className="App">
            <Navbar2 />
            <Spacer y={1} />

            <Container css={{ width: "47%" }}>
                <Card css={{ background: "rgba(255,255,255,0.8)" }}>
                    <Card.Body>
                        <Table
                            selectionMode="multiple"
                            hoverable={false}
                            shadow={false}
                            color="default"
                            selectedKeys={selectedItems}
                            onSelectionChange={setSelectedItems}
                            css={{ background: "transparent", paddingLeft: "5%", paddingRight: "calc(4*$sm)", paddingBottom: "3%" }}
                        >
                            <Table.Header>
                                <Table.Column css={{ background: "transparent", textAlign: "center" }}>
                                    <Text className="cart-title" size={32} css={{ paddingRight: "4.5%" }}>Shopping Cart</Text>
                                </Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {articles.length > 0 && products.length > 0 && articles.map((article, index) => {
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

                        {selectedItems.size > 0 &&
                            <Container className='calculator' css={{ paddingRight: "calc(11*$sm)" }}>
                                <Row justify="flex-end">
                                    <Text size={20} className="cart-text-regular">
                                        Order Value:    {"$ " + getTotalPrice().toFixed(2)}
                                    </Text>
                                </Row>
                                <Row justify="flex-end">
                                    <Text size={20} className="cart-text-regular">
                                        Shipping Fee:    $ 5.00
                                    </Text>
                                </Row>
                                <Divider variant="inset" component="p" />
                                <Row justify="flex-end">
                                    <Text size={23} className="cart-text-block">
                                        Total:    {"$ " + (5 + getTotalPrice()).toFixed(2)}
                                    </Text>
                                </Row>
                            </Container>
                        }
                        <Spacer y={1} />
                        {
                            selectedItems.size > 0 &&
                            <Container css={{ width: "70%", maxWidth: "550px" }}>
                                <CheckoutForm articles={[...selectedItems].map(idx => articles[parseInt(idx)])} />
                            </Container>
                        }
                    </Card.Body>
                </Card>

            </Container>

            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={9.5} key={idx} />)
            }
        </div >
    )
}

export default CartPage;

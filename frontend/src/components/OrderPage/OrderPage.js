import React, { useState, useEffect, useCallback } from "react";
import AccountDataService from "../../services/account";
import { Container, Image, Text, Spacer } from '@nextui-org/react';

import OrderProductCard from "./OrderProductCard";

import { Navbar2 } from "../NavBars";

import './OrderPage.css';


const OrderPage = ({ user }) => {

    const [orders, setOrders] = useState([]);
    const [spacerNum, setSpacerNum] = useState(0);

    const retrieveOrder = useCallback(() => {
        if (user) {
            AccountDataService.getOrders(user.id)
                .then(response => {
                    console.log(response.data)
                    setOrders(response.data)
                    console.log("Retrieve done")
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }, [user])

    const deleteOrder = (orderId) => {
        if (user) {
            AccountDataService.delOrder(orderId)
                .then(response => {
                    let newOrders = orders.filter((order) => order.order_id !== orderId)
                    setOrders(newOrders)
                    console.log("Orders updated", newOrders)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    useEffect(() => {
        retrieveOrder();
    }, [retrieveOrder]);

    useEffect(() => {
        let rowNum = orders.length
        if (rowNum >= 5) {
            setSpacerNum(0);
        } else {
            setSpacerNum(5 - rowNum);
        }
    }, [orders])

    return (
        <div className="App">
            <Navbar2 />
            <Spacer y={1} />

            {
                orders.length > 0 ?
                    <Container css={{ width: "47%", maxWidth: "850px" }}>
                        {
                            user && orders && orders.length > 0 &&
                            orders.map((order, index) => {
                                return (
                                    <OrderProductCard
                                        key={order.order_id}
                                        order={order}
                                        index={index}
                                        deleteOrder={deleteOrder}
                                    />
                                )
                            })
                        }
                    </Container>
                    :
                    <Container>
                        <Spacer y={3} />
                        <Image src="./images/emptyOrder.png" width={"20%"}></Image>
                        <Text size={20} css={{ fontFamily: "Montserrat-Medium" }}>You don't have any orders yet</Text>
                    </Container>
            }

            {
                [...Array(spacerNum).keys()].map((idx) => <Spacer y={9.5} key={idx} />)
            }
        </div >
    )
}

export default OrderPage;

import { Card, Button, Grid, Row, Text, Spacer, Avatar, Tooltip, Image, Container, Popover } from '@nextui-org/react';
import { useState } from 'react';
import getImgURL from '../../services/utils';
import { Divider } from "@mui/material";
import { ApplePayIcon, VisaIcon, PaypalIcon, MasterCardIcon, GooglePayIcon } from '../icons/payment';
import Moment from 'react-moment';
import 'moment-timezone';

import "boxicons";
import "./OrderPage.css";

const iconDict = {
    'ApplePay': <ApplePayIcon size={55} />,
    'Visa': <VisaIcon size={55} />,
    'Paypal': <PaypalIcon size={55} />,
    'MasterCard': <MasterCardIcon size={55} />,
    'GooglePay': <GooglePayIcon size={55} />
}


const OrderProductCard = ({ order, index, deleteOrder }) => {

    const [deleteIsOpen, openDelete] = useState(false)

    const formAddress = (shipInfo) => {
        return shipInfo.address + "  " + shipInfo.address2 + "," + shipInfo.city + ", " + shipInfo.state
    }

    return (
        <div>
            <Card css={{ background: "rgba(255,255,255,0.8)" }} className="OrderCard">
                <Card.Body>
                    <Text className="order-title" size={32} css={{ alignSelf: "center" }}>{index + 1}</Text>
                    <Container>
                        {order.article_info.map((article, index) => {
                            return (
                                <div>
                                    <Card key={index} className="OrderCard" variant="flat" css={{ background: "transparent" }}>
                                        <Row>
                                            <Image
                                                src={getImgURL(article.article_id)}
                                                css={{ borderRadius: "$lg", maxHeight: "190px", aspectRatio: 1 / 1.5, margin: 0 }}
                                            />
                                            <Container css={{ paddingRight: 0 }}>
                                                <Row justify="space-between">
                                                    <Button auto css={{ background: "transparent", padding: 0 }}>
                                                        <Text size={22} transform={"capitalize"} className="order-name">{article.prod_name}</Text>
                                                    </Button>
                                                    <Text className="order-price" size={18}>{"$ " + (order.num[index] * order.price[index]).toFixed(2)}</Text>
                                                </Row>
                                                <Spacer y={0.3} />
                                                <Row>
                                                    <Text size={18} className="order-text-block">
                                                        Price:  <Text b className="order-text-bold">{"$ " + order.price[index]}     </Text>
                                                    </Text>
                                                    <Text size={18} className="order-text-block">
                                                        Count:  <Text b className="order-text-bold">{order.num[index]}</Text>
                                                    </Text>
                                                </Row>
                                                <Row justify="flex-start" align='center'>
                                                    <Text size={18} className="order-text-block">
                                                        Color:  <Text b className="order-text-bold">{article.perceived_colour_master_name}</Text>
                                                    </Text>
                                                    <Container css={{ paddingLeft: "10px" }}>
                                                        <Tooltip content={article.perceived_colour_master_name} placement="top" hideArrow>
                                                            <Avatar
                                                                color=""
                                                                className={article.perceived_colour_master_name.replace(' ', '-')}
                                                                size="xs"
                                                            />
                                                        </Tooltip>
                                                    </Container>
                                                </Row>
                                                <Row>
                                                    <Text size={18} className="order-text-block">
                                                        Size:  <Text b className="order-text-bold">{order.size[index]}</Text>
                                                    </Text>
                                                </Row>

                                            </Container>
                                        </Row>
                                    </Card>
                                    <Spacer y={0.5} />
                                </div>
                            )
                        })}
                    </Container>
                    <Spacer y={0.5} />
                    <Row className="OrderInfo">
                        <Container>
                            <Row>
                                <Text>
                                    <Text b>
                                        {formAddress(order.ship_info)}
                                    </Text>
                                </Text>
                            </Row>
                            <Row>
                                <Text>
                                    <Text b>{order.ship_info.firstName + " " + order.ship_info.lastName}</Text>
                                </Text>
                                <Spacer x={0.5} />
                                <Text>
                                    <Text b>{order.ship_info.phone}</Text>
                                </Text>
                            </Row>
                            <Row css={{ alignItems: "center" }}>
                                <Text>Payment Method: </Text>
                                {iconDict[order.ship_info.payment]}
                            </Row>
                        </Container>

                        <Container className='calculator' css={{ width: "20%" }}>
                            <Row justify="flex-end">
                                <Text size={15} className="cart-text-regular">
                                    Order Value:    {"$ " + (order.total - order.shipping).toFixed(2)}
                                </Text>
                            </Row>
                            <Row justify="flex-end">
                                <Text size={15} className="cart-text-regular">
                                    Shipping Fee:    $ {order.shipping.toFixed(2)}
                                </Text>
                            </Row>
                            <Divider variant="inset" component="p" />
                            <Row justify="flex-end">
                                <Text size={18} className="cart-text-block">
                                    Total:    {"$ " + order.total.toFixed(2)}
                                </Text>
                            </Row>
                        </Container>

                    </Row>
                    <Spacer y={0.5} />


                    <Row>
                        <Container>
                            <Text b size={15}>
                                {/* {new Date(order.t_dat).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")} */}
                                <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">

                                    {new Date(order.t_dat)}
                                </Moment>
                                {/* {new Date(order.t_dat).toString()} */}
                            </Text>
                        </Container>
                        <Container display='flex' css={{ justifyContent: "flex-end" }}>
                            <Popover placement='top' isOpen={deleteIsOpen}>
                                <Popover.Trigger>
                                    <Button
                                        auto
                                        size=""
                                        css={{ background: "transparent" }}
                                        icon={<box-icon name='trash' animation='tada-hover' color="#F55555" ></box-icon>}
                                        onClick={() => openDelete(true)}
                                    />
                                </Popover.Trigger>
                                <Popover.Content>
                                    <Grid.Container
                                        justify='center'
                                        css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "300px" }}
                                    >
                                        <Row justify="center" align="center">
                                            <Text css={{ fontFamily: "Montserrat-Bold" }}>Delete Order</Text>
                                        </Row>
                                        <Row justify="center" align="center">
                                            <Text css={{ fontFamily: "Montserrat-Medium" }}>
                                                Are you sure you want to delete it ?
                                            </Text>
                                        </Row>
                                        <Spacer y={0.5} />
                                        <Grid.Container justify="space-around" alignContent="center">
                                            <Grid>
                                                <Button auto light css={{ width: "50%" }} onClick={() => { openDelete(false); }}>
                                                    Cancel
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                <Button auto shadow color="error" onClick={() => { deleteOrder(order.order_id); openDelete(false); }}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid.Container>
                                    </Grid.Container>
                                </Popover.Content>
                            </Popover>
                        </Container>
                    </Row>

                    <Spacer y={0.2} />
                </Card.Body>

            </Card>
            <Spacer y={1} />
        </div>
    )
}

export default OrderProductCard
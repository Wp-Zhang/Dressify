import { Card, Checkbox, Button, Grid, Row, Text, Spacer, Avatar, Tooltip, Image, Container, Input, Popover } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import getImgURL from '../../services/utils';
import "./CartPage.css";

// import { Minus, Plus } from '../icons/symbol';
import CartDetailCard from './CartDetailCard';

import "boxicons";

const CartProductCard = ({ user, cart, updateCart, article, product }) => {
    // console.log("Card of:", article, product)

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const [deleteIsOpen, openDelete] = useState(false)

    const modifyNum = (num) => {
        let oldArticleId = article.article_id
        let oldSize = article.size
        let i = 0;
        for (; i < cart.length; i++) {
            if (cart[i].article_id === oldArticleId && cart[i].size === oldSize) {
                console.log(i);
                break;
            }
        }
        let newCart = [...cart]
        newCart[i].num = num

        if (num === 0) {
            newCart.splice(i, 1)
        }

        updateCart(newCart)
    }

    const modifyColorAndSize = (articleId, size) => {
        let oldArticleId = article.article_id
        let oldSize = article.size
        let i = 0;
        for (; i < cart.length; i++) {
            if (cart[i].article_id === oldArticleId && cart[i].size === oldSize) {
                console.log(i);
                break;
            }
        }

        let newCart = [...cart]
        newCart[i].article_id = articleId
        newCart[i].size = size
        console.log("new cart:", newCart)
        updateCart(newCart)
    }

    return (
        <div>
            <Card className="CartCard" variant="flat" css={{ background: "transparent" }}>
                <Row>
                    {/* <Grid.Container justify="flex-start" alignContent='center'> */}
                    {/* <Grid xs={3}> */}

                    {/* <ExtendedImg articleId={article.article_id} height="100%" /> */}
                    <Image src={getImgURL(article.article_id)} css={{ borderRadius: "$lg", maxHeight: "240px", aspectRatio: 1 / 1.5, margin: 0 }}></Image>
                    {/* </Grid> */}
                    {/* <Grid xs> */}
                    <Container>
                        <Spacer y={0.5} />
                        <Row justify="space-between">
                            <Button auto onClick={handler} css={{ background: "transparent", padding: 0 }}>
                                <Text size={22} transform={"capitalize"} className="cart-name">{article.prod_name}</Text>
                            </Button>
                            <Text className="cart-price" size={22}>{"$ " + (article.num * article.price).toFixed(2)}</Text>
                        </Row>
                        <Spacer y={0.3} />
                        <Row>
                            <Text size={20} className="cart-text-block">
                                Price:  <Text b className="cart-text-bold">{"$ " + article.price}</Text>
                            </Text>
                        </Row>
                        <Row>
                            <Text size={20} className="cart-text-block">
                                Size:  <Text b className="cart-text-bold">{article.size}</Text>
                            </Text>
                        </Row>
                        <Row justify="flex-start" align='center'>
                            <Text size={20} className="cart-text-block">
                                Color:  <Text b className="cart-text-bold">{article.perceived_colour_master_name}</Text>
                            </Text>
                            <Container css={{ paddingLeft: "10px" }}>
                                <Tooltip content={article.perceived_colour_master_name} placement="top" hideArrow>
                                    <Avatar
                                        color=""
                                        className={article.perceived_colour_master_name.replace(' ', '-')}
                                        size="xs"
                                    // onClick={handler}
                                    />
                                </Tooltip>
                            </Container>
                        </Row>
                        <Row justify='space-between' align='center'>
                            <Button.Group flat size="sm" color="">
                                <Button
                                    onClick={() => modifyNum(article.num - 1)}
                                    disabled={article.num === 1}
                                    css={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                >
                                    <Text b size={12}>➖</Text>
                                </Button>
                                <Button disabled style={{ background: "white" }}><Text b>{article.num}</Text></Button>

                                <Button
                                    onClick={() => modifyNum(article.num + 1)}
                                    css={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                >
                                    <Text b size={12}>➕</Text>
                                </Button>
                            </Button.Group>

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
                                            <Text css={{ fontFamily: "Montserrat-Bold" }}>Confirm</Text>
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
                                                <Button auto shadow color="error" onClick={() => { modifyNum(0); openDelete(false); }}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid.Container>
                                    </Grid.Container>
                                </Popover.Content>
                            </Popover>
                        </Row>
                    </Container>
                    {/* </Grid> */}
                    {/* </Grid.Container> */}
                </Row>
            </Card>
            <CartDetailCard
                user={user}
                product={product}
                size={article.size}
                no={product.article_id.indexOf(article.article_id)}
                visible={visible}
                closeHandler={closeHandler}
                modifyColorAndSize={modifyColorAndSize}
            />
        </div>
    )
}

export default CartProductCard
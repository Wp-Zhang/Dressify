import { Card, Checkbox, Button, Grid, Row, Text, Spacer, Avatar, Tooltip, Image, Container, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import getImgURL from '../../services/utils';
import './Product.css'

// import { Minus, Plus } from '../icons/symbol';
import CartDetailCard from './CartDetailCard';

// import "boxicons";

const CartProductCard = ({ user, cart, updateCart, article, product }) => {
    // console.log("Card of:", article, product)

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

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
        newCart[i].num += num
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
            <Card variant="flat" css={{ background: "transparent" }}>
                <Grid.Container justify="left" alignContent='center'>
                    <Grid xs={2}>

                        {/* <ExtendedImg articleId={article.article_id} height="100%" /> */}
                        <Image src={getImgURL(article.article_id)} css={{ borderRadius: "$lg" }}></Image>
                    </Grid>
                    <Grid xs>
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
                            <Row justify='flex-start' align='center'>
                                <Button.Group flat size="sm" color="">
                                    {/* <Row > */}
                                    <Button
                                        onClick={() => modifyNum(-1)}
                                        css={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                    >
                                        <Text b size={12}>➖</Text>
                                    </Button>
                                    <Button disabled style={{ background: "white" }}><Text b>{article.num}</Text></Button>
                                    <Button
                                        onClick={() => modifyNum(1)}
                                        css={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    >
                                        <Text b size={12}>➕</Text>
                                    </Button>
                                </Button.Group>
                                {/* </Row> */}
                            </Row>
                        </Container>
                    </Grid>
                </Grid.Container>
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
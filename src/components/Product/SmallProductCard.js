import { Card, Button, Row, Text, Spacer, Avatar, Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import 'boxicons'

import CartIcon from '../icons/cart';
import FavoriteIcon from '../icons/favorite';
import ExtendedImg from './ExtendedImg';
import './Product.css'

import ProductDetailCard from './ProductDetailCard';

const SmallProductCard = ({ user, product }) => {

    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };


    return (
        <div>
            <Card
                isPressable
                disableRipple
                isHoverable
                css={{ w: "330px", h: "441px", backgroundColor: "rgba(255, 255, 255, 0)" }}
                onClick={handler}
            >

                <Card.Body css={{ p: 0, w: "100%", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                    <ExtendedImg articleId={product.article_id[0]} height="330px" />
                    {user &&
                        <Button
                            auto
                            rounded
                            css={{
                                backgroundColor: "rgba(255,255,255,0.5)",
                                backdropFilter: "blur(5px)",
                                position: "absolute",
                                marginBottom: 441 - 330 + 15 + "px",
                                marginLeft: "15px",
                                left: 0,
                                bottom: 0,
                                aspectRatio: 1
                            }}
                        >
                            <FavoriteIcon size={20} fill="black" strokeWidth='0.2px' />
                        </Button>}


                    {user && <Button
                        auto
                        rounded
                        css={{
                            backgroundColor: "rgba(255,255,255,0.5)",
                            position: "absolute",
                            marginBottom: 441 - 330 + 15 + "px",
                            marginRight: "15px",
                            right: 0,
                            bottom: 0,
                            aspectRatio: 1
                        }}
                        onClick={() => {
                        }}
                    >
                        <CartIcon size={20} fill="black" ></CartIcon>
                    </Button>}


                    <Spacer y={0.5} />


                    <Row wrap="wrap" justify="space-between" align="center" className='small-card-body'>
                        <Text size={19} transform={"capitalize"} className="small-card-title">{product.prod_name}</Text>
                        <Text size={19} className="small-card-price">{"$ " + product.price.toFixed(2)}</Text>
                    </Row>
                    {/* <Row wrap="wrap" justify="space-between" align="center" className='small-card-body'> */}
                    {
                        product.perceived_colour_master_name.length > 6 ?
                            <Avatar.Group count={product.perceived_colour_master_name.length} className="small-card-large-colorgroup">
                                {
                                    product.perceived_colour_master_name.slice(0, 6).map((color, index) => {
                                        return (
                                            <Tooltip content={color} key={index} placement="bottom" hideArrow>
                                                <Avatar className={color.replace(' ', '-')} size="sm" color="" stacked />
                                            </Tooltip>
                                        )
                                    })
                                }
                            </Avatar.Group>
                            :
                            <div className="small-card-colorgroup">
                                {
                                    product.perceived_colour_master_name.map((color, index) => {
                                        return (
                                            <div className="small-card-color" key={index} style={{ marginLeft: 35 * index + 15 + "px" }}>
                                                <Tooltip content={color} placement="bottom" hideArrow>
                                                    <Avatar className={color.replace(' ', '-')} size="sm" color="" />
                                                </Tooltip>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                    {/* <Text size={12} className="small-card-sale">{"Sold: " + product.sale}</Text> */}
                    {/* </Row> */}
                </Card.Body>
            </Card >

            <ProductDetailCard
                user={user}
                product={product}
                visible={visible}
                closeHandler={closeHandler}
            />
        </div>
    )
}

export default SmallProductCard
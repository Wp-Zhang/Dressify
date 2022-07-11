import { Card, Button, Row, Text, Spacer, Avatar, Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import 'boxicons'

import CartIcon from '../icons/cart';
import FavoriteIcon from '../icons/favorite';
import ExtendedImg from './ExtendedImg';
import './Product.css'
import { IconButton } from './IconButton';

const SmallProductCard = ({ user, product }) => {

    return (
        <Card
            isPressable
            disableRipple
            isHoverable
            css={{ w: "330px", h: "441px", backgroundColor: "rgba(255, 255, 255, 0)" }}
        >

            <Card.Body css={{ p: 0, w: "100%", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                <ExtendedImg articleId={product.article_id[0]} height="330px" />
                {user && < IconButton
                    css={{
                        position: "absolute",
                        marginBottom: 441 - 330 + 15 + "px",
                        marginLeft: "15px",
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <FavoriteIcon />
                </IconButton>}
                {user && <IconButton
                    css={{
                        position: "absolute",
                        marginBottom: 441 - 330 + 15 + "px",
                        marginRight: "15px",
                        right: 0,
                        bottom: 0,
                    }}
                    onClick={() => {
                    }}
                >
                    <CartIcon size={15}></CartIcon>
                </IconButton>}



                {/* <box-icon name='cart-alt' color='#11181c' style={{
                        filter: "drop-shadow(0px 4px 2px rgb(0 0 0 / 0.25))"
                    }}></box-icon> */}
                <Spacer y={0.5} />


                <Row wrap="wrap" justify="space-between" align="center" className='small-card-body'>
                    <Text size={19} transform={"capitalize"} className="small-card-title">{product.prod_name}</Text>
                    <Text size={19} className="small-card-price">{"$ " + product.price.toFixed(2)}</Text>
                </Row>

                <Row wrap="wrap" justify="space-between" align="left" className="small-card-colorgroup">
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
                </Row>
            </Card.Body>

        </Card >
    )
}

export default SmallProductCard
import { Container, Card, Button, Row, Text, Spacer, Grid, Avatar, Tooltip } from '@nextui-org/react';
import { useState } from 'react';

import getImgURL from '../../services/utils';
// import './Product.css';
import ExtendedImg from './ExtendedImg';

import './Product.css'

import 'boxicons'


const SmallProductCard = ({ product }) => {
    // let v = new Vibrant(getImgURL(product.article_id[0]))
    // v.getPalette((err, palette) => console.log(palette))

    return (
        <Card isPressable disableRipple isHoverable css={{ w: "330px", h: "441px", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
            <Card.Body css={{ p: 0, w: "100%" }}>
                <ExtendedImg articleId={product.article_id[0]} height="330px" />

                <Button
                    auto
                    color=""
                    rounded
                    css={{
                        position: "absolute",
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(5px)",
                        marginBottom: 441 - 330 + 15 + "px",
                        marginLeft: "15px",
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                    }}
                    icon={<box-icon name='heart' color='#11181c' style={{
                        filter: "drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25))"
                    }}></box-icon>}
                    onClick={() => {
                    }}
                />
                <Button
                    auto
                    color="white"
                    rounded
                    css={{
                        position: "absolute",
                        background: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(5px)",
                        marginBottom: 441 - 330 + 15 + "px",
                        marginRight: "15px",
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                    }}
                    icon={<box-icon name='cart-alt' color='#11181c' style={{
                        filter: "drop-shadow(0px 4px 2px rgb(0 0 0 / 0.25))"
                    }}></box-icon>}
                    onClick={() => {
                    }}
                />

                <Spacer y={0.5} />


                <Row wrap="wrap" justify="space-between" align="center" className='small-card-body'>
                    <Text size={19} transform={"capitalize"} className="small-card-title">{product.prod_name}</Text>
                    <Text size={19} className="small-card-price">{"$ " + product.price.toFixed(2)}</Text>
                </Row>

                <Row wrap="wrap" justify="space-between" align="left" className="small-card-colorgroup">
                    {
                        product.perceived_colour_master_name.map((color, index) => {
                            return (
                                <div className="small-card-color" style={{ marginLeft: 35 * index + 15 + "px" }}>
                                    <Tooltip content={color} placement="bottom" hideArrow>
                                        <Avatar className={color} size="sm" color="" />
                                    </Tooltip>
                                </div>
                            )
                        })
                    }
                </Row>
            </Card.Body>

        </Card>
    )
}

export default SmallProductCard
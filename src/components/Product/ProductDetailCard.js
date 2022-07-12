import { Card, Button, Row, Text, Spacer, Avatar, Tooltip, Modal, Image, Container, Grid } from '@nextui-org/react';
import { useState } from 'react';
import 'boxicons'

import CartIcon from '../icons/cart';
import FavoriteIcon from '../icons/favorite';
import ExtendedImg from './ExtendedImg';
import './Product.css'

import ImageGallery from 'react-image-gallery';
import getImgURL from '../../services/utils';

const ProductDetailCard = ({ user, product, visible, closeHandler }) => {

    const imgList = product.article_id.map(
        articleId => {
            return { original: getImgURL(articleId) }
        }
    )

    const [curNo, setCurNo] = useState(0)

    const nameLen = product.prod_name.length

    return (
        <Modal
            closeButton
            // autoMargin
            aria-labelledby={product.prod_name}
            open={visible}
            onClose={closeHandler}
            width={user ? "1000px" : "850px"}
            css={{ aspectRatio: user ? 100 / 60 : 1.4167, padding: 0 }}
            className='large-card'
        >
            <Modal.Body style={{ height: "100%", padding: 0 }}>
                <Row justify="space-between" align="left">
                    {/* <ImageGallery
                        items={imgList}
                        showThumbnails={false}
                        showPlayButton={false}
                        lazyLoad={true}
                    // infinite={false}
                    /> */}
                    <Container style={{ padding: 0 }}>
                        <Image src={imgList[curNo].original} objectFit="cover" style={{ height: "600px" }}></Image>
                    </Container>
                    <Container display='flex' alignContent='space-around' style={{ padding: "60px 40px 30px 40px", alignSelf: "center", height: "80%" }}>
                        <Row justify="space-between" align="left">
                            <Text
                                className='large-card-title'
                                transform='capitalize'
                                size={nameLen <= 14 ? 48 : 40}
                                style={{ width: "80%" }}
                            >
                                {product.prod_name}
                            </Text>
                            <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>
                                {user &&
                                    <Button
                                        auto
                                        rounded
                                        css={{
                                            backgroundColor: "rgba(255,255,255,1)",
                                            backdropFilter: "blur(5px)",
                                            alignSelf: "center",
                                            aspectRatio: 1
                                        }}
                                    >
                                        <FavoriteIcon size={35} fill="black" strokeWidth='0.2px' filter="drop-shadow(0px 4px 3px rgb(0 0 0 / 0.4))" />
                                    </Button>
                                }
                            </div>
                        </Row>
                        <Row justify="space-between" align="left" style={{ marginTop: "10px" }}>
                            <Text className='large-card-desc' size={19}>{product.detail_desc}</Text>
                        </Row>
                        <Row justify="space-between" align="left" style={{ marginTop: "10px" }}>
                            <Text size={35} className="large-card-price">{"$ " + product.price.toFixed(2)}</Text>
                        </Row>

                        <Grid.Container gap={0.5} display='flex' style={{ marginTop: "20px", marginLeft: 0, padding: 0, width: "70%", alignSelf: "left" }}>
                            {
                                product.perceived_colour_master_name.map((color, index) => {
                                    return (
                                        <Grid key={index} >
                                            <Avatar
                                                color=""
                                                className={color.replace(' ', '-') + (curNo === index ? " selected-color" : "")}
                                                size="sm"
                                                onClick={(e) => setCurNo(index)}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid.Container>
                        <Container display="flex" style={{ justifyContent: 'center', marginTop: "10%" }} width="100%">
                            {user &&
                                <Button
                                    auto
                                    rounded
                                    shadow
                                    color="warning"
                                    size="lg"
                                    iconRight={<CartIcon size={20} strokeWidth="0.8px" color="white" fill="white" />}
                                >
                                    <Text className="large-card-price" style={{ color: "white" }}>Add To Cart</Text>
                                </Button>
                            }
                        </Container>
                    </Container>
                </Row>
            </Modal.Body>
        </Modal >
    )
}

export default ProductDetailCard
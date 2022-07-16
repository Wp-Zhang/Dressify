import { Button, Row, Text, Avatar, Modal, Image, Container, Grid, Dropdown } from '@nextui-org/react';
import { useState } from 'react';

import { CartIcon } from '../icons/cart';
import CloseIcon from '../icons/close';
import { FavoriteIcon, FavoriteFillIcon } from '../icons/favorite';
import './Product.css'

import getImgURL from '../../services/utils';

const shadow = {
    "Black": "#000000",
    "White": "#555555",
    "undefined": "#555555",
    "Unknown": "#555555",
    "Beige": "#8E760B",
    "Grey": "#555555",
    "Blue": "#4594ef",
    "Pink": "#714865",
    "Lilac Purple": "#EADCF8",
    "Red": "#b72d4f",
    "Mole": "#C59A80",
    "Orange": "#f7803c",
    "Metal": "#C1C8CD",
    "Brown": "#4E3104",
    "Turquoise": "#2ECEC2",
    "Yellow": "#7C4C00",
    "Khaki green": "#404E21",
    "Green": "#108944",
    "Yellowish Green": "#CEF72C",
    "Bluish Green": "#088B8B"
}


const ProductDetailCard = ({ user, product, visible, closeHandler, isFavorite, addFavorite, deleteFavorite, addCart }) => {

    const imgList = product.article_id.map(
        articleId => getImgURL(articleId)
    )
    const sizeList = ["XS", "S", "M", "L", "XL", "XXL"]
    const [curSize, setCurSize] = useState(new Set(["Size"]))
    const getSize = (sizeSet) => {
        let [size] = sizeSet
        return size
    }

    const [curNo, setCurNo] = useState(0)

    const nameLen = product.prod_name.length

    const onClose = () => {
        closeHandler();
        setCurNo(0);
        setCurSize(new Set(["Size"]))
    }

    const footer1 = (
        < Dropdown placement="bottom-right" >
            <Dropdown.Button bordered>
                {
                    getSize(curSize) === "Size" ?
                        <pre className="detail-button" style={{ fontSize: "1.3rem" }}>  Size  </pre> :
                        <Row justify="flex-start" align='center'>
                            <pre className="detail-button" style={{ "fontSize": "20px" }}>
                                {
                                    " ".repeat(3 - getSize(curSize).length) +
                                    getSize(curSize) +
                                    " ".repeat(3 - getSize(curSize).length)
                                }
                            </pre>
                        </Row>
                }
            </Dropdown.Button>
            <Dropdown.Menu
                color="secondary"
                aria-label="Size"
                disallowEmptySelection
                selectionMode="single"
                variant='flat'
                selectedKeys={curSize}
                onSelectionChange={setCurSize}
                css={{ width: "inherit" }}
            >
                {sizeList.map((size) => <Dropdown.Item key={size} className="detail-button">{size}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown >
    )
    const footer2 = (
        < Button
            bordered={getSize(curSize) === "Size"}
            borderWeight='bold'
            style={{ paddingLeft: "15px" }}
            color="inherit"
            disabled={getSize(curSize) === "Size"}
            iconRight={
                < CartIcon
                    size={20}
                    strokeWidth="10px"
                    fill={getSize(curSize) === "Size" ? "#7E868C" : "#FFFFFF"}
                />
            }
            onClick={() => { addCart(product.article_id[curNo], getSize(curSize)) }}
        >
            <Text className="detail-button" color="inherit">Add To Cart</Text>
        </Button >
    )


    return (
        <Modal
            color="error"
            aria-labelledby={product.prod_name}
            open={visible}
            onClose={onClose}
            width={user ? "1000px" : "850px"}
            css={{ aspectRatio: user ? 100 / 60 : 1.4167, padding: 0 }}
            className='large-card'
        >
            <Modal.Body style={{ height: "100%", padding: 0 }}>
                <Avatar
                    color=""
                    size="sm"
                    style={{ position: "absolute", right: 0, margin: "10px" }}
                    onClick={closeHandler}
                    icon={<CloseIcon size={22} />}
                />
                <Row justify="space-between" align="left">
                    <Container style={{ padding: 0 }}>
                        <Image src={imgList[curNo]} objectFit="cover" style={{ height: "600px" }}></Image>
                    </Container>
                    <Container
                        display='flex'
                        alignContent='space-around'
                        style={{ padding: "60px 40px 30px 40px", alignSelf: "center", height: "80%" }}
                    >
                        <Row justify="space-between" align="left">
                            <Text
                                className='large-card-title'
                                transform='capitalize'
                                size={nameLen <= 14 ? 48 : 40}
                                style={{ width: "80%" }}
                            >
                                {product.prod_name}
                            </Text>
                            <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {user && (isFavorite ?
                                    <FavoriteFillIcon
                                        size={35}
                                        filter="drop-shadow(0px 0px 8px rgb(245 85 85 / 0.8))"
                                        onClick={() => { deleteFavorite(product.product_code) }}
                                    />
                                    :
                                    <FavoriteIcon
                                        size={35}
                                        fill="black"
                                        strokeWidth='0.2px'
                                        filter="drop-shadow(0px 0px 4px rgb(0 0 0 / 0.5))"
                                        onClick={() => { addFavorite(product.product_code) }}
                                    />
                                )}
                            </div>
                        </Row>
                        {product.detail_desc.length > 1 &&
                            <Row justify="space-between" align="left" style={{ marginTop: "10px" }}>
                                <Text className='large-card-desc' size={19}>{product.detail_desc}</Text>
                            </Row>
                        }

                        <Row justify="space-between" align="left" style={{ marginTop: "10px" }}>
                            <Grid.Container gap={0.5} display='flex' style={{ marginTop: "20px", marginLeft: 0, padding: 0, width: "50%", alignSelf: "left" }}>
                                {
                                    product.perceived_colour_master_name.map((color, index) => {
                                        return (
                                            <Grid key={index} >
                                                <Avatar
                                                    color=""
                                                    className={color.replace(' ', '-') + (curNo === index ? " selected-color" : "")}
                                                    size="sm"
                                                    onClick={(e) => setCurNo(index)}
                                                    style={{
                                                        boxShadow: curNo === index ? "0 0px 19px " + shadow[color] : "0 0 0"
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid.Container>
                            <Container display='flex' style={{ width: "50%", alignContent: "center", paddingRight: 0 }}>
                                <Text size={35} className="large-card-price">{"$ " + product.price.toFixed(2)}</Text>
                            </Container>
                        </Row>

                        <Container display="flex" style={{ justifyContent: 'center', marginTop: "10%" }} width="100%">
                            {user && (
                                getSize(curSize) === "Size" ?
                                    <Button.Group
                                        color="warning"
                                        auto
                                        bordered
                                        borderWeight='bold'
                                        ripple={false}
                                        size="lg"
                                    >
                                        {footer1}
                                        {footer2}
                                    </Button.Group>
                                    :
                                    <Button.Group
                                        color="warning"
                                        auto
                                        borderWeight='bold'
                                        ripple={false}
                                        size="lg"
                                    >
                                        {footer1}
                                        {footer2}
                                    </Button.Group>
                            )
                            }
                        </Container>
                    </Container>
                </Row>
            </Modal.Body>
        </Modal >
    )
}

export default ProductDetailCard
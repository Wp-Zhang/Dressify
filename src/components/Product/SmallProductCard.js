import { Card, Button, Row, Text, Spacer, Avatar, Tooltip, Grid } from '@nextui-org/react';
import { useState } from 'react';

import { FavoriteIcon, FavoriteFillIcon } from '../icons/favorite';
import ExtendedImg from './ExtendedImg';
import './Product.css'

import ProductDetailCard from './ProductDetailCard';

const SmallProductCard = ({ user, product, isFavorite, addFavorite, deleteFavorite }) => {

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
                css={{ w: "330px", h: "415px", backgroundColor: "rgba(255, 255, 255, 0)" }}
                onClick={handler}
            >

                <Card.Body css={{ p: 0, w: "100%", backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                    <ExtendedImg articleId={product.article_id[0]} height="300px" />

                    <Spacer y={0.5} />


                    <Row wrap="wrap" justify="space-between" align="center" className='small-card-body'>
                        <Text size={19} transform={"capitalize"} className="small-card-title">{product.prod_name}</Text>
                        <Text size={19} className="small-card-price">{"$ " + product.price.toFixed(2)}</Text>
                    </Row>
                    <Row wrap="wrap" justify="space-between" align="center" className='small-card-body' style={{ marginTop: "5px" }}>
                        {
                            product.perceived_colour_master_name.length > 5 ?
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
                                // <div className="small-card-colorgroup">
                                //     {
                                //         product.perceived_colour_master_name.map((color, index) => {
                                //             return (
                                //                 <div className="small-card-color" key={index} style={{ marginLeft: 35 * index + 15 + "px" }}>
                                //                     <Tooltip content={color} placement="bottom" hideArrow>
                                //                         <Avatar className={color.replace(' ', '-')} size="sm" color="" />
                                //                     </Tooltip>
                                //                 </div>
                                //             )
                                //         })
                                //     }
                                // </div>
                                <Grid.Container gap={0.3} display='flex' className='small-card-colorgroup'>
                                    {
                                        product.perceived_colour_master_name.map((color, index) => {
                                            return (
                                                <Grid key={index} >
                                                    <Tooltip content={color} placement="bottom" hideArrow>
                                                        <Avatar
                                                            color=""
                                                            className={color.replace(' ', '-')}
                                                            size="sm"
                                                        />
                                                    </Tooltip>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid.Container>
                        }
                        {user && (isFavorite ?
                            <Button
                                auto
                                rounded
                                css={{
                                    backgroundColor: "rgba(255,255,255,0)",
                                    aspectRatio: 1
                                }}
                                onClick={() => { deleteFavorite(product.product_code) }}
                            >
                                <FavoriteFillIcon size={24} filter="drop-shadow(0px 0px 3px rgb(245 85 85 / 0.8))" />
                            </Button> :
                            <Button
                                auto
                                rounded
                                css={{
                                    backgroundColor: "rgba(255,255,255,0)",
                                    aspectRatio: 1
                                }}
                                onClick={() => { addFavorite(product.product_code) }}
                            >
                                <FavoriteIcon size={24} fill="black" strokeWidth='0.2px' filter="drop-shadow(0px 0px 2px rgb(0 0 0 / 0.4))" />
                            </Button>)}
                    </Row>
                </Card.Body>
            </Card >

            <div className="product-detail-card">
                <ProductDetailCard
                    user={user}
                    product={product}
                    visible={visible}
                    closeHandler={closeHandler}
                    isFavorite={isFavorite}
                    addFavorite={addFavorite}
                    deleteFavorite={deleteFavorite}
                />
            </div>
        </div>
    )
}

export default SmallProductCard
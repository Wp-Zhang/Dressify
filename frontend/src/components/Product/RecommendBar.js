import { Container, Grid, Card, Text, Row, Image } from "@nextui-org/react"
import SmallProductCard from "./SmallProductCard";

import ProductDataService from "../../services/products";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';


const RecommendBar = ({ user, favorites, addFavorite, deleteFavorite, addCart }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 959px)' })
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (user) {
            ProductDataService.getRecommendations(user.id)
                .then(response => {
                    console.log("Recommend:", response.data)
                    ProductDataService.getProductByIds(response.data)
                        .then(res => {
                            let info = res.map(r => r.data)
                            console.log("Recommend Detail:", info)
                            setProducts(info)
                        })

                })
                .catch((e) => { console.log(e) })
        }
    }, [user])



    return (
        products && products.length > 0 && (
            <Container lg>
                <Card css={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                    <Card.Body css={{ alignItems: "center" }}>
                        {/* <Text
                            size={33}
                            // css={{ color: "#FF8794", fontFamily: "Montserrat-Bold", whiteSpace: "pre", "textShadow": "0 0 5px rgba(216, 114, 125, 0.3)" }}
                            css={{ color: "black", fontFamily: "Montserrat-Bold", whiteSpace: "pre", "textShadow": "0 0 5px rgba(0, 0, 0, 0.2)" }}
                        >
                            Recommend
                        </Text> */}
                        <Image src="./images/recTitle.png" width={isSmallScreen ? "60%" : "22%"} />
                        <Grid.Container gap={2} justify="flex-start">
                            {products.map((product, index) => (
                                <Grid sm={3} key={index} justify="center">
                                    <SmallProductCard
                                        key={product.product_code}
                                        user={user}
                                        product={product}
                                        isFavorite={favorites.includes(product.product_code)}
                                        addFavorite={addFavorite}
                                        deleteFavorite={deleteFavorite}
                                        addCart={addCart}
                                    />
                                </Grid>
                            ))}
                        </Grid.Container>
                    </Card.Body>
                </Card>
            </Container>
        )
    )
}

export default RecommendBar
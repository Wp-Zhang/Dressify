import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
import { Container, Grid, Pagination, Button } from '@nextui-org/react';
import Toolbar from '@mui/material/Toolbar';

import SearchBar from "../SearchBar/SearchBar";
import SmallProductCard from "./SmallProductCard";


import 'boxicons';
// import "./ProductsList.css";


const ProductsList = ({ user, favorites, addFavorite, deleteFavorite }) => {

    const indexList = ["All", 'Ladieswear', 'Baby/Children', 'Menswear', 'Sport', 'Divided']
    const [index, setIndex] = useState(indexList[0])

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageNum, setTotalPageNum] = useState(0);

    const [filters, setFilters] = useState({})

    const retrieveProducts = useCallback(() => {
        // console.log("Retrieve items, page:", currentPage, "Filters:", filters)
        // setProducts([])
        ProductDataService.find(filters, currentPage)
            .then(response => {
                setProducts(response.data.products);
                setCurrentPage(response.data.page);
                setTotalPageNum(Math.ceil(response.data.total_results / 16))
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage, filters]);

    useEffect(() => {
        console.log("Page changed to", currentPage)
        retrieveProducts();
    }, [currentPage])

    useEffect(() => {
        if (currentPage !== 0) {
            setCurrentPage(0);
        } else {
            retrieveProducts()
        }
    }, [filters])


    return (
        <div className="App">
            <Toolbar sx={{ marginTop: "-10px", borderColor: 'rgba(0,0,0,0)' }}>
                <Grid.Container gap={0} justify="center">
                    {
                        indexList.map(idx => {
                            return (
                                <Grid key={idx} justify="center">
                                    <Button
                                        auto
                                        color=""
                                        className={index === idx ? "NavLink-clicked" : "NavLink"}
                                        style={{ background: "transparent" }}
                                        onPress={(e) => { setIndex(e.target.textContent) }}
                                    >
                                        {idx}
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                </Grid.Container>
            </Toolbar>

            <SearchBar
                index={index}
                setFilters={setFilters}
            />
            <Container lg>
                <Grid.Container gap={2} justify="flex-start">
                    {products.map((product, index) => (
                        <Grid xs={6} sm={3} key={index}>
                            <SmallProductCard
                                key={product}
                                user={user}
                                product={product}
                            />
                        </Grid>
                    ))}
                </Grid.Container>
            </Container>
            <br />
            <Pagination shadow total={totalPageNum} page={currentPage + 1} initialPage={1} onChange={(v) => setCurrentPage(v - 1)} style={{ paddingBottom: "100px" }} />
        </div>
    )
}

export default ProductsList;
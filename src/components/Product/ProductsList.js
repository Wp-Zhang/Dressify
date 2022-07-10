import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
// import Container from "react-bootstrap/Container";
import { Container, Grid, Pagination } from '@nextui-org/react';

import SmallProductCard from "./SmallProductCard";

import 'boxicons';
// import "./ProductsList.css";

const ProductsList = ({ user, favorites, addFavorite, deleteFavorite }) => {
    const [products, setProducts] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
    const [totalPageNum, setTotalPageNum] = useState(0);

    const retrieveProducts = useCallback(() => {
        setCurrentSearchMode("");
        ProductDataService.getAll(currentPage)
            .then(response => {
                console.log("Response page:", response.data.page);
                setProducts(response.data.products);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
                setTotalPageNum(Math.ceil(response.data.total_results / 16))
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    useEffect(() => {
        retrieveProducts();
    }, [currentPage])

    // const find = useCallback((query, by) => {
    //     ProductDataService.find(query, by, currentPage)
    //         .then(response => {
    //             setProducts(response.data.products);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }, [currentPage]);

    // const findByName = useCallback(() => {
    //     setCurrentSearchMode("findByName");
    //     find(searchName, "title");
    // }, [find, searchName]);

    // const retrieveNextPage = useCallback(() => {
    //     // if (currentSearchMode === "findByName") {
    //     //     findByName();
    //     // } else if (currentSearchMode === "findByRating") {
    //     //     findByRating();
    //     // } else {
    //     //     retrieveProducts();
    //     // }
    //     retrieveProducts();
    // }, [currentSearchMode, retrieveProducts]);


    // useEffect(() => {
    //     setCurrentPage(0);
    // }, [currentSearchMode]);

    // useEffect(() => {
    //     retrieveNextPage();
    // }, [currentPage, retrieveNextPage]);


    // const onChangeSearchName = e => {
    //     const searchName = e.targety.value;
    //     setSearchName(searchName);
    // }

    // const onChangeSearchRating = e => {
    //     const searchRating = e.target.value;
    //     setSearchRating(searchRating);
    // }

    const onPageChange = (value) => {
        console.log(value - 1);
        // navigate("/", { page: value })
        setCurrentPage(value - 1);
    }

    return (
        <div className="App">
            <div className="blur">
                <Container lg>
                    <Grid.Container gap={2} justify="flex-start">
                        {products.map((product, index) => (
                            <Grid xs={6} sm={3} key={index}>
                                <SmallProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid.Container>
                </Container>
                <br />
                {/* Showing page: {currentPage + 1}. */}
                {/* <Button
                variant="link"
                onClick={() => { setCurrentPage(currentPage + 1) }}>
                Get next {entriesPerPage} results
            </Button> */}
                <Pagination shadow total={totalPageNum} initialPage={1} onChange={onPageChange} style={{ paddingBottom: "100px" }} />
            </div>
        </div>
    )
}

export default ProductsList;
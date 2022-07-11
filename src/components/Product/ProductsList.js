import React, { useState, useEffect, useCallback } from "react";
import ProductDataService from "../../services/products";
// import Container from "react-bootstrap/Container";
import { Container, Grid, Pagination } from '@nextui-org/react';

import SearchBar from "../SearchBar/SearchBar";
import SmallProductCard from "./SmallProductCard";


import 'boxicons';
// import "./ProductsList.css";

const ProductsList = ({ user, favorites, addFavorite, deleteFavorite }) => {

    const [index, setIndex] = useState();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [totalPageNum, setTotalPageNum] = useState(0);

    const [filters, setFilters] = useState({})

    const retrieveProducts = useCallback(() => {
        ProductDataService.getAll(currentPage)
            .then(response => {
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
        // navigate("/", { page: value })
        setCurrentPage(value - 1);
    }

    return (
        <div className="App">
            <SearchBar
                index={index}
                filters={filters}
                setFilters={setFilters}
            />
            <Container lg>
                <Grid.Container gap={2} justify="flex-start">
                    {products.map((product, index) => (
                        <Grid xs={6} sm={3} key={index}>
                            <SmallProductCard
                                key={product}
                                product={product}
                            />
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
    )
}

export default ProductsList;
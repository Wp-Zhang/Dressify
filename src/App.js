import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import Navbar1 from "./components/Navbars/Navbar";
import ProductsList from "./components/Product/ProductsList";
// import Product from "./components/Product/Product";
import { useState, useEffect, useCallback } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { NextUIProvider } from '@nextui-org/react';
// import logo from './logo.svg';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [user, setUser] = useState(null);
    // const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem("login"));
        if (loginData) {
            let loginExp = loginData.exp;
            let now = Date.now() / 1000;
            if (now < loginExp) {
                // Not expired
                setUser(loginData);
                // getFavorites(loginData.googleId);
            } else {
                // Expired
                localStorage.setItem("login", null);
                // setFavorites([]);
            }
        }
    }, []);

    const [favorites, setFavorites] = useState([]);

    const getFavorites = (userId) => {
        // FavoritesDataService.getFavoritesById(userId)
        //     .then(response => {
        //         setFavorites(response.data.favorites);
        //     })
        //     .catch(e => {
        //         console.log(`Get favorites by id failed: ${e}`);
        //     })
    }

    const addFavorite = (productId) => {
        // let newFavorites = [...favorites, productId];
        // let data = {
        //     _id: user.googleId,
        //     favorites: newFavorites
        // }
        // FavoritesDataService.updateFavorite(data)
        //     .then(response => {
        //         setFavorites(newFavorites);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })
    }

    const deleteFavorite = (productId) => {
        // let filteredFavorites = favorites.filter(f => f !== productId);
        // let data = {
        //     _id: user.googleId,
        //     favorites: filteredFavorites
        // }
        // FavoritesDataService.updateFavorite(data)
        //     .then(response => {
        //         setFavorites(filteredFavorites);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }


    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App" >
                <Navbar1 user={user} setUser={setUser} />
                <Routes>
                    <Route exact path={"/"} element={
                        <ProductsList
                            user={user}
                            addFavorite={addFavorite}
                            deleteFavorite={deleteFavorite}
                            favorites={favorites}
                        />
                    } />
                    <Route exact path={"/products"} element={
                        <ProductsList
                            user={user}
                            addFavorite={addFavorite}
                            deleteFavorite={deleteFavorite}
                            favorites={favorites}
                        />
                    } />
                    {/* <Route path={"/products/:id"} element={<Product user={user} />} /> */}
                    {/* <Route path={"/favorites"} element={
                        user ?
                            <DndProvider backend={HTML5Backend}>
                                <Favorites
                                    user={user}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                />
                            </DndProvider>
                            :
                            <ProductsList
                                user={user}
                                addFavorite={addFavorite}
                                deleteFavorite={deleteFavorite}
                                favorites={favorites}
                            />
                    } /> */}
                    {/* <Route path={"/favorites"} element={
                        <DndProvider backend={HTML5Backend}>
                            <Demo />
                        </DndProvider>
                    } /> */}
                </Routes>
            </div >
        </GoogleOAuthProvider>
    );
}

export default App;

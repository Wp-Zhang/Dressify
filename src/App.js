import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createTheme, NextUIProvider } from "@nextui-org/react"

import ProductsListPage from "./components/Product/ProductsListPage";
import FavoriteListPage from "./components/Product/FavoriteListPage";
import { Navbar1 } from "./components/NavBars/NavBar";
import CartPage from "./components/CartPage/CartPage";
import OrderPage from "./components/OrderPage/OrderPage";

import { useState, useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;



function App() {
    const theme = createTheme({
        type: "light",
        theme: {
            colors: {
                border: "#888888",
                accents3: "transparent",
                checkboxBorderColor: "#000000"
            },
            space: {},
            fonts: {},
        }
    })

    const [user, setUser] = useState(null);

    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem("login"));
        if (loginData) {
            let loginExp = loginData.exp;
            let now = Date.now() / 1000;
            if (now < loginExp) {
                setUser(loginData);
            } else {
                localStorage.setItem("login", null);
            }
        }
    }, []);

    return (
        <NextUIProvider theme={theme}>
            <GoogleOAuthProvider clientId={clientId}>
                <div className="App Background">
                    <div className="blur">
                        <Routes>
                            <Route exact path={"/"} element={
                                <div>
                                    <Navbar1 user={user} setUser={setUser} />
                                    <ProductsListPage user={user} />
                                </div>
                            } />
                            <Route exact path={"/products"} element={
                                <div>
                                    <Navbar1 user={user} setUser={setUser} />
                                    <ProductsListPage user={user} />
                                </div>
                            } />
                            <Route exact path={"/favorites"} element={
                                user ?
                                    <div>
                                        < Navbar1 user={user} setUser={setUser} />
                                        <FavoriteListPage user={user} />
                                    </div>
                                    :
                                    <div>
                                        <Navbar1 user={user} setUser={setUser} loginVisible={true} />
                                        <ProductsListPage user={user} />
                                    </div>
                            } />
                            <Route exact path={"/cart"} element={
                                user ?
                                    <div>
                                        < Navbar1 user={user} setUser={setUser} />
                                        <CartPage user={user} />
                                    </div>
                                    :
                                    <div>
                                        <Navbar1 user={user} setUser={setUser} loginVisible={true} />
                                        <ProductsListPage user={user} />
                                    </div>
                            } />
                            <Route exact path={"/order"} element={
                                user ?
                                    <div>
                                        < Navbar1 user={user} setUser={setUser} />
                                        <OrderPage user={user} />
                                    </div>
                                    :
                                    <div>
                                        <Navbar1 user={user} setUser={setUser} loginVisible={true} />
                                        <ProductsListPage user={user} />
                                    </div>
                            } />
                        </Routes>
                    </div>
                </div >
            </GoogleOAuthProvider >
        </NextUIProvider >
    );
}

export default App;
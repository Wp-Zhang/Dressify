import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createTheme, NextUIProvider } from "@nextui-org/react"

import { Navbar1 } from "./components/NavBars/NavBar";
import ProductsListPage from "./components/Product/ProductsListPage";
import FavoriteListPage from "./components/Product/FavoriteListPage";
import CartPage from "./components/CartPage/CartPage";
import { useState, useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';
import { checkboxClasses } from "@mui/material";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;



function App() {
    const theme = createTheme({
        type: "light",
        theme: {
            colors: {
                // primary: "#F5A524",
                // primarySolidHover: "#F5A524",
                // border: "transparent",
                border: "#888888",
                accents3: "transparent",
                // primaryBorder: '$green500',
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
                        <Navbar1 user={user} setUser={setUser} />
                        <Routes>
                            <Route exact path={"/"} element={<ProductsListPage user={user} />} />
                            <Route exact path={"/products"} element={<ProductsListPage user={user} />} />
                            <Route exact path={"/favorites"} element={<FavoriteListPage user={user} />} />
                            <Route exact path={"/cart"} element={<CartPage user={user} />} />
                        </Routes>
                    </div>
                </div >
            </GoogleOAuthProvider>
        </NextUIProvider>
    );
}

export default App;
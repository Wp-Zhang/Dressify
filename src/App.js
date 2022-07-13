import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar1 from "./components/NavBars/NavBar";
import ProductsListPage from "./components/Product/ProductsListPage";
import FavoriteListPage from "./components/Product/FavoriteListPage";
import { useState, useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
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
        <GoogleOAuthProvider clientId={clientId}>
            <div className="App Background">
                <div className="blur">
                    <Navbar1 user={user} setUser={setUser} />
                    <Routes>
                        <Route exact path={"/"} element={<ProductsListPage user={user} />} />
                        <Route exact path={"/products"} element={<ProductsListPage user={user} />} />
                        <Route exact path={"/favorites"} element={<FavoriteListPage user={user} />} />
                    </Routes>
                </div>
            </div >
        </GoogleOAuthProvider>
    );
}

export default App;
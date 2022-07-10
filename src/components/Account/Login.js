import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { Button, Text } from '@nextui-org/react';

import 'boxicons'

import "./Account.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login({ setUser }) {
    const onSuccess = (res) => {
        var tokenData = jwt_decode(res.credential);
        var loginData = {
            googleId: tokenData.sub,
            ...tokenData
        }
        setUser(loginData);
        localStorage.setItem("login", JSON.stringify(loginData));
    };

    const onFailure = (res) => {
        console.log("Login failed: res:", res);
    }

    return (
        // <div>
        //     <GoogleLogin
        //         clientId={clientId}
        //         buttonText="Login"
        //         onSuccess={onSuccess}
        //         onFailure={onFailure}
        //         cookiePolicy={'single_host_origin'}
        //         style={{ marginTop: '100px' }}
        //         isSignedIn={true}
        //         auto_select={true}
        //     />
        // </div>
        <Button
            auto
            style={{ backgroundColor: "rgba(255,255,255,0)", float: "right" }}
            icon={
                <img
                    src="./icons/account.svg"
                    height={20}
                    style={{ filter: "drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25))" }}
                />
            }
        >
            <Text size={13} className="account-text">LOG IN</Text>
        </Button>


    );
}

export default Login;
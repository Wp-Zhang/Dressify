import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Text, Modal, Image } from '@nextui-org/react';

import 'boxicons'

import "./Account.css";
import axios from 'axios';

function Login({ setUser }) {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const login = useGoogleLogin({
        onSuccess: res => {
            axios.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + res.access_token)
                .then(res => {
                    setUser(res.data);
                    localStorage.setItem("login", JSON.stringify(res.data));
                    console.log("Login with Google successfully!")
                })
        },
        onError: res => { console.log("Login failed: res:", res) },
    })

    return (
        <div>
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
                onClick={handler}
            >
                <Text size={13} className="account-text">LOG IN</Text>
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header justify='center'>
                    <Image src="./logo1.svg" alt="products logo" height={40} />
                    {/* <Text id="modal-title" size={18}>
                        Welcome to
                        <Text b size={18}>
                            NextUI
                        </Text>
                    </Text> */}
                </Modal.Header>
                <Modal.Body css={{ textAlign: "center" }}>
                    <Button onClick={() => login()}>
                        Log in with Google
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
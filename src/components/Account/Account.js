import React from 'react';
import { Button, Container, Dropdown, Avatar, Text } from '@nextui-org/react';
import { googleLogout } from '@react-oauth/google';
import { fontSize } from '@mui/system';

function Account({ user, setUser }) {

    const handleLogout = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');
    };

    return (
        <div>
            <Dropdown placement="bottom-center">
                <Dropdown.Trigger>
                    <Button
                        auto
                        style={{ backgroundColor: "rgba(255,255,255,0)", float: "right" }}
                        icon={
                            <img
                                src="./icons/account.svg"
                                height={18}
                                style={{ filter: "drop-shadow(0px 2px 2px rgb(0 0 0 / 0.3))" }}
                            />
                        }
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                    <Dropdown.Item key="profile" css={{ height: "$18" }}>
                        <Text color="inherit" css={{ d: "flex" }}>
                            Signed in as
                        </Text>
                        <Text b color="inherit" css={{ d: "flex" }}>
                            {user.email}
                        </Text>
                    </Dropdown.Item>
                    <Dropdown.Item key="settings" withDivider>
                        <Button
                            color=""
                            bordered
                            onClick={(e) => { }}
                            style={{ background: "transparent", borderColor: "transparent", width: "100%", padding: "0px" }}
                        >
                            My Orders
                        </Button>
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider onClick={handleLogout} css={{ padding: "0px" }}>
                        <Button
                            color="error"
                            bordered
                            onClick={handleLogout}
                            style={{ background: "transparent", borderColor: "transparent", width: "100%", padding: "0px" }}
                        >
                            Log Out
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



        </div>
    );
}

export default Account;
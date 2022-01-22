import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { UserContext } from "../util/userContext";
import { USER_EMAIL, USER_PASSWORD } from "../util/constants";

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

    const { user, setUser } = useContext(UserContext);

    return (
        <nav>
            <div className="container-fluid">
                <div className="row align-items-center bg-primary">
                    <div className="col px-0">
                        <button className="btn" onClick={() => setOpen(true)}>
                            <MenuOutlinedIcon />
                        </button>
                    </div>
                    <div
                        className="col fs-2 fw-bolder"
                        style={{
                            // color: "#1991eb",
                            color: "white",
                        }}
                    >
                        <img src="/logo.png" height={30} />
                        erchr
                    </div>
                    <div className="col-auto">
                        <div className="row">
                            <div className="col-auto px-0">
                                <Link to="/users">
                                    <button className="btn">
                                        <ShoppingCartOutlinedIcon />
                                    </button>
                                </Link>
                            </div>
                            <div className="col-auto px-0">
                                <Link to="/account">
                                    <div
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        {user.id && (
                                            <p className="my-auto">
                                                {user.name ?? user.username}
                                            </p>
                                        )}
                                        <button className="btn">
                                            <PermIdentityOutlinedIcon />
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <React.Fragment key="drawer">
                <Drawer
                    anchor={"left"}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box
                        sx={{
                            width: 250,
                        }}
                        component={"div"}
                        role="presentation"
                        onClick={() => setOpen(false)}
                        onKeyDown={() => setOpen(false)}
                    >
                        <List>
                            <Link
                                to="/"
                                style={{
                                    color: "#000000",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItem button>
                                    <HomeOutlinedIcon className="mx-2" />
                                    <ListItemText primary={"Home"} />
                                </ListItem>
                            </Link>
                            <Link
                                to="/products"
                                style={{
                                    color: "#000000",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItem button>
                                    <Inventory2OutlinedIcon className="mx-2" />
                                    <ListItemText primary={"Shop"} />
                                </ListItem>
                            </Link>
                            {user.id && (
                                <Link
                                    to="/orders"
                                    style={{
                                        color: "#000000",
                                        textDecoration: "none",
                                    }}
                                >
                                    <ListItem button>
                                        <LocalShippingOutlinedIcon className="mx-2" />
                                        <ListItemText primary={"My orders"} />
                                    </ListItem>
                                </Link>
                            )}
                            {user.id && (
                                <ListItem
                                    button
                                    onClick={() => {
                                        localStorage.removeItem(USER_EMAIL);
                                        localStorage.removeItem(USER_PASSWORD);
                                        setUser({ cart: [] });
                                    }}
                                >
                                    <LogoutOutlinedIcon className="mx-2" />
                                    <ListItemText primary={"Log out"} />
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </nav>
    );
}

export default Navbar;

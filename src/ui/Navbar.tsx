import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Drawer, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { UserContext } from "../util/userContext";
import { USER_EMAIL, USER_PASSWORD } from "../util/constants";
import Cart from "../components/Cart";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 40px;
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

    const { user, setUser } = useContext(UserContext);
    const [cartOpen, setCartOpen] = useState(false);
    const getTotalItems = user.cart.length;

    console.log("usr cart", user.cart);
    const handleAddToCart = (clickedItemId: number) => {
        setUser({...user, cart: [...user.cart, clickedItemId]});
    };

    const handleRemoveFromCart = (id: number) => {
        // setCartItems((prev) =>
        //     prev.reduce((acc, item) => {
        //         if (item === id) {
        //             return [...acc, item];
        //         }
        //     }, [] as any[])
        // );
        setUser({...user, cart: [...user.cart, id]});
    };

    return (
        <nav>
            <div className="container-fluid">
                <div className="row align-items-center bg-primary">
                    <div className="col px-0">
                        <button className="btn" onClick={() => setOpen(true)}>
                            <MenuOutlinedIcon />
                        </button>
                    </div>
                    <div className="col fs-2 fw-bolder">Merchr</div>
                    <div className="col-auto">
                        <div className="row">
                            <div className="col-auto px-0">
                                <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                                    <Cart
                                        addToCart={handleAddToCart}
                                        removeFromCart={handleRemoveFromCart}
                                    />
                                </Drawer>
                                <StyledButton onClick={() => setCartOpen(true)}>
                                    <Badge badgeContent={getTotalItems} color="error">
                                        <AddShoppingCart />
                                    </Badge>
                                </StyledButton>
                            </div>
                            <div className="col-auto px-0">
                                <Link to="/account">
                                    {user && <p>{user.name}</p>}
                                    <button className="btn">
                                        <PermIdentityOutlinedIcon />
                                    </button>
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
                                    <ListItemText primary={"Products"} />
                                </ListItem>
                            </Link>
                            {user && (
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

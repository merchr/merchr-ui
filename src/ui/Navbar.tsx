import { Box, List, ListItem, ListItemText } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Badge, Drawer, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { UserContext } from "../util/userContext";
import { USER_EMAIL, USER_PASSWORD } from "../util/constants";
import Cart from "../components/Cart";
import styled from "styled-components";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const Wrapper = styled.div`
    margin: 40px;
`;

const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: 20px;
`;

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

    const { user, setUser } = useContext(UserContext);
    
    //get the length of the cart array, i.e get the number of elements in the cart array in userContext
    const getTotalItems = user.cart.filter((number) => !!number).length;

    //function that adds the clicked item id to the user.cart array 
    const handleAddToCart = (clickedItemId: number) => {
        setUser({ ...user, cart: [...user.cart, clickedItemId] });
    };

    //function to find the the item in the user.cart array and delete that item from the user.cart 
    const handleRemoveFromCart = (id: number) => {
        user.cart.find(
            (item) => item === id && delete user.cart[user.cart.indexOf(item)]
        );
        setUser({ ...user, cart: user.cart });
    };

    return (
        <nav className="bg-primary">
            <div className="container">
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
                        <div className="row" style={{ alignItems: "center" }}>
                            <div className="col-auto px-0">
                                <PopupState
                                    variant="popover"
                                    popupId="demo-popup-popover"
                                >
                                    {(popupState) => (
                                        <div>
                                            <StyledButton
                                                {...bindTrigger(popupState)}
                                            >
                                                <Badge
                                                    badgeContent={getTotalItems}
                                                    color="error"
                                                >
                                                    <AddShoppingCart />
                                                </Badge>
                                            </StyledButton>
                                            <Popover
                                                {...bindPopover(popupState)}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "center",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "center",
                                                }}
                                                style={{ maxHeight: "450px" }}
                                            >
                                                <Cart
                                                    isPopover={true}
                                                    addToCart={handleAddToCart}
                                                    removeFromCart={
                                                        handleRemoveFromCart
                                                    }
                                                />
                                                <Link
                                                    to={{
                                                        pathname: "/cart",
                                                    }}
                                                >
                                                    <button className="btn btn-primary">
                                                        {" "}
                                                        See my Cart
                                                    </button>
                                                </Link>
                                                {user.cart.filter(
                                                    (number) => number
                                                ).length > 0 && (
                                                    <Link
                                                        to={{
                                                            pathname:
                                                                "/checkout",
                                                        }}
                                                    >
                                                        <button className="btn btn-secondary">
                                                            Checkout
                                                        </button>
                                                    </Link>
                                                )}
                                            </Popover>
                                        </div>
                                    )}
                                </PopupState>
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

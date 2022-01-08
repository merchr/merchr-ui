import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { UserContext } from "../util/userContext";

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

    const { user, setUser } = useContext(UserContext);

    return (
        <nav>
            <div className="container">
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
                                <Link to="/users">
                                    <button className="btn">
                                        <ShoppingCartOutlinedIcon />
                                    </button>
                                </Link>
                            </div>
                            <div className="col-auto px-0">
                                <Link to="/account">
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
                                    color: "#FFFFFF",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItem button>
                                    <Inventory2OutlinedIcon className="mx-2" />
                                    <ListItemText primary={"Products"} />
                                </ListItem>
                            </Link>
                            {user && (
                                <ListItem button onClick={() => setUser(null)}>
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

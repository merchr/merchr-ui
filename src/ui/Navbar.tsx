import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

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
                                <button
                                    className="btn"
                                    onClick={() => setOpen(true)}
                                >
                                    <ShoppingCartOutlinedIcon />
                                </button>
                            </div>
                            <div className="col-auto px-0">
                                <button
                                    className="btn"
                                    onClick={() => setOpen(true)}
                                >
                                    <PermIdentityOutlinedIcon />
                                </button>
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
                            {["Inbox", "Starred", "Send email", "Drafts"].map(
                                (text) => (
                                    <ListItem button key={text}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
            {/* <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/account">Account</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul> */}
        </nav>
    );
}

export default Navbar;

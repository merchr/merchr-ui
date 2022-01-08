import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <nav>
            <div className="container">
                <div className="row bg-primary">
                    <div className="col">
                        <DensityMediumIcon />
                    </div>
                    <div className="col">Merchr</div>
                    <div className="col">
                        <div className="col">Shopping Cart Account</div>
                    </div>
                </div>
            </div>
            <React.Fragment key='drawer'>
                <Button onClick={() => setOpen(true)}>'drawer'</Button>
                <Drawer
                    anchor={'left'}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box
                        sx={{
                            width: 250,
                        }}
                        component={'div'}
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

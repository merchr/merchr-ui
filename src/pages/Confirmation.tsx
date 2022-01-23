import React, { useContext, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Confirmation() {
    const { user, setUser } = useContext(UserContext);

    // get order Id from router state
    const location = useLocation();
    const state = location?.state as { orderId: number };

    // empty cart when user loads this page
    useEffect(() => {
        setUser({ ...user, cart: [] });
    }, []);

    // redirect to home if no order has been confirmed
    if (!state?.orderId) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container my-5">
            <div className="my-3 text-center">
                <CheckIcon fontSize="large" color="success" />
            </div>
            <h1 className="my-4 text-center">Order is confirmed.</h1>
            <p className="text-center">
                Click <Link to={`/orders/${state.orderId}`}>here</Link> to see
                your order.
            </p>
        </div>
    );
}

export default Confirmation;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Account() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <div>{JSON.stringify(user, null, 2)}</div>;
}

export default Account;

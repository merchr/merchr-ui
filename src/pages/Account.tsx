import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Account() {
    const { user } = useContext(UserContext);

    if (!user.id) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default Account;

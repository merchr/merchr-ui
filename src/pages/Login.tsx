import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { USER_EMAIL, USER_PASSWORD } from "../util/constants";
import { UserContext } from "../util/userContext";

function Login() {
    const userContext = useContext(UserContext);

    const { user, setUser } = userContext;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const location = useLocation();
    const state = location?.state as { from: string };
    const fromCheckout = state.from === "checkout";

    if (user.id) {
        if (fromCheckout) {
            return <Navigate to="/checkout" />;
        }

        return <Navigate to="/" />;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        fetch("http://localhost:1337/api/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: email,
                password,
            }),
        })
            .then((response) =>
                response.json().then((response) => {
                    if (response.error) {
                        setError("Email or passowrd is invalid.");

                        return;
                    }

                    const { id, username, email, name, address, phone } =
                        response.user;

                    localStorage.setItem(USER_EMAIL, email);
                    localStorage.setItem(USER_PASSWORD, atob(password));

                    setUser({
                        ...user,
                        id,
                        username,
                        email,
                        address,
                        phone,
                    });
                })
            )
            .catch((error) => {
                console.log("An error occurred:", error.response);

                setError("Email or passowrd is invalid.");
            });
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Login</div>
            </div>

            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="email">
                    Email
                </label>
                <input
                    required
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="password">
                    Password
                </label>
                <input
                    required
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            {error && (
                <div className="alert alert-warning" role="alert">
                    {error}
                </div>
            )}

            <div className="row my-4">
                <div className="col mx-auto text-center">
                    <button className="btn btn-secondary" type="submit">
                        Login
                    </button>
                </div>
            </div>
            <div className="row my-4">
                <div className="col mx-auto text-center">
                    Don't have an account yet?{" "}
                    <Link
                        to="/signup"
                        state={fromCheckout ? { from: "checkout" } : {}}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default Login;

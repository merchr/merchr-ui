import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Signup() {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string>("");

    // check if redirected from checkout page
    const location = useLocation();
    const state = location?.state as { from: string };
    const fromCheckout = state.from === "checkout";

    // redirect to homepage or to checkout if user is logged in
    if (user.id) {
        if (fromCheckout) {
            return <Navigate to="/checkout" />;
        }

        return <Navigate to="/" />;
    }

    // form handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        fetch("http://localhost:1337/api/auth/local/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                email,
                password,
                name,
                address,
                phone,
            }),
        })
            .then((response) =>
                response.json().then((response) => {
                    if (response.error) {
                        setError(
                            "There was an error creating your account. Please try again."
                        );

                        return;
                    }

                    const { id, username, email, name, address, phone } =
                        response.user;

                    setUser({
                        ...user,
                        id,
                        username,
                        email,
                        name,
                        address,
                        phone,
                    });
                })
            )
            .catch((error) => {
                console.log("An error occurred:", error.response);

                setError(
                    "There was an error creating your account. Please try again."
                );
            });
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Signup</div>
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="name">
                    Name*
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="email">
                    Email*
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
                    Password*
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
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="phone">
                    Phone number
                </label>
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </div>
            {error && (
                <div className="alert alert-warning text-center" role="alert">
                    {error}
                </div>
            )}
            <div className="row my-4">
                <div className="col mx-auto text-center">
                    <button className="btn btn-secondary" type="submit">
                        Sign up
                    </button>
                </div>
            </div>
            <div className="row my-4">
                <div className="col mx-auto text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;

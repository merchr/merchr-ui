import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../util/userContext";

function Checkout() {
    const { user } = useContext(UserContext);

    const { cart } = user;

    const handleInputFocus = (e: any) => setCardFocus(e.target.name);

    const [address, setAddress] = useState<string>(user.address ?? "");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardName, setCardName] = useState<string>("");
    const [cardExpiry, setCardExpiry] = useState<string>("");
    const [cardCvc, setCardCvc] = useState<string>("");
    const [cardFocus, setCardFocus] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {}, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        // fetch("http://localhost:1337/api/auth/local", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         identifier: email,
        //         password,
        //     }),
        // })
        //     .then((response) =>
        //         response.json().then((response) => {
        //             if (response.error) {
        //                 setError("Email or passowrd is invalid.");

        //                 return;
        //             }

        //             const { id, username, email, address, phone } =
        //                 response.user;

        //             setUser({
        //                 id,
        //                 username,
        //                 email,
        //                 address,
        //                 phone,
        //                 cart: [],
        //             });
        //         })
        //     )
        //     .catch((error) => {
        //         console.log("An error occurred:", error.response);

        //         setError("Email or passowrd is invalid.");
        //     });
    };

    if (!user.id) {
        return <Navigate to="/" state={{ from: "checkout" }} />;
    }
    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Checkout</div>
            </div>

            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    required
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    required
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    required
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    required
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </div>
            <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                <label className="px-0 py-2" htmlFor="address">
                    Address
                </label>
                <input
                    required
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
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
                        Pay
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Checkout;

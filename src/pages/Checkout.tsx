import { wrap } from "module";
import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { createOrder } from "../util/queries";
import { UserContext } from "../util/userContext";

function Checkout() {
    const { user } = useContext(UserContext);

    const { cart } = user;

    const [address, setAddress] = useState<string>(user.address ?? "");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardName, setCardName] = useState<string>("");
    const [cardExpiry, setCardExpiry] = useState<string>("");
    const [cardCvc, setCardCvc] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [orderId, setOrderId] = useState<number>();

    if (!user.id) {
        return <Navigate to="/login" state={{ from: "checkout" }} />;
    }

    if (orderId) {
        return <Navigate to="/confirmation" state={{ orderId }} />;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");

        try {
            const order = await createOrder(user.id as number, cart);

            if (order?.id) {
                setOrderId(order?.id);
                return;
            }

            setError("Please check your credit card details.");
        } catch (error) {
            console.log("An error occurred:", error);

            setError("Please check your credit card details.");
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Checkout</div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <p>Your total is: $10</p>
                    <p>
                        Fill in your credit card details to finish your order.
                    </p>
                </div>
                <div>
                    <div className="row mx-auto" style={{ maxWidth: 500 }}>
                        <label className="px-0 py-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            required
                            type="text"
                            name="address"
                            className="form-control"
                            value={address}
                            placeholder="Address"
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                        <label className="px-0 py-2" htmlFor="address">
                            Card Name
                        </label>
                        <input
                            required
                            type="text"
                            name="cardName"
                            className="form-control"
                            value={cardName}
                            placeholder="Full name"
                            onChange={(event) =>
                                setCardName(event.target.value)
                            }
                        />
                    </div>
                    <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                        <label className="px-0 py-2" htmlFor="address">
                            Card Number
                        </label>
                        <input
                            required
                            type="text"
                            name="cardNumber"
                            className="form-control"
                            value={cardNumber}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength={19}
                            onChange={(event) =>
                                setCardNumber(event.target.value)
                            }
                        />
                    </div>
                    <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                        <label className="px-0 py-2" htmlFor="address">
                            Expiration Date
                        </label>
                        <input
                            required
                            type="text"
                            name="expDate"
                            className="form-control"
                            value={cardExpiry}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            placeholder="MM/YY"
                            maxLength={5}
                            onChange={(event) =>
                                setCardExpiry(event.target.value)
                            }
                        />
                    </div>
                    <div className="m-3 row mx-auto" style={{ maxWidth: 500 }}>
                        <label className="px-0 py-2" htmlFor="address">
                            CVV
                        </label>
                        <input
                            required
                            type="text"
                            name="cvv"
                            className="form-control"
                            placeholder="XXX"
                            value={cardCvc}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            maxLength={3}
                            onChange={(event) => setCardCvc(event.target.value)}
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
                </div>
            </div>
        </form>
    );
}

export default Checkout;

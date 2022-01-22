import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../util/userContext";
import { Order, Product } from "../util/types";
import { getOrdersOfUser, getProducts } from "../util/queries";

function Orders() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if (user.id) {
                const orders = await getOrdersOfUser(user.id);
                setOrders(orders);
            }
        })();
    }, [user]);

    useEffect(() => {
        (async () => {
            const products = await getProducts();
            setProducts(products);
        })();
    }, []);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Orders</div>
            </div>

            {orders.map(({ id, attributes }, index) => {
                const price = attributes.products
                    .map(
                        (productId) =>
                            products.find(({ id }) => id === productId)
                                ?.category.price ?? 0
                    )
                    .reduce((sum, curr) => sum + curr, 0);

                return (
                    <div key={id} className="my-4">
                        <h3 className="my-4">
                            <CheckIcon fontSize="large" color="success" />
                            Confirmed
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <p>
                                    No. of items:{" "}
                                    <strong>
                                        {attributes.products.length}
                                    </strong>
                                </p>
                                <p>
                                    Price: <strong>${price.toFixed(2)}</strong>
                                </p>
                                <p>
                                    Ordered on:{" "}
                                    <strong>
                                        {new Date(
                                            attributes.updatedAt
                                        ).toUTCString()}
                                    </strong>
                                </p>
                            </div>
                            <Link to={`/orders/${id}`}>
                                <button className="btn btn-secondary">
                                    See order
                                </button>
                            </Link>
                        </div>
                        {index < orders.length - 1 && <hr />}
                    </div>
                );
            })}
        </div>
    );
}

export default Orders;

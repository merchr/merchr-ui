import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../util/userContext";
import { Order, Product } from "../util/types";
import { getOrdersOfUser, getOrderWithId, getProducts } from "../util/queries";

function Orders() {
    const { user } = useContext(UserContext);

    const params = useParams();
    const orderId = Number(params?.id);

    const [order, setOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if (orderId) {
                const order = await getOrderWithId(orderId);
                if (order && user.id && order.attributes?.userId === user.id) {
                    setOrder(order);
                }
            }
        })();
    }, [orderId, user]);

    useEffect(() => {
        (async () => {
            const products = await getProducts();
            setProducts(products);
        })();
    }, []);

    if (!order) {
        return (
            <div className="container">
                <div className="row my-5">
                    <div className="col fs-1 mx-auto text-center">
                        Invalid URL.
                    </div>
                </div>
            </div>
        );
    }

    const totalPrice = order.attributes.products
        .map(
            (productId) =>
                products.find(({ id }) => id === productId)?.category.price ?? 0
        )
        .reduce((sum, curr) => sum + curr, 0);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Orders</div>
            </div>

            {order.attributes.products.map((productId, index) => {
                const product = products.find(({ id }) => id === productId);

                if (!product) {
                    return <></>;
                }

                return (
                    <div key={index} className="my-4">
                        <h3 className="my-4">{product.category.Name}</h3>
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
                                    Price:{" "}
                                    <strong>${product.category.price}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Orders;

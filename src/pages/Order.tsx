import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../util/userContext";
import { Order, Product } from "../util/types";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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

    const productsInOrder = order.attributes.products
        .map(
            (productId) =>
                products.find((product) => product.id === productId) as Product
        )
        .filter((product) => product);

    const productsAndQuantities = productsInOrder.map((product) => ({
        product,
        quanity: 1,
    }));

    let index = 0;
    while (index < productsAndQuantities.length) {
        const currProduct = productsAndQuantities[index].product;
        const firstProductIndex = productsAndQuantities.findIndex(
            ({ product }) => product.id === currProduct.id
        );
        if (firstProductIndex !== index) {
            productsAndQuantities[firstProductIndex].quanity++;
            productsAndQuantities.splice(index, 1);
        }
        index++;
    }

    console.log(productsAndQuantities);

    // const categories = products
    //     .map((product) => product.category)
    //     .filter(
    //         (curr, idx, arr) =>
    //             arr.findIndex((category) => category.id === curr.id) === idx
    //     );

    // const productsInCategories = Array.from(categories).map((category) => ({
    //     ...category,
    //     products: products.filter(
    //         (product) => product.category.id === category.id
    //     ),
    // }));

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col fs-1 mx-auto text-center">Order</div>
            </div>

            <h4 className="my-4">
                <span style={{ fontWeight: "normal" }}>Status:</span>{" "}
                <CheckIcon fontSize="large" color="success" />
                Cofirmed
            </h4>
            <h4 className="my-4">
                <span style={{ fontWeight: "normal" }}>Total:</span> $
                {totalPrice.toFixed(2)}
            </h4>
            <h4 className="my-4">
                <span style={{ fontWeight: "normal" }}>Ordered on:</span>{" "}
                {new Date(order.attributes.updatedAt).toUTCString()}
            </h4>
            <h4 className="my-4">
                <span style={{ fontWeight: "normal" }}>Items:</span>{" "}
            </h4>
            {productsAndQuantities.map((item, index) => {
                const product = item.product;
                const category = product.category;

                return (
                    <div key={index} className="my-4 mx-4">
                        <h5
                            className="my-4"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <KeyboardArrowRightIcon color="info" />
                            <span>{category.Name}</span>
                            <span>&nbsp;</span>
                            <span style={{ fontWeight: "normal" }}>
                                &nbsp;{`($${category.price})`}
                            </span>
                            <span style={{ fontWeight: "lighter" }}>
                                &nbsp;{`x${item.quanity}`}
                            </span>
                        </h5>

                        <div key={product.id}>
                            <p style={{ textIndent: "50px" }}>
                                {product.color?.name && (
                                    <span>
                                        Color:{" "}
                                        <strong>{product.color?.name}</strong>
                                    </span>
                                )}
                                {product.sex?.type && (
                                    <span>
                                        {", "}
                                        Sex:{" "}
                                        <strong>{product.sex?.type}</strong>
                                    </span>
                                )}
                                {product.size?.name && (
                                    <span>
                                        {", "}
                                        Size:{" "}
                                        <strong>{product.size?.name}</strong>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                );
            })}

            <button className="btn btn-secondary my-4">
                Go back to orders
            </button>
        </div>
    );
}

export default Orders;
